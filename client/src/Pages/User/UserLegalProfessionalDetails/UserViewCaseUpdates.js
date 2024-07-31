import React, { useCallback, useEffect, useState } from 'react';
import { addCase, getIssueById, viewCaseByissueId, viewCaseByUserId } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import '../../Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
function UserViewCaseUpdates() {
    const [caseDetails, setCaseDetails] = useState([])
    const [loading, setLoading] = useState(true);

  const fetchCaseDetails = useCallback(async () => {
    try {
      const response = await viewCaseByUserId(localStorage.getItem('userId'));
      setCaseDetails(response.data || []);
      console.log("case da",response.data);
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
    <div>    <Table striped bordered hover className="appointments-table">
    <thead>
      <tr className="text-center">
        <th className='bg-purple text-white'>#</th>
        <th className='bg-purple text-white'>Case No</th>
        <th className='bg-purple text-white'>Case Status</th>
        <th className='bg-purple text-white'>Date</th>
        <th className='bg-purple text-white'>Description</th>
        
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
            <td>{appointment.status}</td>
            <td>{appointment.date.slice(0,10)}</td>
            <td>{appointment.description}</td>
          
          </tr>
        )
      })
    ):(<p></p>)
  }
    </tbody>
  </Table></div>
  )
}

export default UserViewCaseUpdates