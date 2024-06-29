// src/components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png';
import { AuthContext } from '../../../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout, userRole } = useContext(AuthContext);

    const handleImageClick = () => {
        if (isLoggedIn) {
            switch (userRole) {
                case 'supporter':
                    navigate('/supporter-home');
                    break;
                case 'counsellor':
                    navigate('/counsellor-home');
                    break;
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id='navbar-linked'>
                <Link className="navbar-brand ms-5 me-0" to="/">
                    <img src={brand} alt='brand' height={80} className='' />
                </Link>
                <h1 className='navbar-brands d-flex align-self-end ms-0' onClick={handleImageClick}>
                    <span className='theme-purple me-2'>Safe</span>
                    <span className='theme-green'>Space</span>
                </h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-5 justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-auto mx-5">
                        <li className="nav-item active">
                            {isLoggedIn && userRole === 'supporter' ? (
                                <Link className="nav-link mx-3 theme-purple fw-semibold" to="/supporter-home">Home</Link>
                            ) : (
                                <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Home</Link>
                            )}
                        </li>
                        <li className="nav-item active">
                            {isLoggedIn && userRole === 'supporter' ? (
                                <Link className="nav-link mx-3 theme-purple fw-semibold" to="/supporter-view-all-safehouses">Safe House</Link>
                            ) : (
                               <p></p>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Our Services</Link>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="nav-link mx-3 theme-purple fw-semibold btn btn-link py-1" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1" >
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/admin-login">Admin</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/supporter-login">Supporter</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/counsellor-login">Counsellor</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/legal-professional-login">Legal Professional</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
