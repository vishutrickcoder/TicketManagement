import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../../../src/App.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [responses, setResponses] = useState({}); 
  const [assignees, setAssignees] = useState({}); 
  const [statuses, setStatuses] = useState({}); 
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/complaints', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComplaints(response.data);

      // Initialize states for responses, assignees, and statuses
      const initialResponses = {};
      const initialAssignees = {};
      const initialStatuses = {};
      response.data.forEach(complaint => {
        initialResponses[complaint._id] = complaint.response || '';
        initialAssignees[complaint._id] = complaint.assignee || '';
        initialStatuses[complaint._id] = complaint.status || 'Pending';
      });
      setResponses(initialResponses);
      setAssignees(initialAssignees);
      setStatuses(initialStatuses);

    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdate = async (complaintId) => {
    try {
      await axios.post(`http://localhost:4000/api/admin/complaints/${complaintId}`, 
        { 
          response: responses[complaintId] || '', 
          assignee: assignees[complaintId] || '', 
          status: statuses[complaintId] || 'Pending' 
        }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      // Update state locally
      setComplaints(complaints.map(complaint => 
        complaint._id === complaintId ? { 
          ...complaint, 
          response: responses[complaintId], 
          assignee: assignees[complaintId], 
          status: statuses[complaintId] 
        } : complaint
      ));
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <div className="custom input-box button">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-dashboard-main">
        <div className="admin-dashboard-complaints">
          <h3>All Complaints</h3>
          <ul>
            {complaints.map((complaint) => (
              <div key={complaint._id} className="admin-dashboard-complaint-item">
                <li>
                  <p><strong>Complaint:</strong> {complaint.complaint}</p>
                  <p><strong>Status:</strong> {statuses[complaint._id]}</p>
                  <p><strong>Submitted on:</strong> {moment(complaint.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p><strong>User:</strong> {complaint.user.name} ({complaint.user.email})</p>

                  <textarea
                    placeholder="Enter response"
                    value={responses[complaint._id] || ''}
                    onChange={(e) => setResponses({ ...responses, [complaint._id]: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={assignees[complaint._id] || ''}
                    onChange={(e) => setAssignees({ ...assignees, [complaint._id]: e.target.value })}
                  />
                  <select
                    value={statuses[complaint._id] || 'Pending'}
                    onChange={(e) => setStatuses({ ...statuses, [complaint._id]: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <hr />
                  <button onClick={() => handleUpdate(complaint._id)}>Update Status</button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
