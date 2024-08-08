import React,{useEffect, useState} from 'react';
// import './AdminsafehousesDetailedView.css';
import demosafehouses from '../../../Assets/newhouse.jpeg';
import demo from '../../../Assets/demo-supp.png';
import { useNavigate, useParams } from 'react-router-dom';
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaFile } from "react-icons/fa";
import { approveSafehouseById, IMG_BASE_URL, viewSafehouseById,rejectSafehouseById } from '../../../Services/apiService';

function AdminsafehousesDetailedView() {
  const { id } = useParams();
  const [safehouses, setsafehouses] = useState({photo:{filename:''},proof:{
    filename:''
  }});
  const navigate=useNavigate()

  useEffect(() => {
    const fetchLegalProfessionalData = async () => {
      if (id) {
        try {
          const legalProfessionalData = await viewSafehouseById(id);
          setsafehouses(legalProfessionalData);
          console.log(legalProfessionalData);
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
      message: 'Are you sure you want to approve this Safe house?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveSafehouseById(id);
              if (response.success) {
                toast.success('Safe house approved successfully.');
                navigate('/admin-dashboard')
              } else {
                toast.error(response.message || 'Error approving Safe house.');
              }
            } catch (error) {
              toast.error('Error approving Safe house.');
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
      message: 'Are you sure you want to reject this Safe house?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectSafehouseById(id);
              if (response.success) {
                toast.success('Safe house rejected successfully.');
              } else {
                toast.error(response.message || 'Error rejecting Safe house.');
              }
            } catch (error) {
              toast.error('Error rejecting Safe house.');
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
    <>
      <div className='container'>
        <div className='row m-5'>
          <div className='col'>
            <h3 className='text-center theme-purple fw-bold'>{safehouses.name ? safehouses.name : 'Aishwaryas Home'}</h3>
          </div>
        </div>
        <div className='row m-5'>
          <div className='col m-3'>
            <img
              src={safehouses.image && safehouses.image.filename ? `${IMG_BASE_URL}/${safehouses.image.filename}` : demosafehouses}
              alt='safehouses'
              className='img-fluid rounded'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = demosafehouses;
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='col m-3 bg-creamy theme-purple text-center fs-6 border rounded'>
            <div className='row border-bottom m-5 '>
              <div className='col-6'>
                House Name:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.name ? safehouses.name : 'Aishwaryas Home'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Address:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.landmark ? safehouses.landmark : 'Akkulam Rd, Trivandrum'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact Number:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.contact ? safehouses.contact : '9495211400'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Accommodation Capacity:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.capacity ? safehouses.capacity : '6'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Monthly Rent:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.rent ? safehouses.rent : '5000'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Description:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.description ? safehouses.description : 'It is a place where someone can stay and be protected'}
              </div>
            </div>
          </div>
        </div>
        <div className='row m-5'>
          <div className='col'>
            <h3 className='text-center  theme-purple fw-bold'>Supporter Details</h3>
          </div>
        </div>
        <div className='row theme-purple m-5'>
          <div className='col'>
            <div className='row'>
              <div className='col text-center'>
                <div className="rounded-circle overflow-hidden" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                  <img
                    src={safehouses.supporterId?.image && safehouses.supporterId?.image.filename ? `${IMG_BASE_URL}/${safehouses.supporterId?.image.filename}` : demo}
                    alt='Supporter'
                    className='img-fluid'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = demo;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col fs-6 border rounded bg-creamy'>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Name:
              </div>
              <div className='col-6 text-secondary '>
                {safehouses.supporterId?.name}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact No:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.supporterId?.contact}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Email Id:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.supporterId?.email}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Organisation Name:
              </div>
              <div className='col-6 text-secondary'>
                {safehouses.supporterId?.organization}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminsafehousesDetailedView;
