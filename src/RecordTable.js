// src/RecordTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure the CSS file is imported here

function RecordTable({ refresh }) {
  const [records, setRecords] = useState([]); // Initialize as empty array
  const [totalBags, setTotalBags] = useState(0); // State for total bags
  const [totalMoney, setTotalMoney] = useState(0); // State for total money
  const [average, setAverage] = useState(0); // State for average

  useEffect(() => {
    console.log("Fetching records..."); // Log when fetching begins
    const fetchRecords = async () => {
      try {
        const response = await axios.get('https://tobacoonurserybackend.onrender.com/records');
        console.log("Fetched records:", response.data); // Log fetched data
        const fetchedRecords = Array.isArray(response.data.records) ? response.data.records : [];

        setRecords(fetchedRecords); 
        const totalBags = fetchedRecords.reduce((acc, record) => acc + (record.quantity || 0), 0);
        const totalMoney = fetchedRecords.reduce((acc, record) => acc + (record.quantity * record.price || 0), 0);
        const average = totalBags > 0 ? (totalMoney / totalBags).toFixed(2) : 0;

        setTotalBags(totalBags);
        setTotalMoney(totalMoney);
        setAverage(average);
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]); // Set to empty array on error
      }
    };

    fetchRecords();
  }, [refresh]); // Trigger fetch when refresh changes

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Name/Village</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={record._id}> {/* Use record._id for unique key */}
                <td>{index + 1}</td>
                <td>{new Date(record.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) || 'N/A'}</td> {/* Format date to "Month Day, Year" */}
                <td>{record.nameOrVillage || 'N/A'}</td>
                <td>{record.quantity || 'N/A'}</td>
                <td>{record.price || 'N/A'}</td>
                <td>{(record.quantity * record.price).toLocaleString() || 'N/A'}</td> {/* Format total amount */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No records available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Display summary statistics */}
      <div className="summary">
        <h3>Summary</h3>
        <p>Total Bags: {totalBags}</p>
        <p>Total Money:{String.fromCharCode(0x20B9)}{totalMoney.toLocaleString()}</p>
        <p>Average: {String.fromCharCode(0x20B9)}{average}</p>
      </div>
    </div>
  );
}

export default RecordTable;
