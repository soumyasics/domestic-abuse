// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterId, setSupporterId] = useState(null); // Initialize supporterId state
  const [userRole, setUserRole] = useState(null); // Initialize userRole state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserRole = localStorage.getItem('userRole'); // Retrieve userRole from localStorage
    const savedSupporterId = localStorage.getItem('supporterId'); // Retrieve supporterId from localStorage
    if (token && savedUserRole && savedSupporterId) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole); // Set userRole state if available
      setSupporterId(savedSupporterId); // Set supporterId state if available
    }
  }, []);

  const login = (token, userRole, supporterId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('supporterId', supporterId);
    setIsLoggedIn(true);
    setUserRole(userRole); // Set userRole state
    setSupporterId(supporterId); // Set supporterId state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('supporterId');
    setIsLoggedIn(false);
    setUserRole(null); // Clear userRole state
    setSupporterId(null); // Clear supporterId state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, supporterId, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
