import React, { useState } from 'react';
import './UserAddIssue.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, getIssueType, registerIssue } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserAddIssue() {
    const [predictions, setPredictions] = useState([]);
    const [issue, setIssue] = useState({
        type: '',
        description: '',
        severity: '',
        location: '',
        file: null,
        dateTime: '',
        contact: '',
        userId: localStorage.getItem('userId')
    });
    const [errors, setErrors] = useState({});
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxFileSize = 5 * 1024 * 1024;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/;
        if (!issue.type) newErrors.type = 'Issue type is required';
        if (!issue.description) newErrors.description = 'Issue description is required';
        if (!issue.severity) newErrors.severity = 'Issue severity is required';
        if (!issue.location) newErrors.location = 'Location is required';
        if (!issue.dateTime) newErrors.dateTime = 'Date and time is required';
        if (!issue.contact) {
            newErrors.contact = 'Contact Number is required';
        } else if (!phoneRegex.test(issue.contact)) {
            newErrors.contact = 'Contact number should be 10 digits';
        }   if (!issue.file) {
            newErrors.file = 'Please add relevant Attachments';
        }
        if (issue.file) {
         
            if (!allowedFileTypes.includes(issue.file.type)) {
                newErrors.file = 'Only PDF and DOC files are allowed';
            }
            if (issue.file.size > maxFileSize) {
                newErrors.file = 'File size should not exceed 5MB';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssue({ ...issue, [name]: value });
        if (name === 'description') fetchIssueType(value);
    };

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setIssue({ ...issue, file: selectedFile });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await registerIssue(issue);
            console.log("res",response);
            
            if (response.success) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/user-home');
                  }, 2000);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to Add Issue. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchIssueType = async (data) => {
        try {
            const symptomsArray = data.split(" ").map(symptom => symptom.trim());
            const response = await axios.post(`${API_BASE_URL}/getTypeFromDescription`, { description: symptomsArray });
            if (response.data.status === 200) {
                setPredictions(response.data.data);
            } else {
                setPredictions([]);
            }
        } catch (error) {
            toast.error('Failed to fetch issue data. Please try again.');
        }
    };
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Add an Issue</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className='row m-5 bg-creamy border'>
                    <div className='col text-center'>
                        <div className='row m-5'>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col text-start'>
                                        <div className='col text-start'>
                                            <label htmlFor='description' className='form-label theme-purple mx-2'>Description </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                className={`form-control border bg-creamy h-75 m-2 ${errors.description ? 'is-invalid' : ''}`}
                                                value={issue.description}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.description && <div id="descriptionError" className="invalid-feedback m-2">{errors.description}</div>}
                                        </div>
                                        {predictions.length > 0 && (
                                            <div className="prediction-content row">
                                                <div className="col">
                                                    <p className='theme-purple mx-2 fw-semibold'>Prediction of your Issue Type</p>
                                                    <div className="col">
                                                        {predictions.map((prediction, index) => (
                                                            <span key={index} className='prediction-item bg-light p-2 m-2 rounded'>
                                                                {prediction}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <label htmlFor='type' className='form-label theme-purple mx-2'>Type of Issue </label>
                                        <select
                                            value={issue.type}
                                            onChange={handleChange}
                                            name='type'
                                            className='form-select bg-creamy m-2'
                                        >
                                            <option value="" disabled>Select Type of Issue</option>
                                            <option value="Physical Abuse">Physical Abuse</option>
                                            <option value="Emotional or Psychological Abuse">Emotional or Psychological Abuse</option>
                                            <option value="Sexual Abuse">Sexual Abuse</option>
                                            <option value="Economic Abuse">Economic Abuse</option>
                                            <option value="Verbal Abuse">Verbal Abuse</option>
                                            <option value="Digital Abuse">Digital Abuse</option>
                                            <option value="Reproductive Abuse">Reproductive Abuse</option>
                                            <option value="Isolation">Isolation</option>
                                            <option value="Stalking">Stalking</option>
                                            <option value="Threats and Intimidation">Threats and Intimidation</option>
                                        </select>
                                        {errors.type && <div id="typeError" className="invalid-feedback m-2">{errors.type}</div>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-start'>
                                        <label htmlFor='severity' className='form-label theme-purple mx-2'>Severity </label>
                                        <select
                                            id="severity"
                                            name="severity"
                                            className={`form-control border bg-creamy m-2 ${errors.severity ? 'is-invalid' : ''}`}
                                            value={issue.severity}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select Severity</option>
                                            <option value="normal">Normal</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                        {errors.severity && <div id="genderError" className="invalid-feedback m-2">{errors.severity}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col text-start'>
                                <label htmlFor='location' className='form-label theme-purple mx-2'>Location </label>
                                <input
                                    type="text"
                                    id="location"
                                    name='location'
                                    className={`form-control border bg-creamy m-2 ${errors.location ? 'is-invalid' : ''}`}
                                    value={issue.location}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.location && <div id="locationError" className="invalid-feedback m-2">{errors.location}</div>}
                            </div>
                            <div className='col text-start'>
                                <label htmlFor='file' className='form-label theme-purple mx-2'>Attachments </label>
                                <input
                                    type="file"
                                    id="file"
                                    name='file'
                                    className={`form-control border bg-creamy m-2 ${errors.file ? 'is-invalid' : ''}`}
                                    onChange={handleFileChange}
                                />
                                {errors.file && <div id="fileError" className="invalid-feedback m-2">{errors.file}</div>}
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col text-start'>
                                <label htmlFor='dateTime' className='form-label theme-purple mx-2'>Date and Time </label>
                                <input
                                    type='datetime-local'
                                    id="dateTime"
                                    name='dateTime'
                                    className={`form-control border bg-creamy m-2 ${errors.dateTime ? 'is-invalid' : ''}`}
                                    value={issue.dateTime}
                                    onChange={handleChange}
                                    max={getCurrentDateTime()} 

                                    required
                                />
                                {errors.dateTime && <div id="dateTimeError" className="invalid-feedback m-2">{errors.dateTime}</div>}
                            </div>
                            <div className='col text-start'>
                                <label htmlFor='contact' className='form-label theme-purple mx-2'>Contact Number </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    className={`form-control border bg-creamy m-2 ${errors.contact ? 'is-invalid' : ''}`}
                                    value={issue.contact}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.contact && <div id="contactError" className="invalid-feedback m-2">{errors.contact}</div>}
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col text-center'>
                                <button type="submit" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-4 m-4" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserAddIssue;
