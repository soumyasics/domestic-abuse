import './LegalProfessionalCaseRequestDetail.css';
import { acceptLPAppointmentById, IMG_BASE_URL, rejectLPAppointmentById, viewLPAppointmentById } from '../../../Services/apiService';
import { FaDownload } from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../../Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import { Link } from 'react-router-dom';
function LegalProfessionalViewActiveCaseDetail() {
 
      const { id } = useParams();
      const Navigate=useNavigate()
       const [loading, setLoading] = useState(true);
        const [user, setUser] = useState({
            supporterId: localStorage.getItem('supporterId'),
            issueId: {
                 type: '',
            description: '',
            severity: '',
            location: '',
            contact: '',
            dateTime: ''
            },
            sug1: false,
            sug2: false,
            sug3: false,
           _id:'',
            userId: {
    
                address: '',
                contact: '',
                dob: '',
                email: '',
                gender: '',
                relation: '',
                file: { filename: '' },
                safetyPlan: ''
    
            }
        });
    
        const fetchAppointments = useCallback(async () => {
          try {
            const response = await viewLPAppointmentById(id);
            setUser(response.data || []);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Error fetching appointment requests.');
          } finally {
            setLoading(false);
          }
        }, []);
      
        useEffect(() => {
          fetchAppointments();
        }, [id]);
    
    
        const handleAccept = async () => {
         try{
                    const response = await acceptLPAppointmentById(id);
                    if (response.status==200) {
                      toast.success('Appointment accepted successfully.');
                      fetchAppointments();
                      // Navigate(`/legal-professional-view-appointments`)
                    } else {
                      toast.error(response.message || 'Error accepting appointment.');
                    }
                  } catch (error) {
                    toast.error('Error accepting appointment.');
                  }
             
        };
      
        const handleReject = async () => {
        
                  try {
                    const response = await rejectLPAppointmentById(id);
                    if (response.status==200) {
                      toast.success('Appointment rejected successfully.');
                      fetchAppointments();
                      // Navigate(`/legal-professional-view-appointments`)
    
                    } else {
                      toast.error(response.message || 'Error rejecting appointment.');
                    }
                  } catch (error) {
                    toast.error('Error rejecting appointment.');
                  }
               
        };
      return (
        <div className='container-fluid'>
          <div className='row m-5'>
            <div className='col text-center'>
              <h3 className='theme-purple'>Case Request</h3>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col bg-creamy border rounded m-5'>
              <div className='row m-5'>
                <div className='col text-center'>
                  <h4 className='theme-purple'>User Details</h4>
                </div>
              </div>
              <div className='row m-5'>
                <div className='col '>
                  Name
                </div>
                <div className='col '>
                  Email
                </div>
              </div>
              <div className='row m-5 theme-purple fs-5 '>
                <div className='col'>
                {user?.userId?.name}
                </div>
                <div className='col'>
                  {user?.userId?.email}
                </div>
              </div>
              <div className='row m-5'>
                <div className='col '>
                  Date of Birth
                </div>
                <div className='col '>
                  Gender
                </div>
              </div>
              <div className='row m-5 theme-purple fs-5 '>
                <div className='col'>
                  {user?.userId?.dob.slice(0,10)}
                </div>
                <div className='col'>
                  {user?.userId?.gender}
                </div>
              </div>
              <div className='row m-5'>
                <div className='col '>
                  Address
                </div>
                <div className='col '>
                  Relationship to Abuser
                </div>
              </div>
              <div className='row m-5 theme-purple fs-5 '>
                <div className='col'>
                  {user?.userId?.address}
                </div>
                <div className='col'>
                  {user?.userId?.relation}
                </div>
              </div>
              <div className='row m-5'>
                <div className='col '>
                  Safety Plan
                </div>
              </div>
              <div className='row m-5 theme-purple fs-5 '>
                <div className='col'>
                  {user?.userId?.safetyPlan}
                </div>
              </div>
            </div>
            <div className='col bg-creamy border rounded m-5'>
              <div className='row m-5'>
                <div className='col text-center'>
                  <h4 className='theme-purple'>Issue Details</h4>
                </div>
              </div>
              <div className='row m-5 '>
                <div className='col'>Type of Issue</div>
                <div className='col theme-purple'>{user?.issueId.type}</div>
              </div>
              <div className='row m-5'>
                <div className='col'>Description</div>
                <div className='col theme-purple'>{user?.issueId?.description}</div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Severity</div>
                <div className='col theme-purple'>{user?.issueId?.severity}</div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Attachments</div>
                <div className='col theme-purple'>
                  <a href={`${IMG_BASE_URL}/${user?.issueId?.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a>
                </div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Location</div>
                <div className='col theme-purple card-text'>{user?.issueId?.location}</div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Contact No</div>
                <div className='col theme-purple'>{user?.issueId?.contact}</div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Date</div>
                <div className='col theme-purple'>{user.issueId?.dateTime.slice(0, 10)}</div>
              </div>
              <div className='row  m-5 '>
                <div className='col'>Time</div>
                <div className='col theme-purple'>{user.issueId.dateTime.slice(11, 16)}</div>
              </div>
            </div>
          </div>
          
        </div>
      )
    }
    

export default LegalProfessionalViewActiveCaseDetail