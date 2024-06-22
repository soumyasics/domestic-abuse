import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const supporterId = localStorage.getItem('supporterId');
        if (token && supporterId) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token, supporterId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('supporterId', supporterId);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('supporterId');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
