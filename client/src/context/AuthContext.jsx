import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterId, setSupporterId] = useState(null); // Initialize supporterId state
  const [counsellorId, setCounsellorId] = useState(null); // Initialize counsellorId state
  const [userRole, setUserRole] = useState(null); // Initialize userRole state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserRole = localStorage.getItem('userRole'); // Retrieve userRole from localStorage
    const savedSupporterId = localStorage.getItem('supporterId'); // Retrieve supporterId from localStorage
    const savedCounsellorId = localStorage.getItem('counsellorId'); // Retrieve counsellorId from localStorage
    
    if (token && savedUserRole) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole); // Set userRole state if available
      if (savedUserRole === 'supporter') {
        setSupporterId(savedSupporterId); // Set supporterId state if available
      } else if (savedUserRole === 'counsellor') {
        setCounsellorId(savedCounsellorId); // Set counsellorId state if available
      }
    }
  }, []);

  const login = (token, userRole, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    if (userRole === 'supporter') {
      localStorage.setItem('supporterId', userId);
      setSupporterId(userId);
    } else if (userRole === 'counsellor') {
      localStorage.setItem('counsellorId', userId);
      setCounsellorId(userId);
    }
    setIsLoggedIn(true);
    setUserRole(userRole); // Set userRole state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('supporterId');
    localStorage.removeItem('counsellorId');
    setIsLoggedIn(false);
    setUserRole(null); // Clear userRole state
    setSupporterId(null); // Clear supporterId state
    setCounsellorId(null); // Clear counsellorId state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, supporterId, counsellorId, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
