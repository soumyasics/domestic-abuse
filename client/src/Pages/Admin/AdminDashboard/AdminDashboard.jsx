import React, { useState, Fragment, useEffect } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import AdminNavbar from '../AdminNavbar/AdminNavbar';  // Import the AdminNavbar
import AdminDashboardOverview from '../AdminDashboardOverview/AdminDasboardOverview'
import SupportersRequestTable from '../SupportersRequest/SupportersRequestTable';
import AdminViewAllSafehouses from '../AdminViewAllSafehouses/AdminViewAllSafehouses';
import AdminSafehouseDetailedView from '../AdminSafehouseDetailedView/AdminSafehouseDetailedView';
import axiosInstance from '../../../Constant/BaseURL';
import AdminCounsellorRequests from '../AdminCounsellorRequests/AdminCounsellorRequests';
import AdminLegalProfessionalRequests from '../AdminLegalProfessionalRequests/AdminLegalProfessionalRequests';
import AdminCounsellorViewAll from '../AdminCounsellorViewAll/AdminCounsellorViewAll';
import AdminSafehouseRequests from '../AdminSafehouseRequests/AdminSafehouseRequests';
import AdminLegalProfessionalDetailedView from '../AdminLegalProfessionalDetailedView/AdminLegalProfessionalDetailedView';
import AdminLegalProfessionalDetailedViewAprvd from '../AdminLegalProfessionalDetailedViewAprvd/AdminLegalProfessionalDetailedViewAprvd';
import AdminLegalProfessionalViewAll from '../AdminLegalProfessionalViewAll/AdminLegalProfessionalViewAll';
import AdminUserRequests from '../AdminUserRequests/AdminUserRequests';
import AdminUserViewAll from '../AdminUserViewAll/AdminUserViewAll';
import AdminviewAllBlogs from '../AdminUserViewAll/AdminviewAllBlogs';
import { PiWindowsLogoThin } from "react-icons/pi";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [userData, setUserData] = useState({});
  const changeActivePage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    axiosInstance
      .post(`viewSupporters`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <AdminDashboardOverview />;
      case "new-request":
      case "all-supporters":
        return <SupportersRequestTable activePage={activePage} />;
      case "all-safehouses":
        return <AdminViewAllSafehouses activePage={activePage} />;
      case "all-counsellors":
        return <AdminCounsellorViewAll activePage={activePage} />;
      case "request-safehouse":
        return <AdminSafehouseRequests activePage={activePage} />;
      case "safehouse-details":
        return <AdminSafehouseDetailedView activePage={activePage} />;
      case "request-counsellors":
        return <AdminCounsellorRequests activePage={activePage} />;
      case "request-legal-professionals":
        return <AdminLegalProfessionalRequests activePage={activePage} />;
      case "admin-viewdetailedCouncilor-req":
        return <AdminLegalProfessionalDetailedView activePage={activePage} />;
      case "admin-viewdetailedLegalProfessional-aprvd":
        return <AdminLegalProfessionalDetailedViewAprvd activePage={activePage} />;
      case "admin-viewall-aprvd-LegalProfessional":
        return <AdminLegalProfessionalViewAll activePage={activePage} />;
      case "request-users":
        return <AdminUserRequests activePage={activePage} />;
      case "all-users":
        return <AdminUserViewAll activePage={activePage} />;
      case "blogs":
        return <AdminviewAllBlogs activePage={activePage} />;
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <Fragment>
      <div className='container-fluid bg-creamy'>
        <div className='row'>
          <AdminNavbar changeActivePage={changeActivePage} />  {/* Updated to include changeActivePage */}
          <div className='col-md-2'>
            <AdminSidebar changeActivePage={changeActivePage} />
          </div>
          <div className='col'>
            <div className='row mt-3'>
              <div className='col m-5 d-flex'>
                <PiWindowsLogoThin size={50} />
                <span className='align-self-center'>
                  <h2 className='theme-purple d-inline'>Dashboard</h2>
                </span>
              </div>
            </div>
            <div className="admin-dashboard-main-bar">
              {renderActivePage()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
