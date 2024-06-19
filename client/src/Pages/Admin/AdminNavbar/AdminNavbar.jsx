import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png'

function AdminNavbar() {
    const navigate= useNavigate();
    const handleImageClick = ()=>{
        navigate('/');
    }
    const handleLogout = () =>{
        localStorage.setItem('isAdminLoggedIn', 'false');
        navigate('/admin-login')
    }
  return (
    <div className='container-fluid p-0 '>
            <nav className="navbar navbar-expand-lg navbar-light" id='navbar-linked'>
                <Link className="navbar-brand ms-5 me-0" to="/"><img src={brand} alt='brand' height={80} className='' /></Link>
                <h1 className='navbar-brands d-flex align-self-end ms-0' onClick={handleImageClick}> <span className='theme-purple me-2'>Safe</span> <span className='theme-green'>Space</span></h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-5 justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-auto mx-5">
                        <li className="nav-item active">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link mx-3 theme-purple fw-semibold" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
  )
}

export default AdminNavbar