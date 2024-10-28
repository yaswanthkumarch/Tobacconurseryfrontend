import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddRecordForm from './AddRecordForm';
import RecordTable from './RecordTable';
import './App.css';

function Home({ onRecordAdded }) {
  const navigate = useNavigate();

  const handleShowRecords = () => {
    navigate('/records'); // Navigate to records page
  };

  return (
    <div className="app">
      <h1>Tobacco Ledeger Record Management</h1>
      <AddRecordForm onRecordAdded={onRecordAdded} />
      <button onClick={handleShowRecords}>Show Records</button>
    </div>
  );
}

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRecordAdded = () => {
    setRefresh(!refresh); // Toggle refresh to re-fetch records
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onRecordAdded={handleRecordAdded} />} />
        <Route path="/records" element={<RecordTable refresh={refresh} />} />
      </Routes>
    </Router>
  );
}

export default App;
