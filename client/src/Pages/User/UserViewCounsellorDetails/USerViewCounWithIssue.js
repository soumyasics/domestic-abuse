import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounsellorById, bookCounsellorAppointment, sendReqCounc, viewCouncCaseReqsByIssueId1 } from '../../../Services/apiService';

function USerViewCounWithIssue() {
    const {st, id } = useParams();

    const navigate = useNavigate();
    const [counsellor, setCounsellor] = useState({});
    const [appointmentDate, setAppointmentDate] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCounsellorDetails = async () => {
            try {
                const response = await viewCouncCaseReqsByIssueId1(id);
                console.log("datas",response);
                
                setCounsellor(response);
            } catch (error) {
                toast.error('Error fetching counsellor details.');
            }
        };

        fetchCounsellorDetails();
    }, [id]);




const navtoHome=()=>{
    navigate('/user-home')
}


    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate(-1)} />
                </div>
            </div>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Counsellor Details</h3>
                </div>
            </div>
            <div className='row m-5 d-flex justify-content-center align-items-center'>
            <ToastContainer />
                <div className='col-8 bg-creamy'>
                    <div className='row m-5'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Name
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.name}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Email Id
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Contact Number
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.contact}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Language
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.language}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Experience
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.experience}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Location
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.location}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Specialisation
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor?.cId?.specialisation}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Request Status
                                </div>
                                <div className='col-6 text-secondary'>
               {(st=='p')?<span>Pending</span>:(st=='a')?<span>Approved</span>:<span>Rejected</span>}
                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default USerViewCounWithIssue