import React, { useEffect, useState } from 'react';
import { IMG_BASE_URL, viewMySuggestionById, viewMySuggestionByIssueIdforCounc } from '../../../Services/apiService';
import '../../Supporter/SupporterViewSuggestionDetails/SupporterViewSuggestionDetails.css';
import { RiMessage2Fill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from "react-icons/fa";

function CouncillorviewClintDetailed() {

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
    
        const [suggestion, setSuggestion] = useState({
    
            supporterId: localStorage.getItem('supporterId'),
            issueId: id,
            sug1: false,
            sug2: false,
            sug3: false
        });
    
        const fetchSuggestions = async () => {
            try {
              const response = await viewMySuggestionByIssueIdforCounc(id)
              setUser(response.data);
              console.log("use",user);
            } catch (error) {
              console.error('Error fetching suggestions:', error);
              toast.error('Error fetching suggestions.');
            }
          };
        
          useEffect(() => {
            fetchSuggestions();
          }, [id]);
        
    
    
        return (
            <div className='container-fluid'>
               
                <div className='row m-5'>
                    <div className='col'>
                        <div className='card '>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col'>
                                        <h4 className='theme-purple text-decoration-underline text-center card-title'>User Details</h4>
                                    </div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Name</div>
                                    <div className='col theme-purple'>{user?.userId?.name}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Email Id</div>
                                    <div className='col theme-purple'>{user?.userId?.email}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Date of Birth</div>
                                    <div className='col theme-purple'>{user?.userId?.dob}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Gender</div>
                                    <div className='col theme-purple'>{user?.userId?.gender}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Aadhar Number</div>
                                    <div className='col theme-purple'>{user?.userId?.safetyPlan}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Contact No</div>
                                    <div className='col theme-purple'>{user?.userId?.contact}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Address</div>
                                    <div className='col theme-purple card-text'>{user?.userId?.address}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Relationship to Abuser</div>
                                    <div className='col theme-purple'>{user?.userId?.relation}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='card '>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col'>
                                        <h4 className='theme-purple text-decoration-underline text-center card-title'>User Issues</h4>
                                    </div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Type of Issue</div>
                                    <div className='col theme-purple'>{user?.issueId.type}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Description</div>
                                    <div className='col theme-purple'>{user?.issueId?.description}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Severity</div>
                                    <div className='col theme-purple'>{user?.issueId?.severity}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Attachments</div>
                                    <div className='col theme-purple'>
                                        <a href={`${IMG_BASE_URL}/${user?.issueId?.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a>
                                    </div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Location</div>
                                    <div className='col theme-purple card-text'>{user?.issueId?.location}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Contact No</div>
                                    <div className='col theme-purple'>{user?.issueId?.contact}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Date</div>
                                    <div className='col theme-purple'>{user.issueId?.dateTime.slice(0, 10)}</div>
                                </div>
                                <div className='row border-bottom m-3 card-text'>
                                    <div className='col'>Time</div>
                                    <div className='col theme-purple'>{user.issueId.dateTime.slice(11, 16)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row m-5'>
                    <div className='col'>
                    {console.log(user)}
                        <h3 className='theme-purple'>Supporter Suggestions</h3>
                    </div>
                </div>
    
              
                {
                    (user.sug1)?
                    <>
                <div className='row m-5 supporter-add-suggestion-box1 rounded-3 py-1 text-center'>
                    <div className='col '>
                        <h3 className='text-white'>Meet A Legal Professional</h3>
                    </div>
                </div>
                <div className='row m-5'>
                    <div className='col'>
                        {console.log(user)}
                        <table className="table table-borderless">
                            <thead>
                                {/* <tr className=' h5'>
                                    <th scope="col" className='theme-purple'>#</th>
                                    <th scope="col" className='theme-purple'>Advocate Name</th>
                                    <th scope="col" className='theme-purple'>Mail Id</th>
                                    <th scope="col" className='theme-purple'>Contact Number</th>
                                    <th scope="col" className='theme-purple'>Firm Name</th>
                                    <th scope="col" className='theme-purple'>Firm Address</th>
                                    <th scope="col" className='theme-purple'>License Number</th>
                                    <th scope="col" className='theme-purple'>Status</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
    
                :('')
                                }
                                {
                                (user.sug2)?
    
             <>
                <div className='row m-5 supporter-add-suggestion-box2 rounded-3 py-1 text-center'>
                    <div className='col '>
                        <h3 className='text-white'>Move to Safe House</h3>
                    </div>
                </div>
                <div className='row m-5'>
                    <div className='col'>
                        <table className="table table-borderless">
                            <thead>
                                {/* <tr className=' h5'>
                                    <th scope="col" className='theme-purple'>#</th>
                                    <th scope="col" className='theme-purple'>House Name</th>
                                    <th scope="col" className='theme-purple'>Address</th>
                                    <th scope="col" className='theme-purple'>Contact Number</th>
                                    <th scope="col" className='theme-purple'>Accommodation Capacity</th>
                                    <th scope="col" className='theme-purple'>Monthly Rent</th>
                                    <th scope="col" className='theme-purple'>Status</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                </> 
                  :('')
                }
                {
                (user.sug2)?(
                <>  
                    <div className='row m-5 supporter-add-suggestion-box3 rounded-3 py-1 text-center'>
                    <div className='col '>
                        <h3 className='text-white'>Meet A Counsellor</h3>
                    </div>
                </div>
                <div className='row m-5'>
                    <div className='col'>
                        <table className="table table-borderless">
                            <thead>
                                {/* <tr className=' h5'>
                                    <th scope="col" className='theme-purple'>#</th>
                                    <th scope="col" className='theme-purple'>Counsellor Name</th>
                                    <th scope="col" className='theme-purple'>Mail Id</th>
                                    <th scope="col" className='theme-purple'>Contact Number</th>
                                    <th scope="col" className='theme-purple'>Work Experience</th>
                                    <th scope="col" className='theme-purple'>Location</th>
                                    <th scope="col" className='theme-purple'>Specialisation</th>
                                    <th scope="col" className='theme-purple'>Status</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
                ):('')
            }
            </div>
        )
    }
    

export default CouncillorviewClintDetailed