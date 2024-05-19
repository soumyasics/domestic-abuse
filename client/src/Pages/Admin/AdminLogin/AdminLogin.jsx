import React, {useState} from 'react';
import './AdminLogin.css';
import CoolGuy from '../../../Assets/admin_login.png';
import { Link,useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleLogin = () =>{
        const hardCodedUsername = 'admin';
        const hardCodedPassword = 'password@1';
        if (username === hardCodedUsername && password === hardCodedPassword){
            localStorage.setItem('isAdminLoggedIn','true');
            navigate('/admin-dashboard');

        }
        else{
          alert("Incorrect Username or Password");
        } 
    }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={CoolGuy} className="img-fluid m-3 " alt="Victim" />
          </div>
          <div className="col text-center">
            <div className="row m-5">
              <div className="col">
                <h1 className='fw-bolder m-5'> Login </h1>
              </div>
            </div>
            <div className="row m-5 text-start">
              <div className="col">
                <label htmlFor="username" className="form-label fw-semibold">Username</label>
                <div className="input-group ">
                  <input type="text" id="username" className="form-control form-control-lg border border-end-0" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                  <span className="input-group-text bg-transparent border-start-0">
                    <i className="fa-regular fa-user"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="row m-5 mb-0 text-start">
              <div className="col">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input type="password" id="password" className="form-control form-control-lg border border-end-0" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                  <span className="input-group-text bg-transparent border-start-0">
                    <i className="fa-regular fa-eye"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="row m-5 mt-0">
              <div className="col d-flex align-items-center">
                <input type="checkbox" className="form-check-input me-2" id="rememberMe" />
                <label htmlFor="rememberMe" className="form-check-label text-dark fw-semibold">Remember me</label>
                <Link to="#" className="ms-auto  fw-semibold text-dark">Forgot password?</Link>
              </div>
            </div>
            <div className="row m-5">
              <div className="col">
                <button type="button" className="btn bg-theme btn-lg fw-bolder px-5" onClick={handleLogin}>Login</button>
                <p>Don't have an account? <Link to="#" className='text-decoration-none m-1 text-dark fw-bolder'> Signup</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
