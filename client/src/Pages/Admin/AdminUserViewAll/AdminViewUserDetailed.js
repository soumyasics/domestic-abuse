import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IMG_BASE_URL, getCounsellorById, getUserById } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { viewCounsellorReqsForAdmin, approveCounsellorsById, rejectCounsellorsById } from '../../../Services/apiService';
import axiosInstance from '../../../Constant/BaseURL'
import demoCounsellor from '../../../Assets/counsellor-registration.png';
import { FaArrowLeftLong } from "react-icons/fa6";

function AdminViewUserDetailed() {
    const { id } =useParams();
    const [counsellor, setCounsellor] = useState({
        name: '',
        dob:'',
        email:'',
        image:{filename:''},
        address:'',
        location:''
    });
  const navigate=useNavigate()
  
  const fetchCounsellorData = async () => {
    if (id) {
      try {
        const counsellorData = await getUserById(id);
        console.log("data",counsellorData);
        setCounsellor(counsellorData.user);
      } catch (error) {
        console.error('Failed to fetch counsellor data:', error);
      }
    }
  };
    useEffect(() => {
      console.log("in",id);
    
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
    const toggleUserActiveState = (counsellors) => {
      console.log(counsellors.isActive);
      if(counsellors.isActive){
        handleDeactive(counsellors._id)
      }
      else{
        handleActive(counsellors._id)
      }
    }
    
    const handleActive = (id) => {
      console.log(id);
      axiosInstance.post(`/activateUserById/${id}`)
      .then((res)=>{
        if(res.data.status === 200){
          
          counsellor.isActive=true   
          // fetchCounsellors(currentPage);
          fetchCounsellorData();
  
  }
      })
      .catch((err) => {
        console.log("Error",err);
      })
    }
  
    const handleDeactive = (id) => {
      axiosInstance.post(`/deActivateUserById/${id}`)
      .then((res) => {
        if(res.data.status === 200){
          counsellor.isActive=false   
          // fetchCounsellors(currentPage);
          fetchCounsellorData();
  
  
        }
      })
      .catch((err) => {
        console.log("Error",err);
      })
    }
  
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
      <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate(-1)} />
                </div>
        </div>
        <div className='row m-5'>
          <div className='col'>
            <h3 className='text-center theme-purple fw-bold'>User Details</h3>
          </div>
        </div>
        {counsellor ? (
          <div className='row theme-purple m-5'>
            <div className='col text-center'>
              <div className="rounded-circle overflow-hidden" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                <img
                  src={counsellor.image && counsellor.image.filename ? `${IMG_BASE_URL}/${counsellor.image.filename}` : demoCounsellor}
                  alt='Counsellor'
                  className='img-fluid'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = demoCounsellor;
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
                  Date Of Birth:
                </div>
                <div className='col-6 text-secondary'>
                  {counsellor.dob.slice(0,10)}
                </div>
              </div>
              <div className='row border-bottom m-5'>
                <div className='col-6'>
                  Gender:
                </div>
                <div className='col-6 text-secondary'>
                  {counsellor.gender}
                </div>
              </div>
              <div className='row border-bottom m-5'>
                <div className='col-6'>
                  Address:
                </div>
                <div className='col-6 text-secondary'>
                  {counsellor.address}
                </div>
              </div>
             
              <div className='text-center'>
              <button
                       className={`toggle-button ${counsellor.isActive ? 'active' : 'inactive'}`} 
                      onClick={()=>{toggleUserActiveState(counsellor)}}
                      >
                        {counsellor.isActive ? 'Active' : 'Inactive'}
                      </button>
                      </div>
            </div>
          </div>
        ) : (
          <p>Loading counsellor data...</p>
        )}
      </div>
    );
  }
export default AdminViewUserDetailed