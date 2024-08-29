import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png';

function AdminNavbar({ changeActivePage }) {  // Added changeActivePage prop
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") != 1)
      navigate('/admin-login');
  }, []);

  const handleImageClick = () => {
    navigate('/admin-dashboard');
  };

  const handleLogout = () => {
    localStorage.setItem('admin', 0);
    navigate('/admin-login');
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-light" id="navbar-linked">
        <Link className="navbar-brand ms-5 me-0" to="/admin-dashboard">
          <img src={brand} alt="brand" height={80} />
        </Link>
        <h1 className="navbar-brands d-flex align-self-end ms-0" onClick={handleImageClick}>
          <span className="theme-purple me-2">Safe</span> <span className="theme-green">Space</span>
        </h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-5 justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto mx-5">
            <li className="nav-item active">
              <button className="nav-link mx-3 theme-purple fw-semibold" onClick={() => changeActivePage('home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link mx-3 theme-purple fw-semibold"  onClick={() => changeActivePage('all-users')}>Users</button>
            </li>
            <li className="nav-item">
              <button className="nav-link mx-3 theme-purple fw-semibold btn btn-link" onClick={() => changeActivePage('blogs')}>Blog</button>  {/* Updated Link */}
            </li>
            <li className="nav-item">
              <button className="nav-link mx-3 theme-purple fw-semibold btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
