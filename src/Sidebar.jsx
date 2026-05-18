import React from 'react';

export default function Sidebar({ user, role, logout, setView, setShowModal }) {
  if (role === 'admin') {
    return (
      <nav className="sidebar admin-sidebar">
        <div className="sidebar-logo">
          <div className="admin-logo-box">ADM</div>
          <div>
            <div className="sidebar-logo-text" style={{ fontSize: '13px' }}>Admin Panel</div>
            <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.05em' }}>MANAGEMENT</div>
          </div>
        </div>

        <div className="sidebar-section-label">Main Menu</div>

        <ul className="sidebar-nav">
          <li className="sidebar-nav-item active">
            <span className="sidebar-nav-icon">⊞</span>
            <span className="sidebar-nav-label">Dashboard</span>
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">☰</span>
            <span className="sidebar-nav-label">All Complaints</span>
          </li>
          <li className="sidebar-nav-item" onClick={logout}>
            <span className="sidebar-nav-icon">🏠</span>
            <span className="sidebar-nav-label">Home Page</span>
          </li>
        </ul>

        <div className="sidebar-bottom">
          <div className="sidebar-nav-item" onClick={logout}>
            <span className="sidebar-nav-icon">🚪</span>
            <span className="sidebar-nav-label">Sign Out</span>
          </div>
        </div>
      </nav>
    );
  }

  // Student Sidebar
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🎓</span>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
          <span className="sidebar-logo-text">Student Portal</span>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.email}
          </div>
        </div>
      </div>

      <div className="sidebar-section-label">Main Menu</div>

      <ul className="sidebar-nav">
        <li className="sidebar-nav-item active">
          <span className="sidebar-nav-icon">⊞</span>
          <span className="sidebar-nav-label">Dashboard</span>
        </li>
        <li className="sidebar-nav-item" onClick={() => setShowModal(true)}>
          <span className="sidebar-nav-icon">✚</span>
          <span className="sidebar-nav-label">Add Complaint</span>
        </li>
        <li className="sidebar-nav-item" onClick={() => setView('home')}>
          <span className="sidebar-nav-icon">⌂</span>
          <span className="sidebar-nav-label">Home Page</span>
        </li>
      </ul>

      <div className="sidebar-bottom">

        <div className="sidebar-nav-item" onClick={logout}>
          <span className="sidebar-nav-icon">↩</span>
          <span className="sidebar-nav-label">Sign Out</span>
        </div>
      </div>
    </nav>
  );
}
