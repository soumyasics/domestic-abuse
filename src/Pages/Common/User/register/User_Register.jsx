import React from 'react';
import './User_Register.css';

function User_Register() {
  return (
    <><div className='home-hero'></div>
    <div className="container-fluid user-login-bg my-5 mb-0">
      <h1 className="user-login-heading">Sign Up</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 m-5">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label user-login-label my-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label user-login-label my-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label user-login-label my-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="dob"
                  className="form-label user-login-label my-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input primary my-2"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked" />
                  <label
                    className="form-check-label user-login-label my-2"
                    htmlFor="flexCheckChecked"
                  >
                    Remember this Device
                  </label>
                </div>
                <a className="user-login-label text-decoration-none my-2" href="">
                  Forgot Password?
                </a>
              </div>
              <div className="align-items-center justify-content-center d-flex">
                <button
                  type="submit"
                  className="btn w-25  py-2 fs-4 mb-4 rounded-2 btn-primary user-login-button text-white"
                >
                  Sign Up <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <g clip-path="url(#clip0_3_212)">
    <path d="M10.5216 9.27079L8.31929 11.4731M13.1643 11.9135L10.962 14.1158M9.64066 18.9609C7.43838 21.1631 5.23609 20.7227 3.47426 18.9609C1.71243 17.199 1.27197 14.9967 3.47426 12.7944L6.117 10.1517L12.2834 16.3181L9.64066 18.9609ZM13.1643 3.10439C15.3666 0.902098 17.5689 1.34256 19.3316 3.10439C21.0943 4.86621 21.533 7.0685 19.3316 9.27079L16.6889 11.9135L10.5216 5.74713L13.1643 3.10439Z" stroke="white" stroke-width="1.0842"/>
  </g>
  <defs>
    <clipPath id="clip0_3_212">
      <rect width="21.142" height="21.142" fill="white" transform="translate(0.831543 0.461609)"/>
    </clipPath>
  </defs>
</svg>
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <p className="fs-5 mb-0 fw-bold">
                  <a
                    className="fw-bold ms-2 text-decoration-none user-login-label"
                    href=""
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div></>
  );
}

export default User_Register;
