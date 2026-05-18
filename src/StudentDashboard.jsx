import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ComplaintModal from './ComplaintModal';

export default function StudentDashboard({ user, complaints, addComplaint, logout, setView }) {
  const [showModal, setShowModal] = useState(false); //Controls whether complaint modal is visible or hidden.
  const [formData, setFormData] = useState({ title: '', category: 'General', description: '' });

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length; //Counts pending complaints.
  const resolved = complaints.filter(c => c.status === 'Resolved').length; //Counts resolved complaints.
  
  //Handles complaint form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData); //Sends complaint data to App component.
    setFormData({ title: '', category: 'General', description: '' });
    setShowModal(false); //Closes complaint modal.
  };

  return (
    <div className="main-wrapper">
      <Sidebar 
        user={user} 
        role="student" 
        logout={logout} 
        setView={setView} 
        setShowModal={setShowModal} 
      />

      <div className="dashboard-content">
        <div className="header admin-header">
          <div>
            <h1 className="title" style={{ fontSize: '22px' }}>Student Dashboard</h1>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px', fontWeight: '600' }}>OVERVIEW OF YOUR ACTIVITY</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-text admin-home-btn" onClick={() => setView('home')} style={{ margin: 0 }}>
              🏠 Home
            </button>
            <div className="admin-profile-badge">
              <div className="admin-avatar" style={{ background: '#2563eb' }}>{user.name.charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{user.name}</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#2563eb' }}>VERIFIED STUDENT</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="title">My Overview</h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', marginTop: '-12px' }}>Summary of your submitted complaints</p>

        <div className="stats-grid admin-stats">
          <div className="stat-box stat-blue">
            <div style={{ width: '100%' }}>
              <div className="stat-label">TOTAL</div>
              <div className="stat-value">{total}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Complaints submitted</div>
          </div>

          <div className="stat-box stat-orange">
            <div style={{ width: '100%' }}>
              <div className="stat-label">PENDING</div>
              <div className="stat-value">{pending}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Awaiting action</div>
          </div>

          <div className="stat-box stat-green">
            <div style={{ width: '100%' }}>
              <div className="stat-label">RESOLVED</div>
              <div className="stat-value">{resolved}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Successfully closed</div>
          </div>
        </div>

        <div className="table-card student-table-container">
          <div className="complaints-header">
            <div>
              <h3 className="title" style={{ fontSize: '16px', margin: 0 }}>My Complaints</h3>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{total} records found</div>
            </div>
            <button onClick={() => setShowModal(true)} className="btn btn-primary new-complaint-btn">
              + New Complaint
            </button>
          </div>

          {complaints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
              <h3 style={{ fontSize: '15px', color: '#334155', marginBottom: '12px' }}>No complaints submitted yet.</h3>
              <div onClick={() => setShowModal(true)} style={{ fontSize: '13px', color: '#2563eb', cursor: 'pointer', fontWeight: '500' }}>Submit your first complaint &rarr;</div>
            </div>
          ) : (
            <div className="complaint-list-wrapper">
              <table className="student-complaint-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Complaint</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Filed On</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(c => (
                    <tr key={c.id} className="student-table-row">
                      <td className="col-id">
                        {c.id.slice(0, 6)}
                      </td>
                      <td>
                        <div className="complaint-title">{c.title}</div>
                      </td>
                      <td>
                        <div className="department-badge">{c.category}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${c.status === 'Resolved' ? 'status-resolved' :
                            c.status === 'In Progress' ? 'status-progress' : 'status-pending'
                          }`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div className="complaint-date">{c.date}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ComplaintModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}

export function AddComplaint({ addComplaint, setView }) {
  const [formData, setFormData] = useState({ title: '', category: 'General', description: '' });

  return (
    <div className="center-container">
      <div className="card card-lg">
        <button onClick={() => setView('dashboard')} className="btn-text">Back to Dashboard</button>
        <h2 className="title">File New Complaint</h2>

        <form onSubmit={(e) => { e.preventDefault(); addComplaint(formData); setView('dashboard'); }}>
          <label className="label">Subject</label>
          <input
            required
            type="text"
            className="input-field"
            placeholder="Title of your issue"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label className="label">Category</label>
          <select
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option>General</option>
            <option>Academic</option>
            <option>Infrastructure</option>
            <option>Library</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>WiFi</option>
            <option>Examination</option>
          </select>

          <label className="label">Description</label>
          <textarea
            required
            rows="4"
            className="input-field"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}
