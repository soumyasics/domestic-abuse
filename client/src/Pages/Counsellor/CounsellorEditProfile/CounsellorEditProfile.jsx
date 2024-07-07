import React, { useEffect, useState } from 'react';
import './CounsellorEditProfile.css';
import counsellorImg from '../../../Assets/counsellor-registration.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail} from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { CgOrganisation } from "react-icons/cg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { editCounsellorById, getCounsellorById,getCounsellorByIdProfile,IMG_BASE_URL } from '../../../Services/apiService';
import demo from '../../../Assets/supp-edit-profile.png';

function CounsellorEditProfile() {
  const [counsellor, setCounsellor] = useState({
    name: '',
    email: '',
    contact: '',
    experience: '',
    specialisation: '',
    language: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(demo);

  useEffect(() => {
    const fetchSupporterData = async () => {
        const counsellorId = localStorage.getItem('counsellorId');
        if (counsellorId) {
            try {
                const response = await getCounsellorByIdProfile(counsellorId);
                console.log('Fetch supporter response:', response);
                if (response.status === 200) {
                    setCounsellor(response.data);
                    setImagePreview(response.data.image ? `${IMG_BASE_URL}/${counsellor.image.filename}` : demo);
                } else {
                    toast.error('Supporter not found');
                }
            } catch (error) {
                console.error('Error fetching supporter data:', error);
                toast.error('An error occurred while fetching the supporter data');
            }
        }
    };

    fetchSupporterData();
}, []);
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!counsellor.name) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(counsellor.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!counsellor.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(counsellor.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!counsellor.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(counsellor.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!counsellor.experience) {
      newErrors.experience = 'Work Experience is required';
    }

    if (!counsellor.specialisation) {
      newErrors.specialisation = 'Specialisation is required';
    }

    if (!counsellor.language) {
      newErrors.language = 'Language is required';
    }

    if (!counsellor.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCounsellor({
        ...counsellor,
        [name]: value,
    });
};

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      counsellor.image=file
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validate());
    if (validate()) {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', counsellor.name);
        formData.append('email', counsellor.email);
        formData.append('password', counsellor.password);
        formData.append('contact', counsellor.contact);
        formData.append('organization', counsellor.organization);

        if (counsellor.image) {
            formData.append('image', counsellor.image);
        }

        console.log(formData.entries());
        // Log formData entries for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const counsellorId = localStorage.getItem('counsellorId');
        try {
            const response = await editCounsellorById(counsellorId, counsellor);
            console.log('Edit supporter response:', response);

            if (response.success) {
                toast.success('Profile updated successfully');
                navigate('/counsellor-home');
            } else {
                toast.error(response.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating the profile');
        } finally {
            setIsSubmitting(false);
        }
    } else {
        toast.error('Please fix the errors in the form.');
    }
};

  return (
    <>
      <div className="container px-5 m-auto mt-5 ">
        <ToastContainer />
        <div className="row px-5 my-5 ">
          <div className="col-md-6 mt-5 d-flex align-items-center bg-purple border rounded justify-content-center">
          <div className='counsellor-edit-profile-icon-box p-3 text-center'>
                                    <div className="rounded-circle overflow-hidden" style={{ width: '380px', height: '380px', margin: '0 auto' }}>
                                        <img
                                            src={counsellorImg}
                                            alt='profile demo'
                                            className=' rounded-circle'
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = counsellorImg; 
                                            }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
            
          </div>
          <div className="col-md-6 mt-5 text-center align-self-start bg-creamy border rounded">
            <div className="row m-4 mt-0">
              <div className="col">
                <h3 className='fw-semibold theme-purple m-3'> Counsellors  Profile</h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name='name'
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Name"
                      value={counsellor.name}
                      onChange={handleChange}
                      aria-describedby="nameError"
                      required
                    />
                    {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <MdEmail />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email Id"
                      value={counsellor.email}
                      onChange={handleChange}
                      aria-describedby="emailError"
                      required
                    />
                    {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.contact ? 'is-invalid' : ''}`}
                      placeholder="Contact Number"
                      value={counsellor.contact}
                      onChange={handleChange}
                      aria-describedby="contactError"
                      required
                    />
                    {errors.contact && <div id="contactError" className="invalid-feedback">{errors.contact}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <CgOrganisation />
                    </span>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.experience ? 'is-invalid' : ''}`}
                      placeholder="Work Experience"
                      value={counsellor.experience}
                      onChange={handleChange}
                      aria-describedby="experienceError"
                      required
                    />
                    {errors.experience && <div id="experienceError" className="invalid-feedback">{errors.experience}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <People />
                    </span>
                    <input
                      type="text"
                      id="specialisation"
                      name="specialisation"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.specialisation ? 'is-invalid' : ''}`}
                      placeholder="Specialisation"
                      value={counsellor.specialisation}
                      onChange={handleChange}
                      aria-describedby="specialisationError"
                      required
                    />
                    {errors.specialisation && <div id="specialisationError" className="invalid-feedback">{errors.specialisation}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <IoLanguage />
                    </span>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.language ? 'is-invalid' : ''}`}
                      placeholder="Language"
                      value={counsellor.language}
                      onChange={handleChange}
                      aria-describedby="languageError"
                      required
                    />
                    {errors.language && <div id="languageError" className="invalid-feedback">{errors.language}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 mt-0 text-start">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaLocationDot />
                    </span>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.location ? 'is-invalid' : ''}`}
                      placeholder="Location"
                      value={counsellor.location}
                      onChange={handleChange}
                      aria-describedby="locationError"
                      required
                    />
                    {errors.location && <div id="locationError" className="invalid-feedback">{errors.location}</div>}
                  </div>
                </div>
              </div>
              <div className="row m-4 text-center mt-0">
                <div className="col">
                  <button type="submit" className="btn btn-lg bg-purple text-white border-0 text-center shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CounsellorEditProfile;
