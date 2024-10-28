// src/AddRecordForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function AddRecordForm({ onRecordAdded }) {
  const [date, setDate] = useState('');
  const [nameOrVillage, setNameOrVillage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = { date, nameOrVillage, quantity: Number(quantity), price: Number(price) };
    try {
      const response = await axios.post('https://tobacoonurserybackend.onrender.com/addRecord', record);
      onRecordAdded(response.data);  // Notify parent component of new record
      // Reset form fields
      setDate('');
      setNameOrVillage('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error("Error adding record:", error);
      // Handle error (optional: show error message to user)
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="Name/Village" value={nameOrVillage} onChange={(e) => setNameOrVillage(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit">Record</button>
      </form>
    </div>
  );
}

export default AddRecordForm;
