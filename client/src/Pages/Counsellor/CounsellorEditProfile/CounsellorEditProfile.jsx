import React, { useState, useEffect } from 'react';
import { PiPencilDuotone } from "react-icons/pi";
import { People } from 'react-bootstrap-icons';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { ImLocation } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import { RiServiceFill } from "react-icons/ri";
import './CounsellorEditProfile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import demo from '../../../Assets/supp-edit-profile.png';
import { editCounsellorById, getCounsellorById,IMG_BASE_URL } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom';

function CounsellorEditProfile() {
    const [counsellor, setCounsellor] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        rePassword: '',
        experience: '',
        specialisation: '',
        language: '',
        location: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(demo);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounsellorData = async () => {
            const counsellorId = localStorage.getItem('counsellorId');
            if (counsellorId) {
                try {
                    const response = await getCounsellorById(counsellorId);
                    console.log('Fetch counsellor response:', response);
                    if (response.status === 200) {
                        setCounsellor(response.data);
                        setImagePreview(response.data.image ? `${IMG_BASE_URL}/${response.data.image.filename}` : demo);
                    } else {
                        toast.error('Counsellor not found');
                    }
                } catch (error) {
                    console.error('Error fetching counsellor data:', error);
                    toast.error('An error occurred while fetching the counsellor data');
                }
            }
        };

        fetchCounsellorData();
    }, []);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const nameRegex = /^[A-Za-z\s]+$/;

        if (counsellor.name && !nameRegex.test(counsellor.name)) {
            newErrors.name = 'Name should only contain alphabets';
        }

        if (counsellor.email && !emailRegex.test(counsellor.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (counsellor.contact && !phoneRegex.test(counsellor.contact)) {
            newErrors.contact = 'Contact number should be 10 digits';
        }

        if (counsellor.password && counsellor.password !== counsellor.rePassword) {
            newErrors.rePassword = 'Passwords do not match';
        }

        if (counsellor.image && counsellor.image.type && !['image/jpeg', 'image/png', 'image/gif'].includes(counsellor.image.type)) {
            newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCounsellor({
            ...counsellor,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCounsellor({
                ...counsellor,
                image: file,
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('name', counsellor.name);
            formData.append('email', counsellor.email);
            formData.append('password', counsellor.password);
            formData.append('contact', counsellor.contact);
            formData.append('experience', counsellor.experience);
            formData.append('specialisation', counsellor.specialisation);
            formData.append('language', counsellor.language);
            formData.append('location', counsellor.location);

            if (counsellor.image) {
                formData.append('image', counsellor.image);
            }

            const counsellorId = localStorage.getItem('counsellorId');
            try {
                const response = await editCounsellorById(counsellorId, formData);
                console.log('Edit counsellor response:', response);

                if (response.status === 200) {
                    toast.success('Profile updated successfully');
                    navigate('/counsellor-home');
                } else {
                    toast.error(response.msg || 'Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('An error occurred while updating the profile');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error('Please fix the errors in the form.');
        }
    };

    return (
        <div className="container px-5 m-auto mt-5  bg-creamy text-center">
            <form onSubmit={handleSubmit} noValidate>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-md-2 m-4 mt-0'>
                                <div className='counsellor-edit-profile-border-box p-3 position-relative'>
                                    <div className="rounded-circle overflow-hidden" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                                        <img
                                            src={imagePreview}
                                            alt='profile demo'
                                            className='img-fluid rounded-circle'
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = demo; 
                                            }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    {/* <div className='rounded-circle bg-white counsellor-edit-profile-icon-box border-light position-absolute cursor-pointer'>
                                        <label htmlFor="imageUpload" className="image-upload-label">
                                            <PiPencilDuotone color={'#59244C'} size={40} />
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            name="image"
                                            accept="image/*"
                                            className="image-upload-input "
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className='col'>
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <People />
                                    </span>
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Name"
                                        value={counsellor.name}
                                        onChange={handleChange}
                                        aria-describedby="nameError"
                                        required
                                    />
                                    {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <FaPhoneAlt />
                                    </span>
                                    <input
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.contact ? 'is-invalid' : ''}`}
                                        placeholder="Contact Number"
                                        value={counsellor.contact}
                                        onChange={handleChange}
                                        aria-describedby="contactError"
                                        required
                                    />
                                    {errors.contact && <div id="contactError" className="invalid-feedback">{errors.contact}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <MdEmail />
                                    </span>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Email"
                                        value={counsellor.email}
                                        onChange={handleChange}
                                        aria-describedby="emailError"
                                        required
                                    />
                                    {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <GiSkills />
                                    </span>
                                    <input
                                        type="text"
                                        id="specialisation"
                                        name="specialisation"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.specialisation ? 'is-invalid' : ''}`}
                                        placeholder="Specialisation"
                                        value={counsellor.specialisation}
                                        onChange={handleChange}
                                        aria-describedby="specialisationError"
                                        required
                                    />
                                    {errors.specialisation && <div id="specialisationError" className="invalid-feedback">{errors.specialisation}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <ImLocation />
                                    </span>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.location ? 'is-invalid' : ''}`}
                                        placeholder="Location"
                                        value={counsellor.location}
                                        onChange={handleChange}
                                        aria-describedby="locationError"
                                        required
                                    />
                                    {errors.location && <div id="locationError" className="invalid-feedback">{errors.location}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <BiTime />
                                    </span>
                                    <input
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.experience ? 'is-invalid' : ''}`}
                                        placeholder="Experience"
                                        value={counsellor.experience}
                                        onChange={handleChange}
                                        aria-describedby="experienceError"
                                        required
                                    />
                                    {errors.experience && <div id="experienceError" className="invalid-feedback">{errors.experience}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <RiServiceFill />
                                    </span>
                                    <input
                                        type="text"
                                        id="language"
                                        name="language"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.language ? 'is-invalid' : ''}`}
                                        placeholder="Language"
                                        value={counsellor.language}
                                        onChange={handleChange}
                                        aria-describedby="languageError"
                                        required
                                    />
                                    {errors.language && <div id="languageError" className="invalid-feedback">{errors.language}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-6 col-md-4 m-4 mt-0'>
                                <button type='submit' className='btn btn-lg bg-purple text-white counsellor-edit-profile-save' disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CounsellorEditProfile;
