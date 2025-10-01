import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Header from './pages/header/Header.jsx';
import Signup from './pages/auth/signup/Signup.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Login from './pages/auth/login/Login.jsx';

function App() {
  const location = useLocation();
  const showHeader = location.pathname === '/dashboard';

  return (
    <>
     {showHeader && <Header />}
     <Routes>
       <Route path="/" element={<Navigate to="/login" replace />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Signup />} />
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </>
  );
}

export default App;
