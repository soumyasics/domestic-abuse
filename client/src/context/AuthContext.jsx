import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterId, setSupporterId] = useState(null);
  const [counsellorId, setCounsellorId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserRole = localStorage.getItem('userRole');
    const savedSupporterId = localStorage.getItem('supporterId');
    const savedCounsellorId = localStorage.getItem('counsellorId');
    
    if (token && savedUserRole) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole);
      if (savedUserRole === 'supporter') {
        setSupporterId(savedSupporterId);
      } else if (savedUserRole === 'counsellor') {
        setCounsellorId(savedCounsellorId);
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
    setUserRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('supporterId');
    localStorage.removeItem('counsellorId');
    setIsLoggedIn(false);
    setUserRole(null);
    setSupporterId(null);
    setCounsellorId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, supporterId, counsellorId, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
