import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterId, setSupporterId] = useState(null);
  const [counsellorId, setCounsellorId] = useState(null);
  const [legalProfessionalId, setLegalProfessionalId] = useState(null); 
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserRole = localStorage.getItem('userRole');
    const savedSupporterId = localStorage.getItem('supporterId');
    const savedCounsellorId = localStorage.getItem('counsellorId');
    const savedLegalProfessionalId = localStorage.getItem('legalProfessionalId');
    
    if (token && savedUserRole) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole);
      if (savedUserRole === 'supporter') {
        setSupporterId(savedSupporterId);
      } else if (savedUserRole === 'counsellor') {
        setCounsellorId(savedCounsellorId);
      } else if (savedUserRole === 'legalProfessional') { 
        setLegalProfessionalId(savedLegalProfessionalId);
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
    } else if (userRole === 'legalProfessional') { 
      localStorage.setItem('legalProfessionalId', userId);
      setLegalProfessionalId(userId);
    }
    setIsLoggedIn(true);
    setUserRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('supporterId');
    localStorage.removeItem('counsellorId');
    localStorage.removeItem('legalProfessionalId'); 
    setIsLoggedIn(false);
    setUserRole(null);
    setSupporterId(null);
    setCounsellorId(null);
    setLegalProfessionalId(null); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, supporterId, counsellorId, legalProfessionalId, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
