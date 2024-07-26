import React, { useState } from 'react';
import './LegalProfessionalChangePassword.css';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from 'react-toastify';

function LegalProfessionalChangePassword() {
    const [changePassword, setChangePassword] = useState({
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    const navigate = useNavigate();

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleReNewPasswordVisibility = () => {
        setShowReNewPassword(!showReNewPassword);
    };
    const validate = () => {
        const newErrors = {};
        if (!changePassword.oldPassword) {
            newErrors.oldPassword = 'Old Password is required';
        }

        if (!changePassword.newPassword) {
            newErrors.newPassword = 'New Password is required';
        } else if (changePassword.newPassword !== changePassword.reNewPassword) {
            newErrors.reNewPassword = 'Passwords do not match';
        } else if (changePassword.newPassword === changePassword.oldPassword) {
            newErrors.reNewPassword = 'Old Password and new Password cant be the same';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangePassword({
            ...changePassword,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            console.log(errors);
            toast.error('Please fix the errors in the form.');
            return;
        }

        setIsSubmitting(true);
        try {
            //   const response = await registerLegalProfessional(legalProfessional);
            //   if (response.success) {
            //     toast.success(response.message);
            //     navigate('/legal-professional-login');
            //   } else {
            //     toast.error(response.message);
            //   }
        } catch (error) {
            console.error('Error while Changing Password', error);
            toast.error(error.response?.data?.message || 'Password Change failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col'>
                    <h2 className='theme-purple text-center'>Change Password</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className='row m-5'>
                    <div className='col-6 m-auto border'>
                        <div className="row m-5 ">
                            <div className='col-3 text-end d-flex align-items-center justify-content-end theme-purple'>
                                <label className='form-label' htmlFor='oldPassword'>Old Password</label>
                            </div>
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        id="oldPassword"
                                        name="oldPassword"
                                        className={`form-control form-control-lg border border-end-0   ${errors.oldPassword ? 'is-invalid' : ''}`}
                                        value={changePassword.oldPassword}
                                        onChange={handleChange}
                                        aria-describedby="oldPasswordError"
                                        required
                                    />
                                    <span className="input-group-text home-card-bg border-start-0  theme-purple" onClick={toggleOldPasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {showOldPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </span>
                                    {errors.oldPassword && <div id="oldPasswordError" className="invalid-feedback">{errors.oldPassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row m-5 ">
                            <div className='col-3 text-end d-flex align-items-center justify-content-end theme-purple'>
                                <label className='form-label' htmlFor='newPassword'>New Password</label>
                            </div>
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        className={`form-control form-control-lg border border-end-0   ${errors.newPassword ? 'is-invalid' : ''}`}
                                        value={changePassword.newPassword}
                                        onChange={handleChange}
                                        aria-describedby="newPasswordError"
                                        required
                                    />
                                    <span className="input-group-text home-card-bg border-start-0  theme-purple" onClick={toggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {showNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </span>
                                    {errors.newPassword && <div id="newPasswordError" className="invalid-feedback">{errors.newPassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row m-5 ">
                            <div className='col-3 text-end d-flex align-items-center justify-content-end theme-purple'>
                                <label className='form-label' htmlFor='reNewPassword'>Repeat New Password</label>
                            </div>
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        type={showReNewPassword ? "text" : "password"}
                                        id="reNewPassword"
                                        name="reNewPassword"
                                        className={`form-control form-control-lg border border-end-0   ${errors.reNewPassword ? 'is-invalid' : ''}`}
                                        value={changePassword.reNewPassword}
                                        onChange={handleChange}
                                        aria-describedby="reNewPasswordError"
                                        required
                                    />
                                    <span className="input-group-text home-card-bg border-start-0  theme-purple" onClick={toggleReNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {showReNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </span>
                                    {errors.reNewPassword && <div id="reNewPasswordError" className="invalid-feedback">{errors.reNewPassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row m-5">
                            <div className="col text-end">
                                <button
                                    type="submit"
                                    className="btn bg-theme btn-lg fw-bolder px-5 text-white "
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Changing Password...' : 'Change Password'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LegalProfessionalChangePassword