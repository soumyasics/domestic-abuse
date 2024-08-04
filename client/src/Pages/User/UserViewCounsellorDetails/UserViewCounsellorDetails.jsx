import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounsellorById, bookCounsellorAppointment, sendReqCounc } from '../../../Services/apiService';

function UserViewCounsellorDetails() {
    const { cid } = useParams();
    const { issueId } = useParams();

    const navigate = useNavigate();
    const [counsellor, setCounsellor] = useState({});
    const [appointmentDate, setAppointmentDate] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCounsellorDetails = async () => {
            try {
                const response = await getCounsellorById(cid);
                setCounsellor(response);
            } catch (error) {
                toast.error('Error fetching counsellor details.');
            }
        };

        fetchCounsellorDetails();
    }, [cid]);

    const validate = () => {
        const newErrors = {};
        if (!appointmentDate) {
            newErrors.appointmentDate = 'Appointment date is required.';
        } else if (new Date(appointmentDate) <= new Date()) {
            newErrors.appointmentDate = 'Appointment date must be in the future.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setAppointmentDate(e.target.value);
    };
const navtoHome=()=>{
    navigate('/user-home')
}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendReqCounc(issueId,cid,localStorage.getItem('userId'));
            if (response.status === 200) {
                console.log(response);
              toast.success('Request sent successfully.');
              setTimeout(navtoHome,700)
      
            } else {
              console.log(response);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('An error occurred while fetching the user data');
          }
       
        
    };

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
                                    {counsellor.name}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Email Id
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor.email}
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
                                    {counsellor.contact}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Language
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor.language}
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
                                    {counsellor.experience}
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col text-secondary'>
                                    Location
                                </div>
                                <div className='col theme-purple'>
                                    {counsellor.location}
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
                                    {counsellor.specialisation}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='row m-5'>
                        <div className='col'>
                            <h3 className='theme-purple'>Add Details</h3>
                        </div>
                    </div> */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* <div className='row m-5'>
                            <div className='col-6'>
                                <label htmlFor='appointmentDate' className='form-label theme-purple'>Counselling Date</label>
                            </div>
                        </div> */}
                        {/* <div className='row m-5'>
                            <div className='col-6'>
                                <div className="input-group">
                                    <input
                                        type='datetime-local'
                                        id="appointmentDate"
                                        name="appointmentDate"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.appointmentDate ? 'is-invalid' : ''}`}
                                        value={appointmentDate}
                                        onChange={handleChange}
                                        aria-describedby="appointmentDateError"
                                        required
                                    />
                                    {errors.appointmentDate && <div id="appointmentDateError" className="invalid-feedback">{errors.appointmentDate}</div>}
                                </div>
                            </div>
                        </div> */}
                       {issueId=='undefined'?( ''):(<div className='row m-5'>
                            <div className='col text-end'>
                                <button type="submit" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-4 mx-5" disabled={isSubmitting}>
                                    {isSubmitting ? 'Booking...' : 'Book Now'}
                                </button>
                            </div>
                        </div>)}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserViewCounsellorDetails;
