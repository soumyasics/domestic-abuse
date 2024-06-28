import React, { useState, useContext } from 'react';
import './AdminLogin.css';
import CoolGirl from '../../../Assets/ADMIN LOGIN.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = () => {
    const hardCodedUsername = 'admin';
    const hardCodedPassword = 'password@1';
    if (username === hardCodedUsername && password === hardCodedPassword) {
      localStorage.setItem("admin",1)
      toast.success('Login successful!');
      
        navigate('/admin-dashboard');
     
    } else {
      toast.error('Incorrect Username or Password');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row vh-75 my-5">
          <div className="col-md-6 d-grid my-5">
            <img src={CoolGirl} className="img-fluid m-1 align-self-center" alt="Admin" />
          </div>
          <div className="col-md-6 text-center d-grid align-self-center my-5">
            <div className="row m-4">
              <div className="col">
                <h1 className="fw-semibold theme-purple m-3"> Admin Login </h1>
              </div>
            </div>
            <div className="row m-4 text-start">
              <div className="col">
                <div className="input-group">
                  <input type="text" id="username" className="form-control form-control-lg border home-card-bg rounded-4" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row m-4 mb-0 text-start">
              <div className="col">
                <div className="input-group">
                  <input type={passwordShown ? "text" : "password"} id="password" className="form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility}>
                    <i className={passwordShown ? "fa-regular fa-eye-slash theme-purple" : "fa-regular fa-eye theme-purple"}></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="row m-5">
              <div className="col">
                <button type="button" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
