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
import SupporterLogin from './Pages/Supporter/SupporterLogin/SupporterLogin';
import SupporterHome from './Pages/Supporter/SupporterHome/SupporterHome';
import SupporterForgotPassword from './Pages/Supporter/SupporterForgotPassword/SupporterForgotPassword';
import SupporterEditProfile from './Pages/Supporter/SupporterEditProfile/SupporterEditProfile';
import SupporterAddSafeHouse from './Pages/Supporter/SupporterAddSafeHouse/SupporterAddSafeHouse';
import SupporterEditSafeHouse from './Pages/Supporter/SupporterEditSafeHouse/SupporterEditSafeHouse';
import SupporterViewAllSafeHouses from './Pages/Supporter/SupporterViewAllSafeHouses/SupporterViewAllSafeHouses';
import AdminViewAllSafehouses from './Pages/Admin/AdminViewAllSafehouses/AdminViewAllSafehouses';
import AdminSafehouseDetailedView from './Pages/Admin/AdminSafehouseDetailedView/AdminSafehouseDetailedView';
import CounsellorRegistration from './Pages/Counsellor/CounsellorRegistration/CounsellorRegistration';
import CounsellorLogin from './Pages/Counsellor/CounsellorLogin/CounsellorLogin';
import CounsellorForgotPassword from './Pages/Counsellor/CounsellorForgotPassword/CounsellorForgotPassword';
import LegalProfessionalLogin from './Pages/Legal Professional/LegalProfessionalLogin/LegalProfessionalLogin';
import LegalProfessionalRegister from './Pages/Legal Professional/LegalProfessionalRegister/LegalProfessionalRegister';
import LegalProfessionalForgotPassword from './Pages/Legal Professional/LegalProfessionalForgotPassword/LegalProfessionalForgotPassword';
import CounsellorHome from './Pages/Counsellor/CounsellorHome/CounsellorHome';
import AdminCounsellorRequests from './Pages/Admin/AdminCounsellorRequests/AdminCounsellorRequests';
import CounsellorEditProfile from './Pages/Counsellor/CounsellorEditProfile/CounsellorEditProfile';
import LegalProfessionalEditProfile from './Pages/Legal Professional/LegalProfessionalEditProfile/LegalProfessionalEditProfile';
import LegalProfessionalHome from './Pages/Legal Professional/LegalProfessionalHome/LegalProfessionalHome';
import AdminCounsellorViewAll from './Pages/Admin/AdminCounsellorViewAll/AdminCounsellorViewAll';
import AdminCounsellorDetailedView from './Pages/Admin/AdminCounsellorDetailedView/AdminCounsellorDetailedView';
import AdminCounsellorDetailedViewAprvd from './Pages/Admin/AdminCounsellorDetailedViewAprvd/AdminCounsellorDetailedViewAprvd';
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
         
                <AdminDashboard />
             
            } />
            <Route path='/admin-view-all-safehouses' element={
                <AdminViewAllSafehouses />
            } />
            <Route path='/admin-safehouse-details' element={
                <AdminSafehouseDetailedView />
            } />  
            <Route path='/admin-counsellor-requests' element={<AdminCounsellorRequests />} />

            <Route path='/admin-counsellor-view-all' element={<AdminCounsellorViewAll />} />
            <Route path='/admin-viewdetailedCouncilor-req/:id' element={<AdminCounsellorDetailedView />} />
            <Route path='/admin-viewall-aprvd-councillors' element={<AdminCounsellorViewAll />} />
            <Route path='/admin-viewdetailedCouncilor-aprvd/:id' element={<AdminCounsellorDetailedViewAprvd/>} />


            {/* Supporter Paths */}
            <Route path='/supporter-register' element={<SupporterRegister />} />
            <Route path='/supporter-login' element={<SupporterLogin />} />
            <Route path='/supporter-home' element={<SupporterHome />} />
            <Route path='/supporter-forgot-password' element={<SupporterForgotPassword />} />
            <Route path='/supporter-edit-profile' element={<SupporterEditProfile />} />
            <Route path='/supporter-add-safe-space' element={<SupporterAddSafeHouse />} />
            
            {/* Updated route for editing safe house */}
            <Route path='/supporter-edit-safe-house' element={<SupporterEditSafeHouse />} />
            <Route path='/supporter-view-all-safehouses' element={<SupporterViewAllSafeHouses />} />

            {/* Counsellor Paths */}
            <Route path='/counsellor-register' element={<CounsellorRegistration />} />
            <Route path='/counsellor-login' element={<CounsellorLogin/>} />
            <Route path='/counsellor-forgot-password' element={<CounsellorForgotPassword/>} />
            <Route path='/counsellor-home' element={<CounsellorHome />} />
            <Route path='/counsellor-edit-profile' element={<CounsellorEditProfile />} />


            {/* Legal Professional Paths  */}
            <Route path='/legal-professional-login' element={<LegalProfessionalLogin/>} />
            <Route path='/legal-professional-register' element={<LegalProfessionalRegister />} />
            <Route path='/legal-professional-forgot-password' element={<LegalProfessionalForgotPassword/>} />
            <Route path='/legal-professional-edit-profile' element={<LegalProfessionalEditProfile />} />
            <Route path='/legal-professional-home' element={<LegalProfessionalHome />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const HeaderPaths = ['/admin-dashboard'];
  if (HeaderPaths.includes(location.pathname)) {
    return <AdminNavbar />;
  } else {
    return <Navbar />;
  }

}

export default App;
