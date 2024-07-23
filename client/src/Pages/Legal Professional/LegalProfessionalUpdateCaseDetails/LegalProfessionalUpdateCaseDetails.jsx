import React, { useState } from 'react';
import './LegalProfessionalUpdateCaseDetails.css'

function LegalProfessionalUpdateCaseDetails() {
    const [caseData, setCaseData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        progress: '',
    });
    return (
        <div className='container-fluid'>
            <div className='row m-5 '>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Case Details</h3>
                </div>
            </div>
            <div className='row m-5 '>
                <div className='col-6 m-auto bg-creamy '>
                    <div className='row m-5'>
                        <div className='col-2 fw-semibold fs-5 theme-purple text-center '>
                            Case Title
                        </div>
                        <div className='col-10'>
                            <input
                                id='title'
                                name='title'
                                type='text'
                                className='form-control form-control-lg'
                                value={caseData.title}

                            />
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col-2 fw-semibold fs-5 theme-purple text-center '>
                            Description
                        </div>
                        <div className='col-10'>
                            <textarea
                                id='description'
                                name='description'
                                className='form-control form-control-lg'
                                value={caseData.description}

                            />
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col-2 fw-semibold fs-5 theme-purple text-center '>
                            Location
                        </div>
                        <div className='col-10'>
                            <input
                                id='location'
                                name='location'
                                type='text'
                                className='form-control form-control-lg'
                                value={caseData.location}

                            />
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col-2 fw-semibold fs-5 theme-purple text-center '>
                            Date
                        </div>
                        <div className='col-10'>
                            <input
                                id='date'
                                name='date'
                                type='date'
                                className='form-control form-control-lg'
                                value={caseData.date}

                            />
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col-2 fw-semibold fs-5 theme-purple text-center '>
                            Case Progress
                        </div>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col'>
                                    <span className="form-check mx-5 d-flex align-items-center ">
                                        <input
                                            className="form-check-input  me-3"
                                            type="checkbox"
                                            value=""
                                            id="approved" />
                                        <label className="form-check-label theme-purple fs-5 fw-semibold me-5" for="approved">
                                            Approved
                                        </label>
                                    </span>
                                </div>
                                <div className='col'>
                                    <span className="form-check mx-5 d-flex align-items-center ">
                                        <input
                                            className="form-check-input  me-3"
                                            type="checkbox"
                                            value=""
                                            id="approved" />
                                        <label className="form-check-label theme-purple fs-5 fw-semibold me-5" for="approved">
                                            Sanctioned
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col text-center'>
                            <button className='btn bg-purple text-white rounded px-4'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LegalProfessionalUpdateCaseDetails