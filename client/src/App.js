import './App.css';
import React from 'react';
import Footer from './Pages/Common/Footer/Footer';
import Home from './Pages/Common/Home/Home';
import Navbar from './Pages/Common/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import User_Login from './Pages/User/login/User_Login';
import User_Register from './Pages/User/register/User_Register';
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute/ProtectedRoute';
import SupporterRegister from './Pages/Supporter/SupporterRegister/SupporterRegister';
import AdminNavbar from './Pages/Admin/AdminNavbar/AdminNavbar';
import AdminViewAllSupportersRequest from './Pages/Admin/AdminViewAllSupportersRequest/AdminViewAllSupportersRequest';
import SupporterLogin from './Pages/Supporter/SupporterLogin/SupporterLogin';
import SupporterHome from './Pages/Supporter/SupporterHome/SupporterHome';
import SupporterForgotPassword from './Pages/Supporter/SupporterForgotPassword/SupporterForgotPassword';
import SupporterEditProfile from './Pages/Supporter/SupporterEditProfile/SupporterEditProfile';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter basename='domestic_abuse'>
        <ConditionalNavbar />
        <div className="flex-grow-1">
          <Routes>
            {/* Common Paths */}
            <Route path="/" element={<Home />} />
            <Route path='/user-login' element={<User_Login />} />
            <Route path='/user-register' element={<User_Register />} />
            

            {/* Admin Paths */}
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/admin-view-all-supporters-request' element={
                <AdminViewAllSupportersRequest />
            } />
            {/* Supporter Paths */}
            <Route path='/supporter-register' element={<SupporterRegister />} />
            <Route path='/supporter-login' element={<SupporterLogin />} />
            <Route path='/supporter-home' element={<SupporterHome />} />
            <Route path='/supporter-forgot-password' element={<SupporterForgotPassword />} />
            <Route path='/supporter-edit-profile' element={<SupporterEditProfile />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const HeaderPaths = ['/admin-dashboard','/admin-view-all-supporters-request'];
  if (HeaderPaths.includes(location.pathname)) {
    return <AdminNavbar />;
  } else {
    return <Navbar />;
  }
}

export default App;
