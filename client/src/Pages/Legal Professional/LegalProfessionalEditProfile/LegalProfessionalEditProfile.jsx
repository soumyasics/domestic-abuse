import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalProfessionalEditProfile.css';
import { toast } from 'react-toastify';
import { PiPencilDuotone } from "react-icons/pi";
import { People } from 'react-bootstrap-icons';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt,FaUniversity } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { GiPadlock } from "react-icons/gi";
import { RiFilePaper2Line } from "react-icons/ri";
import demo from '../../../Assets/supp-edit-profile.png';
import { editLegalProfessionalById, getLegalProfessionalById,IMG_BASE_URL } from '../../../Services/apiService'; 


function LegalProfessionalEditProfile() {
    const [legalProfessional, setLegalProfessional] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        rePassword: '',
        barAssociationId: '',
        firmName: '',
        licenseNumber: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(demo);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLegalProfessionalData = async () => {
            const legalProfessionalId = localStorage.getItem('legalProfessionalId');
            if (legalProfessionalId) {
                try {
                    const response = await getLegalProfessionalById(legalProfessionalId);
                    if (response.status === 200) {
                        setLegalProfessional(response.data);
                        setImagePreview(response.data.image ? `${IMG_BASE_URL}/${response.data.image.filename}` : demo);
                    } else {
                        toast.error('Legal Professional not found');
                    }
                } catch (error) {
                    console.error('Error fetching legal professional data:', error);
                    toast.error('An error occurred while fetching the legal professional data');
                }
            }
        };

        fetchLegalProfessionalData();
    }, []);

    const validate = () => {
        const newErrors = {};
        // Add your validation logic here as before
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLegalProfessional({
            ...legalProfessional,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLegalProfessional({
                ...legalProfessional,
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
            formData.append('name', legalProfessional.name);
            formData.append('email', legalProfessional.email);
            formData.append('password', legalProfessional.password);
            formData.append('contact', legalProfessional.contact);
            formData.append('barAssociationId', legalProfessional.barAssociationId);
            formData.append('firmName', legalProfessional.firmName);
            formData.append('licenseNumber', legalProfessional.licenseNumber);

            if (legalProfessional.image) {
                formData.append('image', legalProfessional.image);
            }

            const legalProfessionalId = localStorage.getItem('legalProfessionalId');
            try {
                const response = await editLegalProfessionalById(legalProfessionalId, formData);
                if (response.status === 200) {
                    toast.success('Profile updated successfully');
                    navigate('/legal-professional-home');
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
                                <div className='legal-professional-edit-profile-border-box p-3 position-relative'>
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
                                    <div className='rounded-circle bg-white legal-professional-edit-profile-icon-box border-light position-absolute cursor-pointer'>
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
                                        value={legalProfessional.name}
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
                                        value={legalProfessional.contact}
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
                                        value={legalProfessional.email}
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
                                        <ImLocation />
                                    </span>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.location ? 'is-invalid' : ''}`}
                                        placeholder="Location"
                                        value={legalProfessional.location}
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
                                        <GiPadlock />
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        value={legalProfessional.password}
                                        onChange={handleChange}
                                        aria-describedby="passwordError"
                                        required
                                    />
                                    {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <GiPadlock />
                                    </span>
                                    <input
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.rePassword ? 'is-invalid' : ''}`}
                                        placeholder="Confirm Password"
                                        value={legalProfessional.rePassword}
                                        onChange={handleChange}
                                        aria-describedby="rePasswordError"
                                        required
                                    />
                                    {errors.rePassword && <div id="rePasswordError" className="invalid-feedback">{errors.rePassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <FcDocument />
                                    </span>
                                    <input
                                        type="text"
                                        id="barAssociationId"
                                        name="barAssociationId"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.barAssociationId ? 'is-invalid' : ''}`}
                                        placeholder="Bar Association ID"
                                        value={legalProfessional.barAssociationId}
                                        onChange={handleChange}
                                        aria-describedby="barAssociationIdError"
                                        required
                                    />
                                    {errors.barAssociationId && <div id="barAssociationIdError" className="invalid-feedback">{errors.barAssociationId}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <FaUniversity />
                                    </span>
                                    <input
                                        type="text"
                                        id="firmName"
                                        name="firmName"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.firmName ? 'is-invalid' : ''}`}
                                        placeholder="Firm Name"
                                        value={legalProfessional.firmName}
                                        onChange={handleChange}
                                        aria-describedby="firmNameError"
                                        required
                                    />
                                    {errors.firmName && <div id="firmNameError" className="invalid-feedback">{errors.firmName}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <RiFilePaper2Line />
                                    </span>
                                    <input
                                        type="text"
                                        id="licenseNumber"
                                        name="licenseNumber"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.licenseNumber ? 'is-invalid' : ''}`}
                                        placeholder="License Number"
                                        value={legalProfessional.licenseNumber}
                                        onChange={handleChange}
                                        aria-describedby="licenseNumberError"
                                        required
                                    />
                                    {errors.licenseNumber && <div id="licenseNumberError" className="invalid-feedback">{errors.licenseNumber}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-md-2 m-4 mt-0'>
                                <div className='legal-professional-edit-profile-border-box p-3 position-relative'>
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
                                    <div className='rounded-circle bg-white legal-professional-edit-profile-icon-box border-light position-absolute cursor-pointer'>
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
                                        value={legalProfessional.name}
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
                                        value={legalProfessional.contact}
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
                                        value={legalProfessional.email}
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
                                        <ImLocation />
                                    </span>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.location ? 'is-invalid' : ''}`}
                                        placeholder="Location"
                                        value={legalProfessional.location}
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
                                        <GiPadlock />
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        value={legalProfessional.password}
                                        onChange={handleChange}
                                        aria-describedby="passwordError"
                                        required
                                    />
                                    {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <GiPadlock />
                                    </span>
                                    <input
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.rePassword ? 'is-invalid' : ''}`}
                                        placeholder="Confirm Password"
                                        value={legalProfessional.rePassword}
                                        onChange={handleChange}
                                        aria-describedby="rePasswordError"
                                        required
                                    />
                                    {errors.rePassword && <div id="rePasswordError" className="invalid-feedback">{errors.rePassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <FcDocument />
                                    </span>
                                    <input
                                        type="text"
                                        id="barAssociationId"
                                        name="barAssociationId"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.barAssociationId ? 'is-invalid' : ''}`}
                                        placeholder="Bar Association ID"
                                        value={legalProfessional.barAssociationId}
                                        onChange={handleChange}
                                        aria-describedby="barAssociationIdError"
                                        required
                                    />
                                    {errors.barAssociationId && <div id="barAssociationIdError" className="invalid-feedback">{errors.barAssociationId}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <FaUniversity />
                                    </span>
                                    <input
                                        type="text"
                                        id="firmName"
                                        name="firmName"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.firmName ? 'is-invalid' : ''}`}
                                        placeholder="Firm Name"
                                        value={legalProfessional.firmName}
                                        onChange={handleChange}
                                        aria-describedby="firmNameError"
                                        required
                                    />
                                    {errors.firmName && <div id="firmNameError" className="invalid-feedback">{errors.firmName}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <div className="input-group">
                                    <span className="input-group-text home-card-bg border-end-0 rounded-start-4 bg-purple text-white">
                                        <RiFilePaper2Line />
                                    </span>
                                    <input
                                        type="text"
                                        id="licenseNumber"
                                        name="licenseNumber"
                                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.licenseNumber ? 'is-invalid' : ''}`}
                                        placeholder="License Number"
                                        value={legalProfessional.licenseNumber}
                                        onChange={handleChange}
                                        aria-describedby="licenseNumberError"
                                        required
                                    />
                                    {errors.licenseNumber && <div id="licenseNumberError" className="invalid-feedback">{errors.licenseNumber}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-4 mt-0'>
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn home-card-bg w-100 btn-lg btn-success"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LegalProfessionalEditProfile;
