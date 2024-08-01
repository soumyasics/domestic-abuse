import React, { useState } from 'react';
import './UserAddIssue.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, getIssueType, registerIssue } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserAddIssue() {
    const [predictions, setPredictions] = useState("");

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
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // PDF, DOC, DOCX
    const maxFileSize = 5 * 1024 * 1024;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/;
        if (!issue.type) {
            newErrors.type = 'Issue type is required';
        }
        if (!issue.description) {
            newErrors.description = 'Issue description is required';
        }
        if (!issue.severity) {
            newErrors.severity = 'Issue severity is required';
        }
        if (!issue.location) {
            newErrors.location = 'Location is required';
        }
        if (!issue.dateTime) {
            newErrors.dateTime = 'Date and time is required';
        }
        if (!issue.contact) {
            newErrors.contact = 'Contact Number is required';
        } else if (!phoneRegex.test(issue.contact)) {
            newErrors.contact = 'Contact number should be 10 digits';
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
        setIssue({
            ...issue,
            [name]: value,
        });
        if (name === 'description') {
            console.log("in descr");
            fetchIssueType(value)
        }
    };
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setIssue({
            ...issue,
            file: selectedFile,
        });
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
            console.log(response);
            if (response.success) {
                toast.success(response.message);
                // navigate('/user-home');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error Adding Issue', error);
            toast.error(error.response?.data?.message || 'failed to Add Issue. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    const fetchIssueType = async (data) => {
        try {
            const symptomsArray = data.split(" ").map(symptom => (symptom.trim()));

            const response = await axios.post(`${API_BASE_URL}/getTypeFromDescription`, { description: symptomsArray });
            console.log(response);
            if (response.data.status === 200) {

                setPredictions(response.data.data.join(", "));
                console.log(response.data.data);
            } else {

                setPredictions("No predictions available.");

            }
        } catch (error) {
            console.error('Error fetching issue data', error);
            toast.error('Failed to fetch issue data. Please try again.');
        }
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
                                                className={`form-control  border bg-creamy h-75 m-2 ${errors.description ? 'is-invalid' : ''}`}
                                                placeholder=""
                                                value={issue.description}
                                                onChange={handleChange}
                                                aria-describedby="descriptionError"
                                                required
                                            />
                                            {errors.description && <div id="descriptionError" className="invalid-feedback m-2">{errors.description}</div>}
                                        </div>


                                        {
                                            predictions ? (
                                                <div className="row">
                                                    <div className="col">
                                                        <p>Prediction of your Issue Type</p>
                                                        <div className="col">
                                                            <textarea
                                                                value={predictions}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>) : ('')
                                        }
                                        <label htmlFor='type' className='form-label theme-purple mx-2'>Type of Issue </label>
                                        <input
                                            type="text"
                                            id="type"
                                            name='type'
                                            className={`form-control  border  bg-creamy m-2  ${errors.type ? 'is-invalid' : ''}`}
                                            placeholder=""
                                            value={issue.type}
                                            onChange={handleChange}
                                            aria-describedby="typeError"
                                            required
                                        />
                                        {errors.type && <div id="typeError" className="invalid-feedback m-2">{errors.type}</div>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-start'>
                                        <label htmlFor='severity' className='form-label theme-purple mx-2'>Severity </label>
                                        <select
                                            id="severity"
                                            name="severity"
                                            className={`form-control  border bg-creamy m-2 ${errors.severity ? 'is-invalid' : ''}`}
                                            value={issue.severity}
                                            onChange={handleChange}
                                            aria-describedby="severityError"
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
                                    className={`form-control  border  bg-creamy m-2  ${errors.location ? 'is-invalid' : ''}`}
                                    placeholder=""
                                    value={issue.location}
                                    onChange={handleChange}
                                    aria-describedby="locationError"
                                    required
                                />
                                {errors.location && <div id="locationError" className="invalid-feedback m-2">{errors.location}</div>}
                            </div>
                            <div className='col text-start'>
                                <label for='file' className='form-label theme-purple mx-2'>Attachments </label>
                                <input
                                    type="file"
                                    id="file"
                                    name='file'
                                    className={`form-control  border  bg-creamy m-2 ${errors.file ? 'is-invalid' : ''}`}
                                    placeholder=""
                                    // value={issue.file}
                                    onChange={handleFileChange}
                                    aria-describedby="fileError"
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
                                    className={`form-control  border  bg-creamy m-2 ${errors.dateTime ? 'is-invalid' : ''}`}
                                    placeholder=""
                                    value={issue.dateTime}
                                    onChange={handleChange}
                                    aria-describedby="dateTimeError"
                                    required
                                />
                                {errors.dateTime && <div id="dateTimeError" className="invalid-feedback m-2">{errors.dateTime}</div>}
                            </div>
                            <div className='col text-start'>
                                <label htmlFor='contact' className='form-label theme-purple mx-2'>Contact Number </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name='contact'
                                    className={`form-control  border  bg-creamy m-2 ${errors.contact ? 'is-invalid' : ''}`}
                                    placeholder=""
                                    value={issue.contact}
                                    onChange={handleChange}
                                    aria-describedby="contactError"
                                    required
                                />
                                {errors.contact && <div id="contactError" className="invalid-feedback m-2">{errors.contact}</div>}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button className='btn bg-purple text-white px-5 m-5 rounded' type='submit'>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserAddIssue