import './App.css';
import React from 'react';
import Footer from './Pages/Common/Footer/Footer';
import Home from './Pages/Common/Home/Home';
import Navbar from './Pages/Common/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import AdminLegalProfessionalDetailedViewAprvd from './Pages/Admin/AdminLegalProfessionalDetailedViewAprvd/AdminLegalProfessionalDetailedViewAprvd';
import AdminLegalProfessionalDetailedView from './Pages/Admin/AdminLegalProfessionalDetailedView/AdminLegalProfessionalDetailedView';
import AdminLegalProfessionalViewAll from './Pages/Admin/AdminLegalProfessionalViewAll/AdminLegalProfessionalViewAll';
import UserLogin from './Pages/User/login/UserLogin';
import UserRegister from './Pages/User/register/UserRegister';
import UserForgotPassword from './Pages/User/UserForgotPassword/UserForgotPassword';
import UserHome from './Pages/User/UserHome/UserHome';
import SupprterNavbar from './Pages/Common/Navbar/SupprterNavbar';
import CouncillorNav from './Pages/Common/Navbar/CouncillorNav';
import LPNav from './Pages/Common/Navbar/LPNav';
import UserEditProfile from './Pages/User/UserEditProfile/UserEditProfile';
import UserViewSafehouses from './Pages/User/UserViewSafehouses/UserViewSafehouses';
import UserViewSupporters from './Pages/User/UserViewSupporters/UserViewSupporters';
import UserAddIssue from './Pages/User/UserAddIssue/UserAddIssue';
import UserNav from './Pages/Common/Navbar/UserNav';
import SupporterViewAllIssues from './Pages/Supporter/SupporterViewAllIssues/SupporterViewAllIssues';
import SupporterAddSuggestion from './Pages/Supporter/SupporterAddSuggestion/SupporterAddSuggestion';
import UserPayment from './Pages/User/UserPayment/UserPayment';
import SupporterAddBlogs from './Pages/Supporter/SupporterAddBlogs/SupporterAddBlogs';
import SupporterEditBlogs from './Pages/Supporter/SupporterEditBlogs/SupporterEditBlogs';
import SupporterViewBlogs from './Pages/Supporter/SupporterViewBlogs/SupporterViewBlogs';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter basename='domestic_abuse'>
        <div className="flex-grow-1">
          <Routes>
            {/* Common Paths */}
            <Route path="/" element={[<Navbar/>,<Home />]} />
            {/* User Paths */}
            <Route path='/user-login' element={[<Navbar/>,<UserLogin />]} />
            <Route path='/user-register' element={[<Navbar/>,<UserRegister />]} />
            <Route path='/user-forgot-password' element={[<Navbar/>,<UserForgotPassword/>]} />
            <Route path='/user-home' element={[<UserNav/>,<UserHome/>]} />
            <Route path='/user-edit-profile' element={[<UserNav/>,<UserEditProfile/>]} />
            <Route path='/user-view-all-safehouses' element={[<UserNav/>,<UserViewSafehouses/>]} />
            <Route path='/user-view-all-supporters' element={[<UserNav/>,<UserViewSupporters/>]} />
            <Route path='/user-add-issue' element={[<UserNav/>,<UserAddIssue/>]} />
            <Route path='/user-payment' element={[<UserNav/>,<UserPayment/>]} />

            {/* Admin Paths */}
            <Route path='/admin-login' element={[<Navbar/>,<AdminLogin />]} />
            <Route path='/admin-dashboard' element={[
         
               <AdminNavbar/>, <AdminDashboard />
             
            ]} />
            <Route path='/admin-view-all-safehouses' element={
              [ <AdminNavbar/>, <AdminViewAllSafehouses />]
            } />
            <Route path='/admin-safehouse-details/:id' element={
                [<AdminNavbar/>,<AdminSafehouseDetailedView />]
            } />  
            <Route path='/admin-counsellor-requests' element={<AdminCounsellorRequests />} />

            <Route path='/admin-counsellor-view-all' element={[<AdminNavbar/>,<AdminCounsellorViewAll />]} />
            <Route path='/admin-viewdetailedCouncilor-req/:id' element={[<AdminNavbar/>,<AdminCounsellorDetailedView />]} />
            <Route path='/admin-viewall-aprvd-councillors' element={[<AdminNavbar/>,<AdminCounsellorViewAll />]} />
            <Route path='/admin-viewdetailedCouncilor-aprvd/:id' element={[<AdminNavbar/>,<AdminCounsellorDetailedViewAprvd/>]} />
            <Route path='/admin-viewdetailedLegalProfessional/:id' element={[<AdminNavbar/>,<AdminLegalProfessionalDetailedView />]} />
            <Route path='/admin-viewdetailedLegalProfessional-aprvd/:id' element={[<AdminNavbar/>,<AdminLegalProfessionalDetailedViewAprvd/>]} />
            <Route path='/admin-viewall-aprvd-LegalProfessional' element={[<AdminNavbar/>,<AdminLegalProfessionalViewAll />]} />

            {/* Supporter Paths */}
            <Route path='/supporter-register' element={[<Navbar/>,<SupporterRegister />]} />
            <Route path='/supporter-login' element={[<Navbar/>,<SupporterLogin />]} />
            <Route path='/supporter-home' element={[<SupprterNavbar/>,<SupporterHome />]} />
            <Route path='/supporter-forgot-password' element={[<Navbar/>,<SupporterForgotPassword />]} />
            <Route path='/supporter-edit-profile' element={[<SupprterNavbar/>,<SupporterEditProfile />]} />
            <Route path='/supporter-add-safe-space' element={[<SupprterNavbar/>,<SupporterAddSafeHouse />]} />
            <Route path='/supporter-view-all-issues' element={[<SupprterNavbar/>,<SupporterViewAllIssues/>]} />
            <Route path='/supporter-suggestions/:id' element={[<SupprterNavbar/>,<SupporterAddSuggestion/>]} />
            <Route path='/supporter-add-blogs' element={[<SupprterNavbar/>,<SupporterAddBlogs/>]} />
            <Route path='/supporter-edit-blogs' element={[<SupprterNavbar/>,<SupporterEditBlogs/>]} />
            <Route path='/supporter-view-blogs' element={[<SupprterNavbar/>,<SupporterViewBlogs/>]} />


            
            {/* Updated route for editing safe house */}
            <Route path='/supporter-edit-safe-house' element={[<SupprterNavbar/>,<SupporterEditSafeHouse />]} />
            <Route path='/supporter-view-all-safehouses' element={[<SupprterNavbar/>,<SupporterViewAllSafeHouses />]} />

            {/* Counsellor Paths */}
            <Route path='/counsellor-register' element={[<Navbar/>,<CounsellorRegistration />]} />
            <Route path='/counsellor-login' element={[<Navbar/>,<CounsellorLogin/>]} />
            <Route path='/counsellor-forgot-password' element={[<Navbar/>,<CounsellorForgotPassword/>]} />
            <Route path='/counsellor-home' element={[<CouncillorNav/>,<CounsellorHome />]} />
            <Route path='/counsellor-edit-profile' element={[<CouncillorNav/>,<CounsellorEditProfile />]} />


            {/* Legal Professional Paths  */}
            <Route path='/legal-professional-login' element={[<Navbar/>,<LegalProfessionalLogin/>]} />
            <Route path='/legal-professional-register' element={[<Navbar/>,<LegalProfessionalRegister />]} />
            <Route path='/legal-professional-forgot-password' element={[<Navbar/>,<LegalProfessionalForgotPassword/>]} />
            <Route path='/legal-professional-edit-profile' element={[<LPNav/>,<LegalProfessionalEditProfile />]} />
            <Route path='/legal-professional-home' element={[<LPNav/>,<LegalProfessionalHome />]} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

// function ConditionalNavbar() {
//   const location = useLocation();
//   const HeaderPaths = ['/admin-dashboard'];
//   if (HeaderPaths.includes(location.pathname)) {
//     return <AdminNavbar />;
//   } else {
//     return <Navbar />;
//   }

// }

export default App;
