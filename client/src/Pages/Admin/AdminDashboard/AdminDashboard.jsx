import React, { useState, Fragment, useEffect } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import { PiWindowsLogoThin } from "react-icons/pi";
import AdminDasboardOverview from '../AdminDashboardOverview/AdminDasboardOverview';
import SupportersRequestTable from '../SupportersRequest/SupportersRequestTable';
import AdminViewAllSafehouses from '../AdminViewAllSafehouses/AdminViewAllSafehouses';
import AdminSafehouseDetailedView from '../AdminSafehouseDetailedView/AdminSafehouseDetailedView';
import axiosInstance from '../../../Constant/BaseURL'
import { useNavigate } from 'react-router-dom';
import AdminCounsellorRequests from '../AdminCounsellorRequests/AdminCounsellorRequests';
import AdminLegalProfessionalRequests from '../AdminLegalProfessionalRequests/AdminLegalProfessionalRequests';
import AdminCounsellorViewAll from '../AdminCounsellorViewAll/AdminCounsellorViewAll';
import AdminSafehouseRequests from '../AdminSafehouseRequests/AdminSafehouseRequests';
function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const changeActivePage = (page) => {
    setActivePage(page);
  };
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

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


  return (
    <Fragment>
      <div className='container-fluid bg-creamy'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminSidebar changeActivePage={changeActivePage} />
          </div>
          <div className='col '>
            <div className='row mt-3'>
              <div className='col m-5 d-flex'>
                <PiWindowsLogoThin size={50} /> <span className='align-self-center'><h2 className='theme-purple d-inline '>Dashboard</h2></span>
              </div>
            </div>
            <div className="admin-dashboard-main-bar">
              {activePage === "home" && <AdminDasboardOverview />}
              {activePage === "new-request" && <SupportersRequestTable activePage={activePage} />}
              {activePage === "all-supporters" && <SupportersRequestTable activePage={activePage} />}
              {activePage === "all-safehouses" && <AdminViewAllSafehouses activePage={activePage} />}
              {activePage === "request-safehouse" && <AdminSafehouseRequests activePage={activePage} />}
              {activePage === "safehouse-details" && <AdminSafehouseDetailedView activePage={activePage} />}
              {activePage === "request-counsellors" && <AdminCounsellorRequests activePage={activePage} />}
              {activePage === "all-counsellors" && <AdminCounsellorViewAll activePage={activePage} />}
              {activePage === "request-legal-professionals" && <AdminLegalProfessionalRequests activePage={activePage} />}

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
