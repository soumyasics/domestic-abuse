import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserLegalProfessionalCaseDetails.css';
import { IMG_BASE_URL } from '../../../Services/apiService';
import demoLegal from '../../../Assets/legal-pro.png';
import { FaFile } from "react-icons/fa";

function UserLegalProfessionalCaseDetails() {
    const { id } = useParams();
    const [legalProfessional, setLegalProfessional] = useState({});
    const [caseData, setCaseData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
    });
    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col border rounded bg-creamy m-5'>
                    <div className='row m-5'>
                        <div className='col '>
                            <h4 className='theme-purple text-center'>Legal Professional Details</h4>
                        </div>
                    </div>
                    <div className='row m-5 '>
                        <div className='col '>
                            <div className='row m-4 '>
                                <div className='col theme-purple'>
                                    Name
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    Mail Id
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4 '>
                                <div className='col theme-purple'>
                                    Contact Number
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    Firm Name
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    Firm Address
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    License Number
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    Bar Association Id
                                </div>
                                <div className='col text-secondary'>
                                    :
                                </div>
                            </div>
                            <div className='row m-4'>
                                <div className='col theme-purple'>
                                    Id Proof
                                </div>
                                <div className='col text-secondary'>
                                    {/* :<a href={ `${IMG_BASE_URL}/${legalProfessional.proof.filename}`} target="_blank" rel="noopener noreferrer"> <FaFile className='theme-purple mx-1'/> Click Here</a> */}
                                </div>
                            </div>
                        </div>
                        <div className='col  '>
                            <img
                                src={legalProfessional.photo && legalProfessional.photo.filename ? `${IMG_BASE_URL}/${legalProfessional.photo.filename}` : demoLegal}
                                alt='Legal Professional'
                                className='img-fluid border object-fit-contain'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = demoLegal;
                                }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div>
                <div className='col bg-creamy m-5 border rounded'>
                    <div className='row m-5'>
                        <div className='col '>
                            <h4 className='theme-purple text-center'>Case Details</h4>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col  py-5 px-0'>
                            <div className='row m-5'>
                                <div className='col theme-purple text-center '>
                                    Case Title
                                </div>
                                <div className='col'>
                                    <input
                                        id='title'
                                        name='title'
                                        type='text'
                                        className='form-control form-control-lg'
                                        value={caseData.title}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='row m-5'>
                                <div className='col theme-purple text-center '>
                                    Description
                                </div>
                                <div className='col'>
                                    <textarea
                                        id='description'
                                        name='description'
                                        className='form-control form-control-lg'
                                        value={caseData.description}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='row m-5'>
                                <div className='col theme-purple text-center '>
                                    Location
                                </div>
                                <div className='col'>
                                    <input
                                        id='location'
                                        name='location'
                                        type='text'
                                        className='form-control form-control-lg'
                                        value={caseData.location}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='row m-5'>
                                <div className='col theme-purple text-center '>
                                    Date
                                </div>
                                <div className='col'>
                                    <input
                                        id='date'
                                        name='date'
                                        type='date'
                                        className='form-control form-control-lg'
                                        value={caseData.date}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col text-end'>
                    <button className='btn bg-purple text-white px-3 mx-5 '>Request</button>
                    <button className='btn bg-purple text-white px-3 mx-5 '>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UserLegalProfessionalCaseDetails