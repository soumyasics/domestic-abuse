import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import CoolGirl from '../../../Assets/forgot-password.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <div className="container">
      <div className="row vh-75 my-5">
        <div className="col-md-6 d-grid my-5">
          <img src={CoolGirl} className="img-fluid m-1 align-self-center" alt="Victim" />
        </div>
        <div className="col-md-6 text-center d-grid align-self-center my-5">
          <div className="row m-4">
            <div className="col">
              <h1 className='fw-semibold theme-purple m-3 my-5'> Forgot Password</h1>
            </div>
          </div>
          <div className="row m-4 mb-0 text-start">
            <div className="col">
              <div className="input-group">
                <input type="text" id="username" className="form-control form-control-lg border home-card-bg rounded-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="row m-4 mb-0 text-start">
            <div className="col">
              <div className="input-group">
                <input type={passwordShown1 ? "text" : "password"} id="password" className="form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility1}>
                  <i className={passwordShown1 ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row m-4 mb-0 text-start">
            <div className="col">
              <div className="input-group">
                <input type={passwordShown2 ? "text" : "password"} id="confirmPassword" className="form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility2}>
                  <i className={passwordShown2 ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row m-5">
            <div className="col">
              <button type="button" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
