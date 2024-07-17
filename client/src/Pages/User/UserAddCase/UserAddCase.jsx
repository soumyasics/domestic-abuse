import React, { useState } from 'react';
import './UserAddCase.css';
import { addCase } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function UserAddCase() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    return newErrors;
  };
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await addCase(formData,localStorage.getItem('userId'));
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          navigate('/user-home');
        } else {
          toast.error(response.message);
        }
  } catch (error) {
      console.error('Error Adding Cases', error);
      toast.error(error.response?.data?.message || 'failed to Add Issue. Please try again.');
  }
}
  };

  return (
    <div className='container-fluid'>
      <div className='row m-5'>
        <div className='col text-center'>
          <h3 className='theme-purple'>Add Case Details</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='row m-5 d-flex justify-content-center align-items-center'>
          <div className='col-6 bg-creamy py-5 px-0'>
            <div className='row m-5'>
              <div className='col-4 theme-purple text-center fs-5'>
                Case Title
              </div>
              <div className='col-8'>
                <input
                  id='title'
                  name='title'
                  type='text'
                  className='form-control form-control-lg'
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <div className='text-danger'>{errors.title}</div>}
              </div>
            </div>
            <div className='row m-5'>
              <div className='col-4 theme-purple text-center fs-5'>
                Description
              </div>
              <div className='col-8'>
                <textarea
                  id='description'
                  name='description'
                  className='form-control form-control-lg'
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && <div className='text-danger'>{errors.description}</div>}
              </div>
            </div>
            <div className='row m-5'>
              <div className='col-4 theme-purple text-center fs-5'>
                Location
              </div>
              <div className='col-8'>
                <input
                  id='location'
                  name='location'
                  type='text'
                  className='form-control form-control-lg'
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <div className='text-danger'>{errors.location}</div>}
              </div>
            </div>
            <div className='row m-5'>
              <div className='col-4 theme-purple text-center fs-5'>
                Date
              </div>
              <div className='col-8'>
                <input
                  id='date'
                  name='date'
                  type='date'
                  className='form-control form-control-lg'
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <div className='text-danger'>{errors.date}</div>}
              </div>
            </div>
            <div className='row m-5 mb-0'>
              <div className='col text-center'>
                <button type='submit' className='btn bg-purple text-white px-5'>
                  Add
                </button>
                {errors.form && <div className='text-danger mt-3'>{errors.form}</div>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserAddCase;
