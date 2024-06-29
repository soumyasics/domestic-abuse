import React, { useState, useContext } from 'react';
import './SupporterLogin.css';
import CoolGirl from '../../../Assets/SUPPORTER LOGIN PAGE.png';
import { useNavigate } from 'react-router-dom';
import { loginSupporter } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

function SupporterLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const validateForm = () => {
    if (!email) {
      toast.error('Email is required');
      return false;
    }
    if (!password) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const supporter = { email, password };
      const result = await loginSupporter(supporter, (token, supporterId) => {
        login(token, 'supporter', supporterId); // Pass supporterId to login function
      });

      if (result.success) {
        toast.success('Login successful!');
        localStorage.setItem("supporterId", result.user._id);
        setTimeout(() => {
          navigate('/supporter-home');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during login');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row vh-75 my-5">
        <div className="col-md-6 d-grid my-5">
          <img src={CoolGirl} className="img-fluid m-1 align-self-center border" alt="Supporter" />
        </div>
        <div className="col-md-6 text-center d-grid align-self-center my-5">
          <div className="row m-4">
            <div className="col">
              <h1 className='fw-semibold theme-purple m-3'>Login</h1>
            </div>
          </div>
          <div className="row m-4 text-start">
            <div className="col">
              <div className="input-group">
                <input
                  type='email'
                  id="email"
                  className="form-control form-control-lg border home-card-bg rounded-4"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row m-4 mb-0 text-start">
            <div className="col">
              <div className="input-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  className="form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility}>
                  <i className={passwordShown ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row m-5 mb-0">
            <div className="col">
              <Link to='/supporter-forgot-password' className='text-decoration-none text-dark'>I Forgot my <span className='theme-purple'>Password</span></Link>
            </div>
          </div>
          <div className="row m-5 my-0 mt-1">
            <div className="col">
              <Link to='/supporter-register' className='text-decoration-none text-dark'>Are you a new Supporter? <span className='theme-purple'>Register Now</span></Link>
            </div>
          </div>
          <div className="row m-5 ">
            <div className="col">
              <button type="button" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupporterLogin;
