import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminLegalProfessionalDetailedView.css';
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL,viewAllApprovedLegalProfessionals, getLegalProfessionalById, approveLegalProfessionalsById, rejectLegalProfessionalsById } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaFile } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

function AdminLegalProfessionalDetailedView() {
  const { id } = useParams();
  const [legalProfessional, setLegalProfessional] = useState({photo:{filename:''},proof:{
    filename:''
  }});
  const navigate=useNavigate()

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

  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this legal professional?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveLegalProfessionalsById(id);
              if (response.success) {
                toast.success('Legal professional approved successfully.', {
                  autoClose: 900, 
                });
                setTimeout(() => {
                  navigate('/admin-viewall-aprvd-LegalProfessional');
                }, 1400);
              } else {
                toast.error(response.message || 'Error approving legal professional.', {
                  autoClose: 900, 
                });
              }
            } catch (error) {
              toast.error('Error approving legal professional.', {
                autoClose: 900, 
              });
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleReject = async (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this legal professional?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectLegalProfessionalsById(id);
              if (response.success) {
                toast.success('Legal professional rejected successfully.', {
                  autoClose: 900, 
                });
                setTimeout(() => {
                  navigate('/admin-viewall-aprvd-LegalProfessional');
                }, 1400);
              } else {
                toast.error(response.message || 'Error rejecting legal professional.', {
                  autoClose: 900, 
                });
              }
            } catch (error) {
              toast.error('Error rejecting legal professional.', {
                autoClose: 900, 
              });
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row m-5'>
      <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate(-1)} />
                </div>
            </div>
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
                <a href={ `${IMG_BASE_URL}/${legalProfessional.proof.filename}`} target="_blank" rel="noopener noreferrer"> <FaFile className='theme-purple mx-1'/> Click Here</a>
              </div>
            </div>
            <div className='text-center'>
              <Button
                variant="outline-success"
                className="m-2 px-5"
                onClick={() => handleApprove(legalProfessional._id)}
              >
                Accept
              </Button>
              <Button
                variant="outline-danger"
                className="m-2 px-5"
                onClick={() => handleReject(legalProfessional._id)}
              >
                Reject
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

export default AdminLegalProfessionalDetailedView;
