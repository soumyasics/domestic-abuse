import React, { useState, useEffect } from 'react';
import './UserEditProfile.css';
import userImg from '../../../Assets/user-register.png';
import { People } from 'react-bootstrap-icons';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaCalendarAlt, FaVenusMars, FaHome, FaUsers } from "react-icons/fa";
import { PiPencilDuotone } from "react-icons/pi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser ,IMG_BASE_URL} from '../../../Services/apiService';
import demo from '../../../Assets/supp-edit-profile.png';

function UserEditProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    dob: '',
    gender: '',
    address: '',
    relation: '',
    aadhar: '',
    image: {filename:''},
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userId  = localStorage.getItem('userId')

  const [imagePreview, setImagePreview] = useState(demo);
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!user.name) {
      newErrors.name = 'Name is required';
      console.log("in name");
    } else if (!nameRegex.test(user.name)) {
      newErrors.name = 'Name should only contain alphabets';
      console.log("in name");

    }

    if (!user.email) {
      newErrors.email = 'Email is required';
      console.log("in em");
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = 'Invalid email format';
      console.log("in en");
    }

    if (!user.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(user.contact)) {
      newErrors.contact = 'Contact number should be 10 digits'; console.log("in con");
    }

   

    if (!user.dob) {
      newErrors.dob = 'Date of Birth is required';
    }

    if (!user.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!user.address) {
      newErrors.address = 'Address is required';
    }

    if (!user.relation) {
      newErrors.relation = 'Relationship to the abuser is required';
    }

    if (!user.aadhar) {
      newErrors.aadhar = 'Aadhar number is required';
    }

    if (user.image && !['image/jpeg', 'image/png', 'image/gif'].includes(user.image.type)) {
      // newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
      console.log("in im");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        if (response.success) {
          const formattedDob = response.user.dob ? formatDate(response.user.dob) : '';
          setUser({ ...response.user, dob: formattedDob });
          console.log("data",response.user);
          
          setImagePreview(response.user.image.filename ? `${IMG_BASE_URL}/${response.user.image.filename}` : demo);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Error fetching user data. Please try again.');
      }
    };
  

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // if(file)
    // setUser({
    //   ...user,
    //   image: file,
    // });


     const file1 = e.target.files[0];
      setUser({
      ...user,
      image: file,
    });
          if (file1) {
            
                 user.image=file
          
              const reader = new FileReader();
              reader.onloadend = () => {
                  setImagePreview(reader.result);
              };
              reader.readAsDataURL(file1);
          
  };


}
const navtoHome=()=>{
  navigate('/user-home');
}
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) {
  //     toast.error('Please fix the errors in the form.');
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const response = await updateUser(userId, user); 
  //     if (response.success) {
  //       toast.success(response.message);
  //       console.log('ggg');
        
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     console.error('Error updating user', error);
  //     toast.error(error.response?.data?.message || 'Update failed. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
  
    setIsSubmitting(true);
    
    // Create a new FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('contact', user.contact);
    formData.append('dob', user.dob);
    formData.append('gender', user.gender);
    formData.append('address', user.address);
    formData.append('relation', user.relation);
    formData.append('aadhar', user.aadhar);
    if (user.image && user.image instanceof File) {
      formData.append('image', user.image);
    }
  
    try {
      const response = await updateUser(userId, formData);
      console.log("resp",response);
      
      if (response.success) {
        toast.success(response.message, {
          autoClose: 500, 
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error updating user', error);
      toast.error(error.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
    {console.log(user.name)}
      <div className="container px-5 m-auto my-5  bg-creamy text-center">
        <ToastContainer/>
        <div className='row  m-5'>
          <div className='col'>
            <h3 className='theme-purple m-5 mb-0'>User Profile</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className='row align-items-center justify-content-center'>
            <div className='col '>
              <div className='row align-items-center justify-content-center bg-purple m-5 mt-0'>
                <div className='col-auto m-4 mt-3 '>
                  <div className='legal-professional-edit-profile-border-box p-3 position-relative'>
                    <div className="rounded-circle overflow-hidden" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                      <img
                        src={imagePreview}
                        alt='profile demo'
                        className='img-fluid rounded-circle'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = userImg;
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className='rounded-circle bg-white supporter-edit-profile-icon-box border-light position-absolute cursor-pointer'>
                      <label htmlFor="imageUpload" className="image-upload-label">
                        <PiPencilDuotone color={'#59244C'} size={40} />
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        className="image-upload-input "
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row m-4 mt-0'>
                <div className='col'>
                  <div className="input-group">
                    <div className="input-group">
                      <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                        <People />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name='name'
                        className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        aria-describedby="nameError"
                        required
                      />
                      {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                    </div>
                  </div>
                </div>
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
                      placeholder="Email"
                      value={user.email}
                      onChange={handleChange}
                      aria-describedby="emailError"
                      required
                    />
                    {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
              </div>
              <div className='row m-4 mt-0'>
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
                      value={user.contact}
                      onChange={handleChange}
                      aria-describedby="contactError"
                      required
                    />
                    {errors.contact && <div id="contactError" className="invalid-feedback">{errors.contact}</div>}
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaCalendarAlt />
                    </span>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.dob ? 'is-invalid' : ''}`}
                      placeholder="Date of Birth"
                      value={user.dob}
                      onChange={handleChange}
                      aria-describedby="dobError"
                      required
                    />
                    {errors.dob && <div id="dobError" className="invalid-feedback">{errors.dob}</div>}
                  </div>
                </div>
              </div>
              <div className='row m-4 mt-0'>
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaVenusMars />
                    </span>
                    <select
                      id="gender"
                      name="gender"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.gender ? 'is-invalid' : ''}`}
                      value={user.gender}
                      onChange={handleChange}
                      aria-describedby="genderError"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div id="genderError" className="invalid-feedback">{errors.gender}</div>}
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaHome />
                    </span>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="Address"
                      value={user.address}
                      onChange={handleChange}
                      aria-describedby="addressError"
                      required
                    />
                    {errors.address && <div id="addressError" className="invalid-feedback">{errors.address}</div>}
                  </div>
                </div>
              </div>
              <div className='row m-4 mt-0'>
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                      <FaUsers />
                    </span>
                    <input
                      type="text"
                      id="relation"
                      name="relation"
                      className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.relation ? 'is-invalid' : ''}`}
                      placeholder="Relationship to Abuser"
                      value={user.relation}
                      onChange={handleChange}
                      aria-describedby="relationError"
                      required
                    />
                    {errors.relation && <div id="relationError" className="invalid-feedback">{errors.relation}</div>}
                  </div>
                </div>
              </div>
              <div className='row m-4 '>
                <div className="col text-end">
                  <button
                    type="submit"
                    className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-4 m-4"
                    disabled={isSubmitting}
                  >
                 Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserEditProfile;
