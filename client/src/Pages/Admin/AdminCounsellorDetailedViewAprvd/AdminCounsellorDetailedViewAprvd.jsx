import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './AdminCounsellorDetailedView.css';
// import demoCounsellor from '../../../Assets/demo-counsellor.png';
import { IMG_BASE_URL, getCounsellorById } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { viewCounsellorReqsForAdmin, approveCounsellorsById, rejectCounsellorsById } from '../../../Services/apiService';

function AdminCounsellorDetailedViewAprvd() {
  const { id } =useParams();
  const [counsellor, setCounsellor] = useState(null);

  useEffect(() => {
    console.log("in",id);
    const fetchCounsellorData = async () => {
      if (id) {
        try {
          const counsellorData = await getCounsellorById(id);
          console.log("data",counsellorData);
          setCounsellor(counsellorData);
        } catch (error) {
          console.error('Failed to fetch counsellor data:', error);
        }
      }
    };
    fetchCounsellorData();
  },[id]);

  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this counsellor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveCounsellorsById(id);
              if (response.success) {
                toast.success('Counsellor approved successfully.');
              } else {
                toast.error(response.message || 'Error approving counsellor.');
              }
            } catch (error) {
              toast.error('Error approving counsellor.');
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
      message: 'Are you sure you want to reject this counsellor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectCounsellorsById(id);
              if (response.success) {
                toast.success('Counsellor rejected successfully.');
              } else {
                toast.error(response.message || 'Error rejecting counsellor.');
              }
            } catch (error) {
              toast.error('Error rejecting counsellor.');
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
      <div className='row m-5'>
        <div className='col'>
          <h3 className='text-center theme-purple fw-bold'>Counsellor Details</h3>
        </div>
      </div>
      {counsellor ? (
        <div className='row theme-purple m-5'>
          <div className='col text-center'>
            <div className="rounded-circle overflow-hidden" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
              <img
                // src={counsellor.profileImage && counsellor.profileImage.filename ? `${IMG_BASE_URL}/${counsellor.profileImage.filename}` : demoCounsellor}
                alt='Counsellor'
                className='img-fluid'
                onError={(e) => {
                  e.target.onerror = null;
                  // e.target.src = demoCounsellor;
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
                {counsellor.name}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact No:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.contact}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Email Id:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.email}
              </div>
            </div>
           
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Experience:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.experience}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Specialisation:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.specialisation}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Language:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.language}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Location:
              </div>
              <div className='col-6 text-secondary'>
                {counsellor.location}
              </div>
            </div>
            <div className='text-center'>
                      <Button
                        variant="outline-success"
                        className="m-2 px-5"
                        onClick={() => handleApprove(counsellor._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="m-2 px-5"
                        onClick={() => handleReject(counsellor._id)}
                      >
                        Reject
                      </Button>
                    </div>
          </div>
        </div>
      ) : (
        <p>Loading counsellor data...</p>
      )}
    </div>
  );
}

export default AdminCounsellorDetailedViewAprvd;
