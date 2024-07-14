import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserLegalProfessionalDetails.css';
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL, getLegalProfessionalById } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFile } from "react-icons/fa";

function UserLegalProfessionalDetails() {
  const { id } = useParams();
  const [legalProfessional, setLegalProfessional] = useState({
    photo: { filename: '' },
    proof: { filename: '' }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLegalProfessionalData = async () => {
      if (id) {
        try {
          const legalProfessionalData = await getLegalProfessionalById(id);
          setLegalProfessional(legalProfessionalData.data);
          console.log(legalProfessionalData.data);
        } catch (error) {
          console.error('Failed to fetch legal professional data:', error);
        }
      }
    };
    fetchLegalProfessionalData();
  }, [id]);

  const handleRequest = async () => {
    toast.success('Request sent successfully.');
    // Implement request logic here
  };

  const handleCancel = () => {
    toast.info('Request cancelled.');
    // Implement cancel logic here
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row m-5'>
        <div className='col'>
          <h3 className='text-center theme-purple fw-bold'>Legal Professional Details</h3>
        </div>
      </div>
      {legalProfessional ? (
        <div className='row theme-purple m-5'>
          <div className='col text-center bg-purple d-flex'>
            <div className="rounded-circle overflow-hidden m-auto" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
              <img
                src={legalProfessional.photo && legalProfessional.photo.filename ? `${IMG_BASE_URL}/${legalProfessional.photo.filename}` : demoLegalProfessional}
                alt='Legal Professional'
                className='img-fluid '
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = demoLegalProfessional;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className='col fs-6 border rounded bg-creamy'>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Name:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.name}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Email Id:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.email}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact No:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.contact}
              </div>
            </div>
            
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Firm Name:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.firmName}
              </div>
            </div>
            
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                License Number:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.licenseNumber}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Bar Association ID:
              </div>
              <div className='col-6 text-secondary'>
                {legalProfessional.barAssociationId}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Id Proof:
              </div>
              <div className='col-6 text-secondary'>
                <a href={`${IMG_BASE_URL}/${legalProfessional.proof.filename}`} target="_blank" rel="noopener noreferrer">
                  <FaFile className='theme-purple mx-1' /> Click Here
                </a>
              </div>
            </div>
            <div className='text-center'>
              <Button
                className="m-2 px-5 bg-purple text-white"
                onClick={handleRequest}
              >
                Request
              </Button>
              <Button
                className="m-2 px-5 bg-purple text-white"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading legal professional data...</p>
      )}
    </div>
  );
}

export default UserLegalProfessionalDetails;
