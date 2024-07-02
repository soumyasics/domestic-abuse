import React from 'react';
import { Link } from 'react-router-dom';
import './LegalProfessionalHome.css';
import home from '../../../Assets/legal-home.png';

function LegalProfessionalHome() {
  return (
    <div className='container-xxl'>
      <div className='row'>
        <div className='col-xl-8 m-auto'>
          <img src={home} alt='legal girl' className='img-fluid m-auto' />
        </div>
        <div className='col-xl-4 text-center p-5'>
          <div className="card m-5 shadow-sm rounded bg-purple text-white" style={{ width: '28rem' }}>
            <div className="card-body text-start">
              <h2 className="card-title fs-5 fw-bold">Welcome to Your Legal Hub.</h2>
              <h3 className="card-subtitle mb-3  fs-3 text-white">Empowering Legal Assistance for Those in Need.</h3>
              <p className="card-text fs-6">
                Your expertise can provide the critical support and guidance needed to navigate complex legal systems, ensuring that survivors receive the protection and justice they deserve. By joining our network, you can offer invaluable legal assistance, helping to secure restraining orders, custody arrangements, and other legal remedies that can safeguard survivors and their families. Your contribution can not only change lives but also restore hope and security to those who need it most. Together, we can create a safer, more just world for everyone.
              </p>
              <Link to="/appointments" className="btn btn-light theme-purple px-5 m-auto ">Appointments</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalProfessionalHome