import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Home, Login, AdminLogin } from './Home';
import StudentDashboard, { AddComplaint } from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

// --- MAIN APP COMPONENT ---
export default function App() {
  const initialUser = JSON.parse(localStorage.getItem('currentUser_v2')) || null;
  const [user, setUser] = useState(initialUser);
  const [view, setView] = useState(initialUser ? 'dashboard' : 'home');
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('allUsers_v2')) || []);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    localStorage.setItem('currentUser_v2', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('allUsers_v2', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('complaints_v2', JSON.stringify(complaints));
  }, [complaints]);

  const handleLogin = (name, email, role) => {
    const userData = { id: uuidv4(), name, email, role };
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: uuidv4(),
      studentEmail: user.email,
      studentName: user.name,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    };
    setComplaints([newComplaint, ...complaints]);
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'login':
        return <Login handleLogin={handleLogin} setView={setView} />;
      case 'admin-login':
        return <AdminLogin handleLogin={handleLogin} setView={setView} />;
      case 'dashboard':
        return user?.role === 'admin'
          ? <AdminDashboard complaints={complaints} updateStatus={updateComplaintStatus} logout={handleLogout} />
          : <StudentDashboard user={user} complaints={complaints.filter(c => c.studentEmail === user.email)} addComplaint={addComplaint} logout={handleLogout} setView={setView} />;
      case 'add-complaint':
        return <AddComplaint addComplaint={addComplaint} setView={setView} />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="center-container">
      <div className="animate-spin"></div>
      <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading...</p>
    </div>
  );
}
