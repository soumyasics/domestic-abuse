import React from 'react';
import { Link } from 'react-router-dom';
import './LegalProfessionalHome.css';
import home from '../../../Assets/legal-home.png';
import { PiUsersFourLight } from "react-icons/pi";
import { GiFizzingFlask } from "react-icons/gi";
import { FaGavel,FaFile } from "react-icons/fa";

function LegalProfessionalHome() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-8 m-auto d-flex'>
          <img src={home} alt='legal girl' className='img-fluid m-auto object-fit-cover ' />
        </div>
        <div className='col-4 text-center p-5'>
          <div className="card  shadow-sm rounded bg-purple text-white h-auto m-auto" style={{ width: '34rem' }}>
            <div className="card-body text-start m-5">
              <h2 className="card-title fs-5 fw-bold m-5">Welcome to Your Legal Hub.</h2>
              <h3 className="card-subtitle m-5  fs-3 text-white">Empowering Legal Assistance for Those in Need.</h3>
              <p className="card-text fs-6 m-5">
                Your expertise can provide the critical support and guidance needed to navigate complex legal systems, ensuring that survivors receive the protection and justice they deserve. By joining our network, you can offer invaluable legal assistance, helping to secure restraining orders, custody arrangements, and other legal remedies that can safeguard survivors and their families. Your contribution can not only change lives but also restore hope and security to those who need it most. Together, we can create a safer, more just world for everyone.
              </p>
              <Link to="/appointments" className="btn btn-light theme-purple px-5  mx-5 mt-1">Appointments</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col'>
          <div className='card bg-light legal-card-height'>
            <div className='card-body text-center'>
              <h5 className='theme-purple card-title fw-semibold'>Enhanced Client Communication </h5>
              <div className='rounded-circle bg-purple legal-card-icon-box d-flex align-items-center justify-content-center my-3 mt-4 mx-auto p-3'>
                <PiUsersFourLight className='text-white' size={25} />
              </div>
              <div className='card-text my-5'>
                Application can Facilitate Seamless
                Communication advocates and their
                clients through messaging features, video
                or calls, Its improves accessibility and
                responsiveness, enhancing client
                satisfaction.
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card bg-light legal-card-height'>
            <div className='card-body text-center'>
              <h5 className='theme-purple card-title fw-semibold'>Case Management </h5>
              <div className='rounded-circle bg-purple legal-card-icon-box d-flex align-items-center justify-content-center my-3 mt-4 mx-auto p-3'>
                <GiFizzingFlask className='text-white' size={25} />
              </div>
              <div className='card-text my-5'>
                Applications can offer tools for advocates
                to manage their cases efficiently, including
                updating case details, tracking deadlines,
                organizing documents, and scheduling
                appointments. This streamlines workflow
                and improves productivity.

              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card bg-light legal-card-height'>
            <div className='card-body text-center'>
              <h5 className='theme-purple card-title fw-semibold'>Legal Research and Resources </h5>
              <div className='rounded-circle bg-purple legal-card-icon-box d-flex align-items-center justify-content-center my-3 mt-4 mx-auto p-3'>
                <FaGavel className='text-white' size={25} />
              </div>
              <div className='card-text my-5'>
                Access to legal research databases,
                precedents, and resources directly
                through the application can assist
                advocates in preparing arguments,
                drafting documents, and staying
                updated with legal developments.

              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card bg-light'>
            <div className='card-body text-center legal-card-height'>
              <h5 className='theme-purple card-title fw-semibold'>Client Intake and Onboarding </h5>
              <div className='rounded-circle bg-purple legal-card-icon-box d-flex align-items-center justify-content-center my-3 mt-4 mx-auto p-3'>
                <FaFile className='text-white' size={25} />
              </div>
              <div className='card-text my-5'>
                Applications can streamline the client intake process, allowing advocates to capture client information, assess case details, and onboard new clients efficiently.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalProfessionalHome