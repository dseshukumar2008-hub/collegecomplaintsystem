import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Home, Login, AdminLogin } from './Home';
import StudentDashboard, { AddComplaint } from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

// --- MAIN APP COMPONENT ---
export default function App() {
  const savedStudent = JSON.parse(localStorage.getItem('currentStudent')) || null;//Checks if user already logged in.
  const [user, setUser] = useState(savedStudent); //user stores logged in user information.
  const [view, setView] = useState(savedStudent ? 'dashboard' : 'home'); //This controls which page should be displayed. If user already exists → dashboard page opens.
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('allUsers')) || []); //This stores all registered users.
  
  const savedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
  const [complaints, setComplaints] = useState(savedComplaints); //This stores all complaints submitted in the system.

  useEffect(() => {
    localStorage.setItem('currentStudent', JSON.stringify(user)); //Whenever the user state changes: Data is saved into localStorage.The dependency array [user] means this effect runs whenever user changes.
  }, [user]);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users)); //Whenever users state changes, updated users data is stored in localStorage.
  }, [users]);

  useEffect(() => {
    localStorage.setItem('complaints', JSON.stringify(complaints)); //Whenever complaint data changes, it is saved permanently in localStorage.
  }, [complaints]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'complaints') {
        setComplaints(JSON.parse(e.newValue) || []);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = (name, email, role) => {
    const userData = { id: uuidv4(), name, email, role };
    setUser(userData);    //stores user inofration into state 
    setView('dashboard');  //after login user is redirected to dashboard page
  };

  const handleLogout = () => {
    setUser(null);  //removes current user
    setView('home'); //redirects user to home page 
  };

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: uuidv4(), //cretaes unique complaint id
      studentEmail: user.email,
      studentName: user.name,
      status: 'Pending', //new complaintes are marked intially as pending
      date: new Date().toLocaleDateString(), 
    };
    setComplaints([newComplaint, ...complaints]);  //Adds new complaint at beginning of complaints array.
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c)); //Matching complaint gets updated. Others remain unchanged.
  };

  //This function decides which page should be displayed.
  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'login':
        return <Login handleLogin={handleLogin} setView={setView} />; //Displays Login page and passes functions as props.
      case 'admin-login':
        return <AdminLogin handleLogin={handleLogin} setView={setView} />;
      case 'dashboard':
        return user?.role === 'admin' //Displays dashboard depending on user role.
          ? <AdminDashboard complaints={complaints} updateStatus={updateComplaintStatus} logout={handleLogout} />
          : <StudentDashboard user={user} complaints={complaints.filter(c => c.studentEmail === user.email)} addComplaint={addComplaint} logout={handleLogout} setView={setView} />;
      case 'add-complaint':
        return <AddComplaint addComplaint={addComplaint} setView={setView} />;
      default:
        return <Home setView={setView} />;
    }
  };
  
  //Displays the selected page inside main container.
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
