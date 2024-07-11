import React, { useState } from 'react';
import './SupporterAddSuggestion.css';
import { FaDownload } from "react-icons/fa";
import { IMG_BASE_URL } from '../../../Services/apiService';

function SupporterAddSuggestion() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    safetyPlan: '',
    contact: '',
    address: '',
    relation: ''
  });

  const [issue, setIssue] = useState({
    type: '',
    description: '',
    severity: '',
    location: '',
    contact: '',
    dateTime: ''
  });

  const [suggestion, setSuggestion] = useState({
    meetAdvocate: false,
    moveToSafehouse: false,
    meetCounsellor: false
  });

  const handleSuggestionChange = (event) => {
    const { name, checked } = event.target;
    setSuggestion(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add the logic to save the suggestion to the backend
    console.log(suggestion);
    // Reset the form after submission
    setSuggestion({
      meetAdvocate: false,
      moveToSafehouse: false,
      meetCounsellor: false
    });
  };

  return (
    <div className='container-fluid mb-5'>
      <div className='row m-5'>
        <div className='col'>
          <h3 className='text-center theme-purple'>User Suggestions</h3>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col'>
          <div className='card bg-creamy'>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h4 className='theme-purple text-decoration-underline text-center card-title'>User Details</h4>
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Name</div>
                <div className='col theme-purple'>{user.name}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Email Id</div>
                <div className='col theme-purple'>{user.email}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Date of Birth</div>
                <div className='col theme-purple'>{user.dob}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Gender</div>
                <div className='col theme-purple'>{user.gender}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Safety Plan</div>
                <div className='col theme-purple'>{user.safetyPlan}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Contact No</div>
                <div className='col theme-purple'>{user.contact}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Address</div>
                <div className='col theme-purple card-text'>{user.address}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Relationship to Abuser</div>
                <div className='col theme-purple'>{user.relation}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card bg-creamy'>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h4 className='theme-purple text-decoration-underline text-center card-title'>User Issues</h4>
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Type of Issue</div>
                <div className='col theme-purple'>{issue.type}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Description</div>
                <div className='col theme-purple'>{issue.description}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Severity</div>
                <div className='col theme-purple'>{issue.severity}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Attachments</div>
                <div className='col theme-purple'>
                  {/* <a href={`${IMG_BASE_URL}/${issue.file.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a> */}
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Location</div>
                <div className='col theme-purple card-text'>{issue.location}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Contact No</div>
                <div className='col theme-purple'>{issue.contact}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Date</div>
                <div className='col theme-purple'>{issue.dateTime}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Time</div>
                <div className='col theme-purple'>{issue.dateTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col'>
          <h3 className='theme-purple'>Add a Suggestion</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate className='text-white'>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box1 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="meetAdvocate"
                name="meetAdvocate"
                checked={suggestion.meetAdvocate}
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="meetAdvocate">
                Meet an Advocate
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box2 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="moveToSafehouse"
                name="moveToSafehouse"
                checked={suggestion.moveToSafehouse}
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="moveToSafehouse">
                Move to Safehouse
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box3 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="meetCounsellor"
                name="meetCounsellor"
                checked={suggestion.meetCounsellor}
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="meetCounsellor">
                Meet a Counsellor
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 opacity-75'>
          <div className='col text-center'>
            <button type="submit" className="btn bg-purple text-white rounded-4 px-5">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SupporterAddSuggestion;
