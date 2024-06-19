import React, { useState } from 'react';
import './SupporterRegister.css';
import supporter1 from '../../../Assets/SUPPORTER REG.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaPhoneAlt, FaCameraRetro } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgOrganisation } from "react-icons/cg";
import { registerSupporters } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupporterRegister() {
  const [supporter, setSupporter] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    rePassword: '',
    organisation: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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

    if (!supporter.name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(supporter.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!supporter.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(supporter.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!supporter.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(supporter.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!supporter.password) {
      newErrors.password = 'Password is required';
    }

    if (!supporter.rePassword) {
      newErrors.rePassword = 'Re Type Password is required';
    } else if (supporter.password !== supporter.rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    if (!supporter.organisation) {
      newErrors.organisation = 'Organisation Name is required';
    }

    if (!supporter.image) {
      newErrors.image = 'Image is required';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(supporter.image.type)) {
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
    setSupporter({
      ...supporter,
      image: file,
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
      const response = await registerSupporters(supporter);
      console.log('Registered User', response);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Error Registering Supporter', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="container px-5 m-auto mt-5 container-spec">
      <div className="row  px-5 mt-5">
        <div className="col-md-6 d-flex  mt-5">
          <img src={supporter1} className=" m-1 align-self-center img-fluid  " alt="supporter" />
        </div>
        <div className="col-md-6 mt-5  text-center d-grid align-self-start">
          <div className="row m-4 mt-0">
            <div className="col">
              <h1 className='fw-semibold theme-purple m-3'> Supporter Registration</h1>
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
                    value={supporter.name}
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
                    value={supporter.email}
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
                    value={supporter.contact}
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
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`form-control form-control-lg border border-start-0 home-card-bg border-end-0 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={supporter.password}
                    onChange={handleChange}
                    aria-describedby="passwordError"
                    required
                  />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-2  theme-purple" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
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
                    value={supporter.rePassword}
                    onChange={handleChange}
                    aria-describedby="rePasswordError"
                    required
                  />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-2  theme-purple" onClick={toggleRePasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showRePassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                  {errors.rePassword && <div id="rePasswordError" className="invalid-feedback">{errors.rePassword}</div>}
                </div>
              </div>
            </div>
            <div className="row m-4 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
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
            <div className="row m-4 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaCameraRetro />
                  </span>
                  <input
                    type="file"
                    className={`form-control form-control-lg ${errors.image ? 'is-invalid' : ''}`}
                    id="inputGroupFile01"
                    onChange={handleImageChange}
                    aria-describedby="imageError"
                    required
                  />
                  {errors.image && <div id="imageError" className="invalid-feedback">{errors.image}</div>}
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

export default SupporterRegister;
