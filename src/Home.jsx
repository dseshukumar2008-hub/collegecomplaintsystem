import React, { useState } from 'react';

export function Home({ setView }) {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">
          <span style={{ fontSize: '24px' }}>🎓</span>
          <span>COLLEGE COMPLAINT SYSTEM</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setView('admin-login')} className="nav-btn nav-btn-admin">Admin Access</button>
          <button onClick={() => setView('login')} className="nav-btn nav-btn-student">Student Sign In</button>
        </div>
      </nav>

      <div className="hero-v2">
        <div className="hero-overlay"></div>
        <div className="hero-content-v2">
          <span className="badge-v2">Student Administration Portal</span>
          <h1 className="hero-title-v2">College Complaint Management System</h1>
          <p className="hero-subtitle-v2">
            A secure and efficient platform for students to report grievances and
            for the administration to track and resolve institutional issues.
          </p>
          <div className="btn-group-v2">
            <button onClick={() => setView('login')} className="btn-main btn-primary-v2">
              Sign In to Portal
            </button>
            <button onClick={() => setView('admin-login')} className="btn-main btn-secondary-v2">
              Administrator Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Login({ handleLogin, setView }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="center-container">
      <div className="card">
        <button onClick={() => setView('home')} className="btn-text">
          &larr; Back to Home
        </button>

        <h2 className="title">Student Login</h2>
        <p className="subtitle">Enter your details to access the system.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(name, email, 'student'); }} autoComplete="off">
          <div className="form-group">
            <label className="label">Student Name</label>
            <input
              required
              type="text"
              className="input-field"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Student Email</label>
            <input
              required
              type="email"
              className="input-field"
              placeholder="student@example.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              required
              type="password"
              className="input-field"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Login to Dashboard
          </button>
        </form>

        <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>
            Use any details to login for the demo.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminLogin({ handleLogin, setView }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="center-container">
      <div className="card">
        <button onClick={() => setView('home')} className="btn-text" style={{ marginBottom: '20px' }}>
          &larr; Back to Home
        </button>

        <h2 className="title">Admin Portal</h2>
        <p className="subtitle">Secure access for administration only.</p>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (email === 'admin@college.com' && pass === 'admin123') {
            handleLogin('Admin', 'admin@college.com', 'admin');
          } else {
            alert('Invalid Admin Credentials');
          }
        }}>
          <div className="form-group">
            <label className="label">Admin Email</label>
            <input
              required
              type="email"
              className="input-field"
              placeholder="admin@college.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Admin Password</label>
            <input
              required
              type="password"
              className="input-field"
              placeholder="Enter Admin Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark" style={{ marginTop: '10px' }}>
            Login as Administrator
          </button>
        </form>
      </div>
    </div>
  );
}
