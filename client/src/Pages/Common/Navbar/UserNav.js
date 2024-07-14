import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png';
import { AuthContext } from '../../../context/AuthContext';

function UserNav() {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("userId")=='')
          navigate('/');
      }, []);
        const handleLogout = () => {
          localStorage.setItem('userId','')
          navigate('/');
        };
        // const { isLoggedIn, logout, userRole } = useContext(AuthContext);
    
        const handleImageClick = () => {
            // if (isLoggedIn) {
            //     switch (userRole) {
            //         case 'supporter':
            //             navigate('/supporter-home');
            //             break;
            //         case 'counsellor':
            //             navigate('/counsellor-home');
            //             break;
            //         case 'legalProfessional':
            //             navigate('/legal-professional-home');
            //             break;
            //         case 'admin':
            //             navigate('/admin-dashboard');
            //             break;
            //         default:
            //             navigate('/');
            //             break;
            //     }
            // } else {
            //     navigate('/');
            // }
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
                                {/* {isLoggedIn && userRole === 'supporter' ? (
                                    <Link className="nav-link mx-3 theme-purple fw-semibold" to="/supporter-home">Home</Link>
                                ) : ( */}
                                    <Link className="nav-link mx-3 theme-purple fw-semibold" to="/user-home">Home</Link>
                                {/* )} */}
                            </li>
                            
                            {/* <li className="nav-item">
                                <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">About Us</Link>
                            </li> */}
                            
                            {/* <li className="nav-item">
                                <Link className="nav-link mx-3 theme-purple fw-semibold" to="/">Our Services</Link>
                            </li> */}
                           

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Report Issues
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1">
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-add-issue">Add New</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/">View Suggestions</Link></li>
                                  
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Services
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown2">
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-view-all-safehouses">Safe Spaces</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-view-all-supporters">Supporters</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-view-all-counsellors">Counsellors</Link></li>
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-view-all-legal-professionals">Legal LegalProfessionalRegister</Link></li>
                                  
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Settings
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown3">
                                    <li><Link className="dropdown-item theme-purple fw-semibold" to="/user-edit-profile">Profile View</Link></li>
                                    <li><button className="dropdown-item theme-purple fw-semibold" onClick={handleLogout}>Logout</button></li>
                                  
                                </ul>
                            </li>
                            {/* {isLoggedIn ? (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle mx-3 theme-purple fw-semibold" href="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Profile
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownProfile">
                                            <li><Link className="dropdown-item theme-purple fw-semibold" to={getProfileLink()}>Edit Profile</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link mx-3 theme-purple fw-semibold btn btn-link py-1" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : ( */}
                               
                            {/* )} */}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

    

export default UserNav