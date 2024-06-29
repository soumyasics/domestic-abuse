import React, { useState } from 'react';
import './LegalProfessionalRegister.css';
import legalProfessional1 from '../../../Assets/legal-professional-register.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaPhoneAlt, FaCameraRetro } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsBuilding } from "react-icons/bs";
import { registerLegalProfessionals } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function LegalProfessionalRegister() {
  const [legalProfessional, setLegalProfessional] = useState({
    name: '',
    email: '',
    contact: '',
    barAssociationId: '',
    firmName: '',
    licenseNumber: '',
    photo: null,
    proof: null,
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!legalProfessional.name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(legalProfessional.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!legalProfessional.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(legalProfessional.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!legalProfessional.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(legalProfessional.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!legalProfessional.barAssociationId) {
      newErrors.barAssociationId = 'Bar Association Id is required';
    }

    if (!legalProfessional.firmName) {
      newErrors.firmName = 'Firm Name is required';
    }

    if (!legalProfessional.licenseNumber) {
      newErrors.licenseNumber = 'License Number is required';
    }

    if (!legalProfessional.password) {
      newErrors.password = 'Password is required';
    }

    if (!legalProfessional.rePassword) {
      newErrors.rePassword = 'Re Type Password is required';
    } else if (legalProfessional.password !== legalProfessional.rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    if (!legalProfessional.photo) {
      newErrors.photo = 'Photo is required';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(legalProfessional.photo.type)) {
      newErrors.photo = 'Only image files (jpeg, png, gif) are allowed';
    }

    if (!legalProfessional.proof) {
      newErrors.proof = 'Proof is required';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(legalProfessional.proof.type)) {
      newErrors.proof = 'Only image files (jpeg, png, gif) are allowed';
    }

    setErrors(newErrors);
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
    const { name, files } = e.target;
    const file = files[0];
    setLegalProfessional({
      ...legalProfessional,
      [name]: file,
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
      //   const response = await registerLegalProfessionals(legalProfessional);
      //   if (response.success) {
      //     toast.success(response.message);
      //     navigate('/legal-professional-login');
      //   } else {
      //     toast.error(response.message);
      //   }
    } catch (error) {
      console.error('Error Registering Legal Professional', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container px-5 m-auto mt-5 ">
        <ToastContainer />
        <div className="row px-5 my-5">
          <div className="col-md-6 mt-5">
            <img src={legalProfessional1} className="align-self-center m-auto object-fit-cover legal-professional-register-scale-img" alt="legal professional" />
          </div>
          <div className="col-md-6 mt-5 text-center align-self-start">
            <div className="row m-4 mt-0">
              <div className="col">
                <h3 className='fw-semibold theme-purple m-3'>Legal Professional Registration</h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="tel"
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <BsBuilding />
                    </span>
                    <input
                      type="text"
                      id="barAssociationId"
                      name="barAssociationId"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.barAssociationId ? 'is-invalid' : ''}`}
                      placeholder="Bar Association Id"
                      value={legalProfessional.barAssociationId}
                      onChange={handleChange}
                      aria-describedby="barAssociationIdError"
                      required
                    />
                    {errors.barAssociationId && <div id="barAssociationIdError" className="invalid-feedback">{errors.barAssociationId}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <BsBuilding />
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <RiLockPasswordFill />
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <label htmlFor="photo" className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaCameraRetro />
                      <span className="ms-2">Photo</span>
                    </label>
                    <input
                      type="file"
                      className={`form-control form-control-lg ${errors.photo ? 'is-invalid' : ''}`}
                      id="photo"
                      name="photo"
                      onChange={handleImageChange}
                      aria-describedby="photoError"
                      required
                    />
                    {errors.photo && <div id="photoError" className="invalid-feedback">{errors.photo}</div>}
                  </div>
                </div>
              </div>

              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <label htmlFor="proof" className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaCameraRetro />
                      <span className="ms-2">Proof</span>
                    </label>
                    <input
                      type="file"
                      className={`form-control form-control-lg ${errors.proof ? 'is-invalid' : ''}`}
                      id="proof"
                      name="proof"
                      onChange={handleImageChange}
                      aria-describedby="proofError"
                      required
                    />
                    {errors.proof && <div id="proofError" className="invalid-feedback">{errors.proof}</div>}
                  </div>
                </div>
              </div>

              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <RiLockPasswordFill />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control form-control-lg border border-start-0 home-card-bg border-end-0 ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      value={legalProfessional.password}
                      onChange={handleChange}
                      aria-describedby="passwordError"
                      required
                    />
                    <span className="input-group-text home-card-bg border-start-0 rounded-end-2 theme-purple" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                    {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <MdOutlinePassword />
                    </span>
                    <input
                      type={showRePassword ? "text" : "password"}
                      id="rePassword"
                      name="rePassword"
                      className={`form-control form-control-lg border border-start-0 home-card-bg border-end-0 ${errors.rePassword ? 'is-invalid' : ''}`}
                      placeholder="Re-enter Password"
                      value={legalProfessional.rePassword}
                      onChange={handleChange}
                      aria-describedby="rePasswordError"
                      required
                    />
                    <span className="input-group-text home-card-bg border-start-0 rounded-end-2 theme-purple" onClick={toggleRePasswordVisibility} style={{ cursor: 'pointer' }}>
                      {showRePassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                    {errors.rePassword && <div id="rePasswordError" className="invalid-feedback">{errors.rePassword}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-5">
                <div className="col">
                  <button
                    type="submit"
                    className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LegalProfessionalRegister;
