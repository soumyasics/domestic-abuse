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
import { editSupportersById, getSupporterById, IMG_BASE_URL } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom';

function SupporterEditProfile() {
    const [supporter, setSupporter] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        organization: '',
        image: {filename:''},
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
                    console.log('Fetch supporter response:',supporterId, response);
                    if (response.status === 200) {
                        setSupporter(response.data);
                        setImagePreview(response.data.image ? `${IMG_BASE_URL}/${response.data.image.filename}` : demo);
                    } else {
                        toast.error('Supporter not found');
                    }
                } catch (error) {
                    console.error('Error fetching supporter data:', error);
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
          
               supporter.image=file
        
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(validate());
        if (validate()) {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('name', supporter.name);
            formData.append('email', supporter.email);
            formData.append('password', supporter.password);
            formData.append('contact', supporter.contact);
            formData.append('organization', supporter.organization);

            if (supporter.image) {
                formData.append('image', supporter.image);
            }

            console.log(formData.entries());
            // Log formData entries for debugging
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const supporterId = localStorage.getItem('supporterId');
            try {
                const response = await editSupportersById(supporterId, supporter);
                console.log('Edit supporter response:', response);

                if (response.success) {
                    toast.success('Profile updated successfully');
                    navigate('/supporter-home');
                } else {
                    toast.error(response.message || 'Failed to update profile');
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
        <div className="container px-5 m-auto mt-5 container-spec bg-creamy text-center">
            <form onSubmit={handleSubmit} noValidate>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-md-2 m-4 mt-0'>
                                <div className='supporter-edit-profile-border-box p-3 position-relative'>
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
                                    <div className='rounded-circle bg-white supporter-edit-profile-icon-box border-light position-absolute'>
                                        <label htmlFor="imageUpload" className="image-upload-label">
                                            <PiPencilDuotone color={'#59244C'} size={40} />
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            name="image"
                                            // accept="image/*"
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
                                        id="organization"
                                        name="organization"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.organization ? 'is-invalid' : ''}`}
                                        placeholder="Specify an organisation"
                                        value={supporter.organization}
                                        onChange={handleChange}
                                        aria-describedby="organizationError"
                                        required
                                    />
                                    {errors.organization && <div id="organizationError" className="invalid-feedback">{errors.organization}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-6 col-md-4 m-4 mt-0'>
                                <button type='submit' className='btn btn-lg bg-purple text-white supporter-edit-profile-save' disabled={isSubmitting}>
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

export default SupporterEditProfile;
