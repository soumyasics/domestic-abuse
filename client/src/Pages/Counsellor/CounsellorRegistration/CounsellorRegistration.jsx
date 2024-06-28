import React, { useState } from 'react';
import './CounsellorRegistration.css';
import counsellorImg from '../../../Assets/counsellor-registration.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLanguage } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { registerSupporters } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CounsellorRegistration() {
  const [counsellor, setCounsellor] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    rePassword: '',
    experience: '',
    specialisation: '',
    language: '',
    location: ''
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

    if (!counsellor.name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(counsellor.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!counsellor.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(counsellor.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!counsellor.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(counsellor.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!counsellor.password) {
      newErrors.password = 'Password is required';
    }

    if (!counsellor.rePassword) {
      newErrors.rePassword = 'Re Type Password is required';
    } else if (counsellor.password !== counsellor.rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    if (!counsellor.experience) {
      newErrors.experience = 'Work Experience is required';
    }

    if (!counsellor.specialisation) {
      newErrors.specialisation = 'Specialisation is required';
    }

    if (!counsellor.language) {
      newErrors.language = 'Language is required';
    }

    if (!counsellor.location) {
      newErrors.location = 'Location is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await registerSupporters(counsellor);
      if (response.success) {
        toast.success(response.message);
        navigate('/counsellor-login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error Registering Counsellor', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container px-5 m-auto mt-5 ">
        <ToastContainer />
        <div className="row px-5 mt-5">
          <div className="col-md-6 mt-5 d-flex align-items-center">
            <img src={counsellorImg} className=" align-self-center object-fit-cover counsellor-register-scale-img " alt="counsellor" />
          </div>
          <div className="col-md-6 mt-5 text-center align-self-start">
            <div className="row m-4 mt-0">
              <div className="col">
                <h1 className='fw-semibold theme-purple m-3'> Counsellors Registration</h1>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaUser />
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
                      placeholder="Email Id"
                      value={counsellor.email}
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
                      value={counsellor.contact}
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
                      <CgOrganisation />
                    </span>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.experience ? 'is-invalid' : ''}`}
                      placeholder="Work Experience"
                      value={counsellor.experience}
                      onChange={handleChange}
                      aria-describedby="experienceError"
                      required
                    />
                    {errors.experience && <div id="experienceError" className="invalid-feedback">{errors.experience}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <People />
                    </span>
                    <select
                      id="specialisation"
                      name="specialisation"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.specialisation ? 'is-invalid' : ''}`}
                      value={counsellor.specialisation}
                      onChange={handleChange}
                      aria-describedby="specialisationError"
                      required
                    >
                      <option value="">Select Specialisation</option>
                      <option value="Clinical Counselors">Clinical Counselors</option>
                      <option value="School Counselors">School Counselors</option>
                      <option value="Marriage and Family Therapists">Marriage and Family Therapists</option>
                      <option value="Substance Abuse Counselors">Substance Abuse Counselors</option>
                      <option value="Career Counselors">Career Counselors</option>
                      <option value="Rehabilitation Counselors">Rehabilitation Counselors</option>
                      <option value="Grief Counselors">Grief Counselors</option>
                      <option value="Mental Health Counselors">Mental Health Counselors</option>
                      <option value="Child and Adolescent Counselors">Child and Adolescent Counselors</option>
                      <option value="Guidance Counselors">Guidance Counselors</option>
                    </select>
                    {errors.specialisation && <div id="specialisationError" className="invalid-feedback">{errors.specialisation}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <IoLanguage />
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaLocationDot />
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
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <MdOutlinePassword />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      value={counsellor.password}
                      onChange={handleChange}
                      aria-describedby="passwordError"
                      required
                    />
                    <span className="input-group-text home-card-bg border-end-0 rounded-end-2 bg-purple text-white" onClick={togglePasswordVisibility}>
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
                      <RiLockPasswordFill />
                    </span>
                    <input
                      type={showRePassword ? "text" : "password"}
                      id="rePassword"
                      name="rePassword"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.rePassword ? 'is-invalid' : ''}`}
                      placeholder="Re Type Password"
                      value={counsellor.rePassword}
                      onChange={handleChange}
                      aria-describedby="rePasswordError"
                      required
                    />
                    <span className="input-group-text home-card-bg border-end-0 rounded-end-2 bg-purple text-white" onClick={toggleRePasswordVisibility}>
                      {showRePassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                    {errors.rePassword && <div id="rePasswordError" className="invalid-feedback">{errors.rePassword}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-5 text-start ">
                <div className="col text-center">
                  <button type="submit" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
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

export default CounsellorRegistration;
