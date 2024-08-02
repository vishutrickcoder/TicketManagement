import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../../../src/App.css';

const UserDashboard = () => {
  const [complaint, setComplaint] = useState('');
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/ticket/complaints', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/ticket/complaint', { complaint }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints([...complaints, response.data]);
      setComplaint('');
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async (complaintId) => {
    try {
      await axios.delete(`http://localhost:4000/api/ticket/complaints/${complaintId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints(complaints.filter(complaint => complaint._id !== complaintId));
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <>
      <div className="custom input-box button">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <div className="formbold-form-title">
            <h3>If You are having any issue</h3>
            <p>Raise Ticket we will help You ....</p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Enter your Complaint statement"
              className="formbold-form-input"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />
            <button className="formbold-btn">
              Raise Complaint
            </button>
          </form>
        </div>
      </div>

      <div className="complaints-list">
        <h3>Your Complaints</h3>
        <ul>
          {complaints.map((complaintItem) => (
            <li key={complaintItem._id}>
              <div className="card">
                <div className="card-header">
                  <h2>Complaint ID: {complaintItem._id}</h2>
                </div>
                <div className="card-body">
                  <p><strong>Status:</strong> {complaintItem.status}</p>
                  <p><strong>Date of Complaint:</strong> {moment(complaintItem.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p><strong>Description:</strong> {complaintItem.complaint}</p>
                </div>
                <div className="card-footer">
                  <p><strong>Assigned:</strong> {complaintItem.assignee ? complaintItem.assignee : 'Not assigned'}</p>
                  <p><strong>Response:</strong> {complaintItem.response ? complaintItem.response : 'No response yet'}</p>
                  {complaintItem.status !== 'Resolved' && (
                    <button onClick={() => handleDelete(complaintItem._id)} className="btn-delete">Delete</button>
                  )}
                    {/* <button onClick={() => handleDelete(complaintItem._id)} className="btn-delete">Delete</button> */}

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserDashboard;
