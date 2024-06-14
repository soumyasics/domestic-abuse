import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png';

function Navbar() {
    const navigate = useNavigate();

    const handleImageClick = () => {
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
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Our Services</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1" >
                                <li><Link className="dropdown-item theme-purple fw-semibold" to="/admin-login">Admin</Link></li>
                                <li><Link className="dropdown-item theme-purple fw-semibold" to="#">Supporter</Link></li>
                                <li><Link className="dropdown-item theme-purple fw-semibold" to="#">Legal Professional</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
