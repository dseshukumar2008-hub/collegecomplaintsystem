import React from 'react';
import Sidebar from './Sidebar';

export default function AdminDashboard({ complaints, updateStatus, logout }) {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="main-wrapper">
      <Sidebar 
        role="admin" 
        logout={logout} 
      />

      <div className="dashboard-content">
        <div className="header admin-header">
          <div>
            <h1 className="title">Admin Dashboard</h1>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px', fontWeight: '600' }}>Manage All Student Complaints</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-text admin-home-btn" onClick={logout} style={{ margin: 0 }}>
              🏠 Home
            </button>
            <div className="admin-profile-badge">
              <div className="admin-avatar">A</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Admin Office</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#f59e0b' }}>VERIFIED ADMINISTRATOR</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="title">Overview</h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', marginTop: '-12px' }}>Summary of all campus complaints</p>

        <div className="stats-grid admin-stats">
          <div className="stat-box stat-blue">
            <div style={{ width: '100%' }}>
              <div className="stat-label">Total</div>
              <div className="stat-value">{total}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Complaints received</div>
          </div>

          <div className="stat-box stat-orange">
            <div style={{ width: '100%' }}>
              <div className="stat-label">Pending</div>
              <div className="stat-value" style={{ color: '#d97706' }}>{pending}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Require action</div>
          </div>

          <div className="stat-box stat-green">
            <div style={{ width: '100%' }}>
              <div className="stat-label">Resolved</div>
              <div className="stat-value" style={{ color: '#15803d' }}>{resolved}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Successfully closed</div>
          </div>
        </div>

        <h3 className="title">All Complaints</h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', marginTop: '-12px' }}>{total} records in system</p>

        <div className="complaint-list" style={{ padding: '0' }}>
          <div className="table-card admin-table" style={{ border: 'none', boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ borderBottom: 'none' }}>
                      <div className="complaint-empty" style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
                        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>No complaints in the system.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  complaints.map(c => (
                    <tr key={c.id}>
                      <td style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1e293b' }}>{c.studentName}</div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>ID: {c.id.slice(0, 8)}</div>
                      </td>
                      <td style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>{c.title}</div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>{c.description}</div>
                      </td>
                      <td style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <span className={`status-badge ${c.status === 'Resolved' ? 'status-resolved' :
                            c.status === 'In Progress' ? 'status-progress' : 'status-pending'
                          }`} style={{ fontSize: '9px' }}>{c.status}</span>
                      </td>
                      <td style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <select
                          className="admin-status-dropdown"
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
