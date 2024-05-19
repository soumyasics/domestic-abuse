import './App.css';
import React from 'react';
import Footer from './Pages/Common/Footer/Footer';
import Home from './Pages/Common/Home/Home';
import Navbar from './Pages/Common/Navbar/Navbar';
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
import User_Login from './Pages/User/login/User_Login';
import User_Register from './Pages/User/register/User_Register';
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import Header from './Pages/Common/Header/Header';
import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="container-fluid">
      
      <BrowserRouter>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user-login' element={<User_Login />} />
        <Route path='/user-register' element={<User_Register />} />
        {/* Admin Paths */}
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-dashboard' element={
          <ProtectedRoute>
            <AdminDashboard/> 
          </ProtectedRoute>
          } />
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </div>
  );
}
function ConditionalNavbar(){
  const Location=useLocation();
  const HeaderPaths=['/admin-login','user-login']; 
  if (HeaderPaths.includes(Location.pathname)){
    return <Header/>
  }
  else{
    return <Navbar/>
  }
}

export default App;
