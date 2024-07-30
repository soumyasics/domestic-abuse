import React, { useEffect, useState } from 'react';
import { IMG_BASE_URL, viewCouncCaseReqsByIssueId, viewhouseReqsByIssueId, viewLegalReqsByIssueId, viewMySuggestionById } from '../../../Services/apiService';
import './SupporterViewSuggestionDetails.css';
import { RiMessage2Fill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion'; // Import Bootstrap Accordion

function SupporterViewSuggestionDetails() {
    const { id } = useParams();
    const [houseReqs, setHouseReqs] = useState([])
    const [legalReqs, setLegalReqs] = useState([])
    const [counReqs, setCounReqs] = useState([])

    const [user, setUser] = useState({
        supporterId: localStorage.getItem('supporterId'),
        issueId: {
            type: '',
            description: '',
            severity: '',
            location: '',
            contact: '',
            dateTime: '',
            _id:''
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

    const fetchSuggestions = async () => {
        try {
            const response = await viewMySuggestionById(id);
            setUser(response.data);
            console.log("use", response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            toast.error('Error fetching suggestions.');
        }
    };
    const fetchSafeHouseStatus = async () => {
        try {
            const response = await viewhouseReqsByIssueId(user.issueId._id);
            setHouseReqs(response.data);
            console.log("safe house ", response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            toast.error('Error fetching suggestions.');
        }
    };
    const fetchCouncillorStatus = async () => {
        try {
            const response = await viewCouncCaseReqsByIssueId(user.issueId._id);
            setCounReqs(response.data);
            console.log("councel", response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            toast.error('Error fetching suggestions.');
        }
    };

    const fetchLegalStatus = async () => {
        try {
            console.log("id for legal",user.issueId._id);
            const response = await viewLegalReqsByIssueId(user.issueId._id);
            setLegalReqs(response.data);
            console.log("legal", response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            toast.error('Error fetching suggestions.');
        }
    };
    useEffect(() => {
        fetchSuggestions();
       
    }, []);
    useEffect(() => {
        console.log("issueId",user.issueId._id);
        if(user.sug2)
        fetchSafeHouseStatus()
        if(user.sug3)

        fetchCouncillorStatus()
        if(user.sug1)
        fetchLegalStatus()
    }, [user]);

    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-end'>
                    <button className='btn bg-purple text-white rounded-4 p-3 py-1 fw-semibold'>
                        <span className='mx-2'><RiMessage2Fill size={30} /></span>Chat Now
                    </button>
                </div>
            </div>
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
                                <div className='col'>Safety Plan</div>
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
                    <h3 className='theme-purple'>Current Status</h3>
                </div>
            </div>

          
            <Accordion defaultActiveKey="0">
                {user.sug1 && (
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Moved to Legal Professional Option</Accordion.Header>
                        <Accordion.Body>
                            {legalReqs&&legalReqs.length > 0 ? (
                                <div className='row m-5'>
                                    <div className='col'>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr className=' h5'>
                                                    <th scope="col" className='theme-purple'>Sl</th>
                                                    <th scope="col" className='theme-purple'>Advocate Name</th>
                                                    <th scope="col" className='theme-purple'>Mail Id</th>
                                                    <th scope="col" className='theme-purple'>Contact Number</th>
                                                    <th scope="col" className='theme-purple'>Firm Name</th>
                                                    <th scope="col" className='theme-purple'>Firm Address</th>
                                                    <th scope="col" className='theme-purple'>License Number</th>
                                                    <th scope="col" className='theme-purple'>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {legalReqs.map((req, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{req.advocateName}</td>
                                                        <td>{req.mailId}</td>
                                                        <td>{req.contactNumber}</td>
                                                        <td>{req.firmName}</td>
                                                        <td>{req.firmAddress}</td>
                                                        <td>{req.licenseNumber}</td>
                                                        <td>{req.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <p>Have not sent request to a counselor</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                )}

                {user.sug2 && (
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Moved to Safe House Option</Accordion.Header>
                        <Accordion.Body>
                            {houseReqs&&houseReqs.length > 0 ? (
                                <div className='row m-5'>
                                    <div className='col'>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr className=' h5'>
                                                    <th scope="col" className='theme-purple'>Sl</th>
                                                    <th scope="col" className='theme-purple'>House Name</th>
                                                    <th scope="col" className='theme-purple'>Address</th>
                                                    <th scope="col" className='theme-purple'>Contact Number</th>
                                                    <th scope="col" className='theme-purple'>Accommodation Capacity</th>
                                                    <th scope="col" className='theme-purple'>Monthly Rent</th>
                                                    <th scope="col" className='theme-purple'>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {houseReqs.map((req, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{req.houseId.name}</td>
                                                        <td>{req.houseId.landmark}</td>
                                                        <td>{req.houseId.contact}</td>
                                                        <td>{req.houseId.capacity}</td>
                                                        <td>{req.houseId.rent}</td>
                                                        <td>{req.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <p>No requests sent to a safe house</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                )}

                {user.sug3 && (
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Moved to Safe Counselor Option</Accordion.Header>
                        <Accordion.Body>
                            {counReqs&&counReqs.length > 0 ? (
                                <table className="table table-borderless">
                                    <thead>
                                        <tr className='h5'>
                                            <th scope="col" className='theme-purple'>Sl</th>
                                            <th scope="col" className='theme-purple'>Counselor Name</th>
                                            <th scope="col" className='theme-purple'>Mail Id</th>
                                            <th scope="col" className='theme-purple'>Contact Number</th>
                                            <th scope="col" className='theme-purple'>Work Experience</th>
                                            <th scope="col" className='theme-purple'>Location</th>
                                            <th scope="col" className='theme-purple'>Specialisation</th>
                                            <th scope="col" className='theme-purple'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {counReqs.map((req, index) => (
                                            <tr key={index}>

                                                <td>{index + 1}</td>
                                                <td>{req.cId.name}</td>
                                                <td>{req.cId.email}</td>
                                                <td>{req.cId.contact}</td>
                                                <td>{req.cId.experience}</td>
                                                <td>{req.cId.location}</td>
                                                <td>{req.cId.specialisation}</td>
                                                <td>{req.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No requests sent to a counselor</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>


            <ToastContainer />
        </div>
    )
}

export default SupporterViewSuggestionDetails;
