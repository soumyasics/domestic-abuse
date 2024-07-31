import React, { useCallback, useEffect, useState } from 'react';
import { addCase, getIssueById, viewCaseByissueId, viewCaseByissueIdNew, viewCaseByUserId } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { RiMessage2Fill } from "react-icons/ri";

import '../../Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
function UserViewCaseDetailsDetailed() {
    const [caseDetails, setCaseDetails] = useState([])
    const [loading, setLoading] = useState(true);
const {id}=useParams()
  const fetchCaseDetails = useCallback(async () => {
    try {
      const response = await viewCaseByissueIdNew(id);
      setCaseDetails(response.data || []);
      console.log("case data",response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching case details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("in 2");
    fetchCaseDetails();
  }, []);
  return (
    <div className='container'>    
      <div className='row m-5'>
        <div className='col'>
          <div className='col text-end'>
            <Link to={`/user-chat-legal-professional/${id}`}><button className='btn bg-purple text-white rounded-4 p-3 py-1 fw-semibold'><span className='mx-2'><RiMessage2Fill size={30} /></span>Chat with Legal Professional</button></Link>
          </div>
        </div>
      </div>
        {
            caseDetails&&caseDetails.length>0?(
        
        
        <Table striped bordered hover className="appointments-table">
    <thead>
      <tr className="text-center">
        <th className='bg-purple text-white'>#</th>
        <th className='bg-purple text-white'>Case No</th>
        <th className='bg-purple text-white'>Date</th>
        <th className='bg-purple text-white'>Advocate Name</th>
        <th className='bg-purple text-white'>Status</th>

      </tr>
    </thead>
    <tbody className='text-center'>
      {
        caseDetails&&caseDetails.length>0?(
      caseDetails.map((appointment, index) => {
        return (
          <tr key={appointment._id}>
            <td>{++index}</td>
             <td>{appointment.title}</td>
            <td>{appointment.date.slice(0,10)}</td>
             <td>{appointment.lpId.name}</td> 
             <td>{appointment.status}</td> 

          </tr>
        )
      })
    ):(<p></p>)
  }
    </tbody>
  </Table>
            ):(<h1>No Cases Registered for You </h1>)
        }
        </div>
  )
}

export default UserViewCaseDetailsDetailed