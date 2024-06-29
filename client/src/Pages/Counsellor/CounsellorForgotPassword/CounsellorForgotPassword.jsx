// src/Components/Counsellor/CounsellorForgotPassword/CounsellorForgotPassword.jsx

import React, { useState } from 'react';
import './CounsellorForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import CoolGirl from '../../../Assets/counsellor-login.jpeg';
import { forgotPasswordCounsellor } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CounsellorForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    try {
      const response = await forgotPasswordCounsellor(email, password);
      console.log(response);
      toast.success("Password reset successful. Redirecting to login page...");
      setTimeout(() => {
        navigate('/counsellor-login');
      }, 3000);
    } catch (error) {
      console.error('Password reset failed', error);
      toast.error(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row vh-75 my-5">
        <div className="col-md-6 d-grid my-5">
          <img src={CoolGirl} className="img-fluid m-1 align-self-center" alt="Victim" />
        </div>
        <div className="col-md-6 text-center d-grid align-self-center my-5">
          <div className="row m-4">
            <div className="col">
              <h1 className='fw-semibold theme- m-3 my-5 theme-purple'>Forgot Password</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="row m-4 mb-0 text-start">
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    id="username"
                    className={`form-control form-control-lg border home-card-bg rounded-4 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>
            </div>
            <div className="row m-4 mb-0 text-start">
              <div className="col">
                <div className="input-group">
                  <input
                    type={passwordShown1 ? "text" : "password"}
                    id="password"
                    className={`form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility1}>
                    <i className={passwordShown1 ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                  </span>
                  {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>
            </div>
            <div className="row m-4 mb-0 text-start">
              <div className="col">
                <div className="input-group">
                  <input
                    type={passwordShown2 ? "text" : "password"}
                    id="confirmPassword"
                    className={`form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility2}>
                    <i className={passwordShown2 ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                  </span>
                  {errors.confirmPassword && <div id="confirmPasswordError" className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>
            </div>
            <div className="row m-5">
              <div className="col">
                <button type="submit" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CounsellorForgotPassword;
