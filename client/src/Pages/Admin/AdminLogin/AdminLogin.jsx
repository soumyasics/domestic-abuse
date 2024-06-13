import React, { useState } from 'react';
import './AdminLogin.css';
import CoolGirl from '../../../Assets/da233fcece78fe2b2c6a6128e4d1ffff.jpeg';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown,setPasswordShown]=useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility=()=>{
    setPasswordShown(!passwordShown);
  };
  const handleLogin = () => {
    const hardCodedUsername = 'admin';
    const hardCodedPassword = 'password@1';
    if (username === hardCodedUsername && password === hardCodedPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin-dashboard');

    }
    else {
      alert("Incorrect Username or Password");
    }
  }
  return (
    <>
      <div className="container">
        <div className="row vh-75 my-5">
          <div className="col-md-6 d-grid">
            <img src={CoolGirl} className="img-fluid m-1 align-self-center " alt="Victim" />
          </div>
          <div className="col-md-6 text-center d-grid align-self-center">
            <div className="row m-4">
              <div className="col">
                <h1 className='fw-semibold theme-purple m-3'> Admin Login </h1>
              </div>
            </div>
            <div className="row m-4 text-start">
              <div className="col">
                <div className="input-group ">
                  <input type="text" id="username" className="form-control form-control-lg border  home-card-bg rounded-4" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row m-4 mb-0 text-start">
              <div className="col">
                <div className="input-group">
                  <input type={passwordShown ? "text":"password"} id="password" className="form-control form-control-lg border border-end-0 rounded-end-0 home-card-bg rounded-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="input-group-text home-card-bg border-start-0 rounded-end-4" onClick={togglePasswordVisibility} >
                    <i className= {passwordShown ? "fa-regular fa-eye-slash":"fa-regular fa-eye"}></i>
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
  )
}
