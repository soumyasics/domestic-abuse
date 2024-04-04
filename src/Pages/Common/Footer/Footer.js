import React from 'react';
import './Footer.css'
import brand from '../../../Assets/Frame 10.png';
function Footer() {
  return (
    <div className='container-fluid footer-base bg-primary'>
      <nav className="navbar navbar-expand-lg   navbar-dark" id='navbar-linked'>
        
        <a className="navbar-brand  mx-5" href="#"><img src={brand} alt='user'/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-5 justify-content-end" id="navbarNav1">
            <ul className="navbar-nav ml-auto mx-5 ">
                <li className="nav-item active">
                    <a className="nav-link  " href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">About </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  " href="#">Contact</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  " href="#">Counselling</a>
                </li>
            </ul>
        </div>
      </nav>
      <div className="mb-3 text-primary ">
              
      </div>
      <div className="container-fluid text-right mt-5">
  <div className="row">
    <div className="col"></div>
    <div className="col-8 d-flex justify-content-end">
      <input type="email" className="form-control text-primary footer-email m-3" id="exampleFormControlInput1" placeholder="Enter your email address"/>
      <button type="button" className="btn btn-light text-primary my-3 py-3 w-25">Subscribe</button>
    </div>
  </div>
</div>

    </div>
  )
}

export default Footer