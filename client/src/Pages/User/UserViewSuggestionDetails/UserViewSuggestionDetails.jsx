import React, { useState } from 'react';
import { RiMessage2Fill } from "react-icons/ri";
import './UserViewSuggestionDetails.css';
import { FaDownload } from "react-icons/fa";
import { IMG_BASE_URL } from '../../../Services/apiService';

function UserViewSuggestionDetails() {
  const [issue, setIssue] = useState({});
  return (
    <div className='container-fluid'>
      <div className='row m-5'>
        <div className='col'>
          <div className='col text-end'>
            <button className='btn bg-purple text-white rounded-4 p-3 py-1 fw-semibold'><span className='mx-2'><RiMessage2Fill size={30} /></span>Chat with Supporter</button>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col m-5 border rounded'>
          <div className='row m-5'>
            <div className='col '>
              <h4 className='theme-purple  text-center '>User Issues</h4>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Type of Issue</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{issue.type}</div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Location</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple '>{issue.location}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Description</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{issue.description}</div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Date</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{issue?.dateTime?.slice(0, 10)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Severity</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{issue.severity}</div>
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Time</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col theme-purple'>
                  <div className='col theme-purple'>{issue?.dateTime?.slice(11, 16)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Attachments</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col theme-purple'>
                  <a href={`${IMG_BASE_URL}/${issue.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col m-5 border rounded'>
          <div className='row m-5'>
            <div className='col'>
              <h2 className='theme-purple'>Supporter Suggestions</h2>
            </div>
          </div>
          <div className='row mx-5 '>
            <div className='col text-end'>
              <span className='text-info m-2'>Status</span> <span className='m-2'> Pending</span>
            </div>
          </div>
          <div className='row m-5 fw-semibold mt-0'>
            <div className='col text-white supporter-add-suggestion-box1 rounded-4 text-center p-2'>
              Meet an Advocate
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>Request</button>
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button>
            </div>
          </div>
          <div className='row mx-5'>
            <div className='col text-end'>
              <span className='text-info m-2'>Status</span> <span className='m-2'> Pending</span>
            </div>
          </div>
          <div className='row m-5 fw-semibold mt-0'>
            <div className='col text-white supporter-add-suggestion-box2 rounded-4 text-center p-2'>
              Move to Safehouse
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>Request</button>
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button>
            </div>
          </div>
          <div className='row mx-5'>
            <div className='col text-end'>
              <span className='text-info m-2'>Status</span> <span className='m-2'> Pending</span>
            </div>
          </div>
          <div className='row m-5 fw-semibold mt-0'>
            <div className='col text-white supporter-add-suggestion-box3 rounded-4 text-center p-2'>
              Meet a Counselor
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>Request</button>
            </div>
            <div className='col text-center'>
              <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserViewSuggestionDetails