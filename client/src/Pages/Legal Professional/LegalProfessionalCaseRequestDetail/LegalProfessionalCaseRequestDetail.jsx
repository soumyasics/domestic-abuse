import React, { useState } from 'react';
import './LegalProfessionalCaseRequestDetail.css';
import { IMG_BASE_URL } from '../../../Services/apiService';
import { FaDownload } from "react-icons/fa";
import {useParams} from 'react-router-dom';

function LegalProfessionalCaseRequestDetail() {
  const { id } = useParams();
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

    const [issue, setIssue] = useState({

    });
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
              {user?.userId?.dob}
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
              {user.relation}
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
      <div className='row m-5'>
        <div className='col text-end'>
            <button className='btn btn-outline-success mx-5 px-5'>Accept</button>
            <button className='btn btn-outline-danger mx-5 px-5'>Reject</button>
        </div>
      </div>
    </div>
  )
}

export default LegalProfessionalCaseRequestDetail