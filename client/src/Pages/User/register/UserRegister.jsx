import React, { useState } from 'react';
import './UserRegister.css';
import userImg from '../../../Assets/user-register.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaPhoneAlt, FaCameraRetro, FaCalendarAlt, FaVenusMars, FaHome, FaUsers, FaShieldAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    rePassword: '',
    dob: '',
    gender: '',
    address: '',
    relation: '',
    safetyPlan: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
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

    if (!user.name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(user.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!user.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!user.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(user.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!user.password) {
      newErrors.password = 'Password is required';
    }

    if (!user.rePassword) {
      newErrors.rePassword = 'Re Type Password is required';
    } else if (user.password !== user.rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    if (!user.dob) {
      newErrors.dob = 'Date of Birth is required';
    }

    if (!user.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!user.address) {
      newErrors.address = 'Address is required';
    }

    if (!user.relation) {
      newErrors.relation = 'Relationship to the abuser is required';
    }

    if (!user.safetyPlan) {
      newErrors.safetyPlan = 'Safety plan is required';
    }

    if (!user.image) {
      newErrors.image = 'Image is required';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(user.image.type)) {
      newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      image: file,
    });
  };
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    if (!isAgreed) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }
    

    setIsSubmitting(true);
    try {
      // const response = await registerSupporters(user);
      // if (response.success) {
      //   toast.success(response.message);
      //   navigate('/user-login');
      // } else {
      //   toast.error(response.message);
      // }
    } catch (error) {
      console.error('Error Registering User', error);
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
            <img src={userImg} className="align-self-center object-fit-cover counsellor-register-scale-img " alt="user" />
          </div>
          <div className="col-md-6 mt-5 text-center align-self-start">
            <div className="row m-4 mt-0">
              <div className="col">
                <h3 className='fw-semibold theme-purple m-3'> User Registration</h3>
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
                      value={user.name}
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
                      value={user.email}
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
                      value={user.contact}
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
                      <FaCalendarAlt />
                    </span>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.dob ? 'is-invalid' : ''}`}
                      placeholder="Date of Birth"
                      value={user.dob}
                      onChange={handleChange}
                      aria-describedby="dobError"
                      required
                    />
                    {errors.dob && <div id="dobError" className="invalid-feedback">{errors.dob}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaVenusMars />
                    </span>
                    <select
                      id="gender"
                      name="gender"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.gender ? 'is-invalid' : ''}`}
                      value={user.gender}
                      onChange={handleChange}
                      aria-describedby="genderError"
                      required
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div id="genderError" className="invalid-feedback">{errors.gender}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaHome />
                    </span>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="Address"
                      value={user.address}
                      onChange={handleChange}
                      aria-describedby="addressError"
                      required
                    />
                    {errors.address && <div id="addressError" className="invalid-feedback">{errors.address}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaUsers />
                    </span>
                    <input
                      type="text"
                      id="relation"
                      name="relation"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.relation ? 'is-invalid' : ''}`}
                      placeholder="Relationship to the Abuser"
                      value={user.relation}
                      onChange={handleChange}
                      aria-describedby="relationError"
                      required
                    />
                    {errors.relation && <div id="relationError" className="invalid-feedback">{errors.relation}</div>}
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
                      id="image"
                      name="image"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.image ? 'is-invalid' : ''}`}
                      accept="image/*"
                      onChange={handleImageChange}
                      aria-describedby="imageError"
                      required
                    />
                    {errors.image && <div id="imageError" className="invalid-feedback">{errors.image}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaShieldAlt />
                    </span>
                    <textarea
                      id="safetyPlan"
                      name="safetyPlan"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.safetyPlan ? 'is-invalid' : ''}`}
                      placeholder="Safety Plan"
                      value={user.safetyPlan}
                      onChange={handleChange}
                      aria-describedby="safetyPlanError"
                      required
                    />
                    {errors.safetyPlan && <div id="safetyPlanError" className="invalid-feedback">{errors.safetyPlan}</div>}
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
                      value={user.password}
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
                      placeholder="Re Type Password"
                      value={user.rePassword}
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
              <div className="row m-4 mt-0 text-center">
                <div className="col d-flex ">
                  <div className="form-check align-items-center">
                    <input className="form-check-input bg-purple" type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={isAgreed}
                      onChange={handleCheckboxChange} />
                    <label className="form-check-label text-secondary" htmlFor="agreeTerms">
                      Agree Terms & Conditions
                    </label>
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-center">
                <div className="col">
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

export default UserRegister;
