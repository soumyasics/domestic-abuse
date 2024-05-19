import React from "react";
import "./User_Login.css";
import Header from "../../Common/Header/Header";
import Victim from '../../../Assets/Rectangle 34.png';
import { Link } from 'react-router-dom';

function User_Login() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={Victim} className="img-fluid m-3" alt="Victim" />
          </div>
          <div className="col text-center">
            <div className="row m-5">
              <div className="col">
                <h1> Login </h1>
              </div>
            </div>
            <div className="row m-2 text-start">
              <div className="col ">
                <label htmlFor="username" className="form-label ">Username</label>
                <input type="text" id="username" className="form-control" placeholder="Username" />
              </div>
            </div>
            <div className="row m-2 text-start">
              <div className="col">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Password" />
              </div>
            </div>
            <div className="row m-2">
              <div className="col d-flex align-items-center">
                <input type="checkbox" className="form-check-input me-2" id="rememberMe" />
                <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
                <Link to="#" className="ms-auto">Forgot password?</Link>
              </div>
            </div>
            <div className="row m-5">
              <div className="col">
                <button type="button" className="btn btn-primary btn-lg">Login</button>
              </div>
            </div>
            <div className="row m-5">
              <div className="col">
                <p>Don't have an account? <Link to="#">Signup</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User_Login;
