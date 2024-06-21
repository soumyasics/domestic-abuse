import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './AdminSidebar.css';
import { House, People, PersonCircle } from 'react-bootstrap-icons';
import { FaHandshake, FaPeopleGroup, FaBookOpen } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { TbLogout } from "react-icons/tb";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";

const AdminSidebar = ({changeActivePage}) => {
  const [menuOpen, setMenuOpen] = useState({
    supporters: false,
    safeSpace: false,
    counsellors: false,
  });

  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setMenuOpen((prevMenuOpen) => ({
      ...prevMenuOpen,
      [menu]: !prevMenuOpen[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.setItem('isAdminLoggedIn', 'false');
    navigate('/admin-login');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto px-sm-2 px-0 bg-cream">
          <div className='d-flex admin-heading text-white'>
            <PersonCircle size={30} color='purple' className='border rounded-circle m-3 align-self-center' />
            <h3 className='m-3 align-self-center'>Welcome Admin</h3>
          </div>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('supporters')} className="nav-link px-0 align-middle btn btn-link text-decoration-none">
                  <FaHandshake size={24} className='theme-purple' /> <span className="ms-1 me-1 d-none d-sm-inline theme-purple">Supporters</span> <span className="ms-5 d-none d-sm-inline theme-purple"><MdArrowDropDown size={25} /></span>
                </button>
                <ul className={`collapse nav flex-column ms-1 ${menuOpen.supporters ? 'show' : ''}`} id="supportersSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                  <Link to="#" className="nav-link px-0" onClick={() => changeActivePage("home")}> <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span><span className="d-none d-sm-inline theme-purple">Home</span></Link>
                    <Link to="#" className="nav-link px-0" onClick={() => changeActivePage("new-request")}> <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span><span className="d-none d-sm-inline theme-purple">New Request</span></Link>
                    <Link to="#" className="nav-link px-0" onClick={() => changeActivePage("all-supporters")}> <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span><span className="d-none d-sm-inline theme-purple">View All Supporters</span></Link>

                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('safeSpace')} className="nav-link px-0 align-middle btn btn-link text-decoration-none">
                  <House size={24} className='theme-purple' /> <span className="ms-1 me-2 d-none d-sm-inline theme-purple">Safe Space</span><span className="ms-5 d-none d-sm-inline theme-purple"><MdArrowDropDown size={25} /></span>
                </button>
                <ul className={`collapse nav flex-column ms-1 ${menuOpen.safeSpace ? 'show' : ''}`} id="safeSpaceSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="/new-request" className="nav-link px-0"><span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span> <span className="d-none d-sm-inline theme-purple">New Request</span></Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="/view-all" className="nav-link px-0"><span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span> <span className="d-none d-sm-inline theme-purple">View All</span></Link>
                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('counsellors')} className="nav-link px-0 align-middle btn btn-link text-decoration-none">
                  <FaPeopleGroup size={24} className='theme-purple' /> <span className="ms-1 d-none d-sm-inline theme-purple">Counsellors</span><span className="ms-5 d-none d-sm-inline theme-purple"><MdArrowDropDown size={25} /></span>
                </button>
                <ul className={`collapse nav flex-column border-bottom border-dark-subtle ms-1 ${menuOpen.counsellors ? 'show' : ''}`} id="counsellorsSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="/new-request" className="nav-link px-0"><span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span> <span className="d-none d-sm-inline theme-purple">New Request</span></Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="/view-all" className="nav-link px-0"><span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span> <span className="d-none d-sm-inline theme-purple">View All</span></Link>
                  </li>
                </ul>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <Link to="/legal-professionals" className="nav-link px-0 align-middle">
                  <GoLaw size={24} className='theme-purple' /> <span className="ms-1 d-none d-sm-inline theme-purple">Legal Professionals</span>
                </Link>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <Link to="/users" className="nav-link px-0 align-middle">
                  <People size={24} className='theme-purple' /> <span className="ms-1 d-none d-sm-inline theme-purple">Users</span>
                </Link>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <Link to="/blogs" className="nav-link px-0 align-middle">
                  <FaBookOpen size={24} className='theme-purple' /> <span className="ms-1 d-none d-sm-inline theme-purple">Blogs</span>
                </Link>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <button className="nav-link px-0 align-middle btn btn-link text-decoration-none" onClick={handleLogout}>
                  <TbLogout size={24} className='theme-purple' /> <span className="ms-1 d-none d-sm-inline theme-purple">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
