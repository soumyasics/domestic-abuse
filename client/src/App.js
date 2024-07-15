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
import SupporterViewAllSafeHousesRequests from './Pages/Supporter/SupporterViewAllSafeHousesRequests/SupporterViewAllSafeHousesRequests';
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
import AdminUserViewAll from './Pages/Admin/AdminUserViewAll/AdminUserViewAll';

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
import SupporterViewAllIssuesHistory from './Pages/Supporter/SupporterViewAllIssuesHistory/SupporterViewAllIssuesHistory';
import SupporterViewAllSafehouses from './Pages/Supporter/SupporterViewAllSafehouses/SupporterViewAllSafehouses';
import SupporterViewSuggestionDetails from './Pages/Supporter/SupporterViewSuggestionDetails/SupporterViewSuggestionDetails';
import UserEditIssue from './Pages/User/UserEditIssue/UserEditIssue';
import UserViewCounsellors from './Pages/User/UserViewCounsellors/UserViewCounsellors';
import UserViewCounsellorDetails from './Pages/User/UserViewCounsellorDetails/UserViewCounsellorDetails';
import CounsellorViewClients from './Pages/Counsellor/CounsellorViewClients/CounsellorViewClients';
import CounsellorAppointmentRequests from './Pages/Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests';
import UserViewLegalProfessionals from './Pages/User/UserViewLegalProfessionals/UserViewLegalProfessionals';
import UserLegalProfessionalDetails from './Pages/User/UserLegalProfessionalDetails/UserLegalProfessionalDetails';
import CounsellorAddBlogs from './Pages/Counsellor/CounsellorAddBlogs/CounsellorAddBlogs';
import CounsellorEditBlogs from './Pages/Counsellor/CounsellorEditBlogs/CounsellorEditBlogs';
import CounsellorViewBlogs from './Pages/Counsellor/CounsellorViewBlogs/CounsellorViewBlogs';
import LegalProfessionalAddBlogs from './Pages/Legal Professional/LegalProfessionalAddBlogs/LegalProfessionalAddBlogs';
import LegalProfessionalEditBlogs from './Pages/Legal Professional/LegalProfessionalEditBlogs/LegalProfessionalEditBlogs';
import LegalProfessionalViewBlogs from './Pages/Legal Professional/LegalProfessionalViewBlogs/LegalProfessionalViewBlogs';
import UserViewBlogs from './Pages/User/UserViewBlogs/UserViewBlogs';
import UserViewRequestHistory from './Pages/User/UserViewRequestHistory/UserViewRequestHistory';
import CounsellorViewAppointmentDetails from './Pages/Counsellor/CounsellorViewAppointmentDetails/CounsellorViewAppointmentDetails';
import UserAddCase from './Pages/User/UserAddCase/UserAddCase';

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
            <Route path='/user-view-all-counsellors' element={[<UserNav/>,<UserViewCounsellors/>]} />
            <Route path='/user-view-all-counsellor-details' element={[<UserNav/>,<UserViewCounsellorDetails/>]} />
            <Route path='/user-view-all-legal-professionals' element={[<UserNav/>,<UserViewLegalProfessionals/>]} />
            <Route path='/user-legal-professional-detail/:id' element={[<UserNav/>,<UserLegalProfessionalDetails/>]} />
            <Route path='/user-add-issue' element={[<UserNav/>,<UserAddIssue/>]} />
            <Route path='/user-edit-issue' element={[<UserNav/>,<UserEditIssue/>]} />
            <Route path='/user-add-case' element={[<UserNav/>,<UserAddCase/>]} />
            <Route path='/user-payment' element={[<UserNav/>,<UserPayment/>]} />
            <Route path='/user-view-blogs' element={[<UserNav/>,<UserViewBlogs/>]} />
            <Route path='/user-view-request-history' element={[<UserNav/>,<UserViewRequestHistory/>]} />

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


            <Route path='/admin-viewall-users' element={[<AdminNavbar/>,<AdminUserViewAll />]} />



            {/* Supporter Paths */
            
            }
            <Route path='/supporter-register' element={[<Navbar/>,<SupporterRegister />]} />
            <Route path='/supporter-login' element={[<Navbar/>,<SupporterLogin />]} />
            <Route path='/supporter-home' element={[<SupprterNavbar/>,<SupporterHome />]} />
            <Route path='/supporter-forgot-password' element={[<Navbar/>,<SupporterForgotPassword />]} />
            <Route path='/supporter-edit-profile' element={[<SupprterNavbar/>,<SupporterEditProfile />]} />
            <Route path='/supporter-add-safe-space' element={[<SupprterNavbar/>,<SupporterAddSafeHouse />]} />
            <Route path='/supporter-view-all-safehouses-requests' element={[<SupprterNavbar/>,<SupporterViewAllSafeHousesRequests />]} />
            <Route path='/supporter-view-all-issues' element={[<SupprterNavbar/>,<SupporterViewAllIssues/>]} />
            <Route path='/supporter-view-all-issues-history' element={[<SupprterNavbar/>,<SupporterViewAllIssuesHistory/>]} />
            <Route path='/supporter-suggestions/:id' element={[<SupprterNavbar/>,<SupporterAddSuggestion/>]} />
            <Route path='/supporter-suggestion-details/:id' element={[<SupprterNavbar/>,<SupporterViewSuggestionDetails/>]} />
            <Route path='/supporter-add-blogs' element={[<SupprterNavbar/>,<SupporterAddBlogs/>]} />
            <Route path='/supporter-edit-blogs/:id' element={[<SupprterNavbar/>,<SupporterEditBlogs/>]} />
            <Route path='/supporter-view-blogs' element={[<SupprterNavbar/>,<SupporterViewBlogs/>]} />

            {/* Updated route for editing safe house */}
            <Route path='/supporter-edit-safe-house/:id' element={[<SupprterNavbar/>,<SupporterEditSafeHouse />]} />
            <Route path='/supporter-view-all-safehouses' element={[<SupprterNavbar/>,<SupporterViewAllSafehouses />]} />

            {/* Counsellor Paths */}
            <Route path='/counsellor-register' element={[<Navbar/>,<CounsellorRegistration />]} />
            <Route path='/counsellor-login' element={[<Navbar/>,<CounsellorLogin/>]} />
            <Route path='/counsellor-forgot-password' element={[<Navbar/>,<CounsellorForgotPassword/>]} />
            <Route path='/counsellor-home' element={[<CouncillorNav/>,<CounsellorHome />]} />
            <Route path='/counsellor-edit-profile' element={[<CouncillorNav/>,<CounsellorEditProfile />]} />
            <Route path='/counsellor-appointment-requests' element={[<CouncillorNav/>,<CounsellorAppointmentRequests/>]} />
            <Route path='/counsellor-view-appointment-details' element={[<CouncillorNav/>,<CounsellorViewAppointmentDetails/>]} />
            <Route path='/counsellor-view-clients' element={[<CouncillorNav/>,<CounsellorViewClients />]} />
            <Route path='/counsellor-add-blogs' element={[<CouncillorNav/>,<CounsellorAddBlogs/>]} />
            <Route path='/counsellor-edit-blogs/:id' element={[<CouncillorNav/>,<CounsellorEditBlogs/>]} />
            <Route path='/counsellor-view-blogs' element={[<CouncillorNav/>,<CounsellorViewBlogs/>]} />
            
            {/* Legal Professional Paths  */}
            <Route path='/legal-professional-login' element={[<Navbar/>,<LegalProfessionalLogin/>]} />
            <Route path='/legal-professional-register' element={[<Navbar/>,<LegalProfessionalRegister />]} />
            <Route path='/legal-professional-forgot-password' element={[<Navbar/>,<LegalProfessionalForgotPassword/>]} />
            <Route path='/legal-professional-edit-profile' element={[<LPNav/>,<LegalProfessionalEditProfile />]} />
            <Route path='/legal-professional-home' element={[<LPNav/>,<LegalProfessionalHome />]} />
            <Route path='/legal-professional-add-blogs' element={[<LPNav/>,<LegalProfessionalAddBlogs/>]} />
            <Route path='/legal-professional-edit-blogs/:id' element={[<LPNav/>,<LegalProfessionalEditBlogs/>]} />
            <Route path='/legal-professional-view-blogs' element={[<LPNav/>,<LegalProfessionalViewBlogs/>]} />


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
