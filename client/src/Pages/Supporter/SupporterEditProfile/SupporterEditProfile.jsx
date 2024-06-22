import React, { useState, useEffect } from 'react';
import { PiPencilDuotone } from "react-icons/pi";
import { People } from 'react-bootstrap-icons';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import './SupporterEditProfile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import demo from '../../../Assets/supp-edit-profile.png';
import { editSupportersById, getSupporterById } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom'; 

function SupporterEditProfile() {
    const [supporter, setSupporter] = useState({
        name: '',
        email: '',
        contact: '',
        organisation: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(demo);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSupporterData = async () => {
            const supporterId = localStorage.getItem('supporterId');
            if (supporterId) {
                try {
                    const response = await getSupporterById(supporterId);
                    if (response.status === 200) {
                        setSupporter(response.data);
                        setImagePreview(response.data.image || demo);
                    } else {
                        toast.error('Supporter not found');
                    }
                } catch (error) {
                    toast.error('An error occurred while fetching the supporter data');
                }
            }
        };

        fetchSupporterData();
    }, []);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const nameRegex = /^[A-Za-z\s]+$/;
    
        if (supporter.name && !nameRegex.test(supporter.name)) {
            newErrors.name = 'Name should only contain alphabets';
        }
    
        if (supporter.email && !emailRegex.test(supporter.email)) {
            newErrors.email = 'Invalid email format';
        }
    
        if (supporter.contact && !phoneRegex.test(supporter.contact)) {
            newErrors.contact = 'Contact number should be 10 digits';
        }
    
        if (supporter.image && supporter.image.type && !['image/jpeg', 'image/png', 'image/gif'].includes(supporter.image.type)) {
            newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupporter({
            ...supporter,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSupporter({
                ...supporter,
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
            formData.append('name', supporter.name);
            formData.append('email', supporter.email);
            formData.append('contact', supporter.contact);
            formData.append('organisation', supporter.organisation);
            formData.append('image', supporter.image);

            const supporterId = localStorage.getItem('supporterId');
            try {
                const response = await editSupportersById(supporterId, formData);

                if (response.success) {
                    toast.success('Profile updated successfully');
                    navigate('/supporter-home');  
                } else {
                    toast.error(response.message || 'Failed to update profile');
                }
            } catch (error) {
                toast.error('An error occurred while updating the profile');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error('Please fix the errors in the form.');
        }
    };

    return (
        <div className="container px-5 m-auto mt-5 container-spec bg-creamy text-center">
            <form onSubmit={handleSubmit} noValidate>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-md-2 m-4 mt-0'>
                                <div className='supporter-edit-profile-border-box p-3 position-relative'>
                                    <img src={imagePreview} alt='profile demo' className='img-fluid rounded-circle' />
                                    <div className='rounded-circle bg-white supporter-edit-profile-icon-box border-light position-absolute'>
                                        <label htmlFor="imageUpload" className="image-upload-label">
                                            <PiPencilDuotone color={'#59244C'} size={40} />
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            name="image"
                                            accept="image/*"
                                            className="image-upload-input"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
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
                                        value={supporter.name}
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
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.contact ? 'is-invalid' : ''}`}
                                        placeholder="Contact Number"
                                        value={supporter.contact}
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
                                        value={supporter.email}
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
                                        <CgOrganisation />
                                    </span>
                                    <input
                                        type="text"
                                        id="organisation"
                                        name="organisation"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.organisation ? 'is-invalid' : ''}`}
                                        placeholder="Specify an organisation"
                                        value={supporter.organisation}
                                        onChange={handleChange}
                                        aria-describedby="organisationError"
                                        required
                                    />
                                    {errors.organisation && <div id="organisationError" className="invalid-feedback">{errors.organisation}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row m-5">
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn btn-lg bg-purple text-light supporter-edit-profile-button px-5 py-2 fs-6"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SupporterEditProfile;
