import React, { useState, useContext } from 'react';
import './LegalProfessionalLogin.css';
import legalGirl from '../../../Assets/legal-professional-login.png'; 
import { useNavigate, Link } from 'react-router-dom';
import { loginLegalProfessional } from '../../../Services/apiService'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/AuthContext';

function LegalProfessionalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      const legalProfessional = { email, password };
      const result = await loginLegalProfessional(legalProfessional);

      if (result.success) {
        login(result.token, 'legalProfessional', result.userId); 
        console.log(result.userId);
        localStorage.setItem('lpId',result.userId)
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/legal-professional-home');
        }, 2000);
      } else {
        console.error('Login error:', result);
        toast.error(result.message + (result.debugInfo ? `: ${JSON.stringify(result.debugInfo)}` : ''));
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during login');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row vh-75 my-5">
        <div className="col-md-6 d-grid my-5">
          <img src={legalGirl} className="img-fluid m-1 align-self-center border" alt="Legal Professional" />
        </div>
        <div className="col-md-6 text-center d-grid align-self-center my-5">
          <div className="row m-4">
            <div className="col">
              <h1 className='fw-semibold theme-purple m-3'>Legal Professional Login</h1>
            </div>
          </div>
          <div className="row m-4 text-start">
            <div className="col">
              <div className="input-group">
                <input
                  type='email'
                  id="email"
                  className={`form-control form-control-lg border home-card-bg rounded-4 ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailError"
                />
                {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
          </div>
          <div className="row m-4 mb-0 text-start">
            <div className="col">
              <div className="input-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  className={`form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="passwordError"
                />
                <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility}>
                  <i className={passwordShown ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                </span>
                {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
          </div>
          <div className="row m-5 mb-0">
            <div className="col">
              <Link to='/legal-professional-forgot-password' className='text-decoration-none text-dark'>I Forgot my <span className='theme-purple'>Password</span></Link>
            </div>
          </div>
          <div className="row m-5 my-0 mt-1">
            <div className="col">
              <Link to='/legal-professional-register' className='text-decoration-none text-dark'>Are you a new Legal Professional? <span className='theme-purple'>Register Now</span></Link>
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

export default LegalProfessionalLogin;
