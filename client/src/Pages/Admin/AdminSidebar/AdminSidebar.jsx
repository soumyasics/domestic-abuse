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
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext'; 


const AdminSidebar = ({ changeActivePage }) => {
  const [menuOpen, setMenuOpen] = useState({
    supporters: false,
    safeSpace: false,
    counsellors: false,
    legalProfessionals:false,
    users:false,
  });

  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const toggleMenu = (menu) => {
    setMenuOpen((prevMenuOpen) => ({
      ...prevMenuOpen,
      [menu]: !prevMenuOpen[menu],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col px-sm-2 px-0 bg-cream">
          <div className='d-flex admin-heading text-white'>
            <span className='d-flex align-items-center'>
            <PersonCircle size={32}  className='border rounded-circle m-3 align-self-center theme-purple' />
            </span>
            <h6 className='m-3 align-self-center'>Welcome Admin</h6>
          </div>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-0 pt-2 text-white min-vh-100">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
            <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <Link to="#" className="nav-link d-flex justify-content-between align-items-center " onClick={() => changeActivePage("home")}>  
                  <div className="d-flex align-items-center">
                    <House size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Home</span>
                  </div>
                </Link>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('supporters')} className="nav-link btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <FaHandshake size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Supporters</span>
                  </div>
                  <MdArrowDropDown size={25} className="theme-purple" />
                </button>
                <ul className={`collapse nav flex-column ms-1 ${menuOpen.supporters ? 'show' : ''}`} id="supportersSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link px-0 admin-list" onClick={() => changeActivePage("new-request")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">New Request</span>
                    </Link>
                    <Link to="#" className="nav-link px-0 admin-list" onClick={() => changeActivePage("all-supporters")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">View All Supporters</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('safeSpace')} className="nav-link btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <House size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Safe Space</span>
                  </div>
                  <MdArrowDropDown size={25} className="theme-purple" />
                </button>
                <ul className={`collapse nav flex-column ms-1 ${menuOpen.safeSpace ? 'show' : ''}`} id="safeSpaceSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link px-0 admin-list" onClick={() => changeActivePage("request-safehouse")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">New Request</span>
                    </Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link px-0 admin-list" onClick={() => changeActivePage("all-safehouses")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">View All Safehouses</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('counsellors')} className="nav-link btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <FaPeopleGroup size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Counsellors</span>
                  </div>
                  <MdArrowDropDown size={25} className="theme-purple" />
                </button>
                <ul className={`collapse nav flex-column border-bottom border-dark-subtle ms-1 ${menuOpen.counsellors ? 'show' : ''}`} id="counsellorsSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0" onClick={() => changeActivePage("request-counsellors")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">New Request</span>
                    </Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0">
                      <span className="ms-2 d-none d-sm-inline theme-purple" onClick={() => changeActivePage("all-counsellors")}><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple" onClick={() => changeActivePage("all-counsellors")}>View All</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('legalProfessionals')} className="nav-link btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <GoLaw size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Legal Professionals</span>
                  </div>
                  <MdArrowDropDown size={25} className="theme-purple" />
                </button>
                <ul className={`collapse nav flex-column border-bottom border-dark-subtle ms-1 ${menuOpen.legalProfessionals ? 'show' : ''}`} id="legalProfessionalsSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0" onClick={() => changeActivePage("request-legal-professionals")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple" onClick={() => changeActivePage("request-legal-professionals")}><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">New Request</span>
                    </Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0">
                      <span className="ms-2 d-none d-sm-inline theme-purple" onClick={() => changeActivePage("admin-viewall-aprvd-LegalProfessional")}><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple" onClick={() => changeActivePage("admin-viewall-aprvd-LegalProfessional")}>View All</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='border-bottom border-dark-subtle w-100'>
                <button onClick={() => toggleMenu('users')} className="nav-link btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <People size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Users</span>
                  </div>
                  <MdArrowDropDown size={25} className="theme-purple" />
                </button>
                <ul className={`collapse nav flex-column border-bottom border-dark-subtle ms-1 ${menuOpen.users ? 'show' : ''}`} id="usersSubmenu" data-bs-parent="#menu">
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0" onClick={() => changeActivePage("request-users")}>
                      <span className="ms-2 d-none d-sm-inline theme-purple"><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple">New Request</span>
                    </Link>
                  </li>
                  <li className="w-100 ms-3">
                    <Link to="#" className="nav-link admin-list px-0">
                      <span className="ms-2 d-none d-sm-inline theme-purple" onClick={() => changeActivePage("all-users")}><IoMdArrowDropright size={25} /></span>
                      <span className="d-none d-sm-inline theme-purple" onClick={() => changeActivePage("all-users")}>View All</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <Link to="/blogs" className="nav-link d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center">
                    <FaBookOpen size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Blogs</span>
                  </div>
                </Link>
              </li>
              <li className='admin-list w-100 border-bottom border-dark-subtle'>
                <button className="nav-link d-flex justify-content-between align-items-center  btn btn-link text-decoration-none" onClick={handleLogout}>
                  <div className="d-flex align-items-center">
                    <TbLogout size={24} className='theme-purple' />
                    <span className="ms-1 d-none d-sm-inline theme-purple">Logout</span>
                  </div>
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
