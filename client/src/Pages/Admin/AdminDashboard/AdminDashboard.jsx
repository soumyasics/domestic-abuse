import React, { useState, Fragment } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import { PiWindowsLogoThin } from "react-icons/pi";
import AdminDasboardOverview from '../AdminDashboardOverview/AdminDasboardOverview';
import SupportersRequestTable from '../Request/SupportersRequestTable';

function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const changeActivePage = (page) => {
    setActivePage(page);
  };
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
              {activePage === "new-request" && <SupportersRequestTable />}

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
