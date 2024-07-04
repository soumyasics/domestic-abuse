import React, { useState, useEffect } from 'react';
import './SupporterEditSafeHouse.css';
import safehouseImg from '../../../Assets/newhouse.jpeg';
import { FaHouse, FaLocationDot, FaCoins, FaList } from "react-icons/fa6";
import { MdNumbers, MdFamilyRestroom } from "react-icons/md";
import { FaPhoneAlt, FaCameraRetro } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { viewSafehouseById, editSafehouseById } from '../../../Services/apiService';
import { useLocation,useNavigate } from 'react-router-dom';

function SupporterEditSafeHouse() {
  const location = useLocation();
  const { safehouseId } = location.state || {};
  const [safehouse, setSafehouse] = useState({
    name: '',
    contact: '',
    landmark: '',
    licenseNo: '',
    capacity: '',
    image: null,
    rent: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchSafehouseData = async () => {
      try {
        const safehouseData = await viewSafehouseById(safehouseId);
        setSafehouse({
          name: safehouseData.name,
          contact: safehouseData.contact,
          landmark: safehouseData.landmark,
          licenseNo: safehouseData.licenseNo,
          capacity: safehouseData.capacity,
          rent: safehouseData.rent,
          description: safehouseData.description,
        });
      } catch (error) {
        console.error('Error fetching safe house data:', error);
      }
    };

    fetchSafehouseData();
  }, [safehouseId]);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const capacityRegex = /^[1-9][0-9]*$/;
    const rentRegex = /^[1-9]\d*$/;

    if (!safehouse.name) {
      newErrors.name = 'House Name is required';
    } else if (!nameRegex.test(safehouse.name)) {
      newErrors.name = 'House Name should only contain alphabets';
    }

    if (!safehouse.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!phoneRegex.test(safehouse.contact)) {
      newErrors.contact = 'Contact number should be 10 digits';
    }

    if (!safehouse.landmark) {
      newErrors.landmark = 'Landmark is required';
    }

    if (!safehouse.licenseNo) {
      newErrors.licenseNo = 'License Number is required';
    }

    if (!safehouse.capacity) {
      newErrors.capacity = 'Accommodation Capacity is required';
    } else if (!capacityRegex.test(safehouse.capacity)) {
      newErrors.capacity = 'Accommodation Capacity has to be a number and above 0';
    }

    if (safehouse.image && !['image/jpeg', 'image/png', 'image/gif'].includes(safehouse.image.type)) {
      newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
    }

    if (!safehouse.rent) {
      newErrors.rent = 'Monthly Rent is required';
    } else if (!rentRegex.test(safehouse.rent)) {
      newErrors.rent = 'Enter Valid Monthly Rent';
    }

    if (!safehouse.description) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSafehouse({
      ...safehouse,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSafehouse({
      ...safehouse,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateResponse = await editSafehouseById(safehouseId, safehouse);
      if (updateResponse.success) {
        toast.success('Safe house details updated successfully!');
        navigate('/supporter-view-all-safehouses');
      } else {
        toast.error('Failed to update safe house details. Please try again.');
      }
    } catch (error) {
      console.error('Error updating safe house', error);
      toast.error('Update failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container px-5 m-auto mt-5">
      <div className="row px-5 mt-5">
        <div className="col-md-6 my-5 d-flex">
          <img src={safehouseImg} className="align-self-center img-fluid object-fit-cover rounded" alt="safe house" />
        </div>
        <div className="col-md-6 mt-5 text-center align-self-start">
          <div className="row m-3 mt-0">
            <div className="col">
              <h2 className='fw-semibold theme-purple m-3'>Edit Safe House</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaHouse />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name='name'
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="House Name"
                    value={safehouse.name}
                    onChange={handleChange}
                    aria-describedby="nameError"
                    required
                  />
                  {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <label htmlFor="photo" className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">

                    <FaCameraRetro />
                    <span className="ms-2">Photo</span>

                  </label>
                  <input
                    type="file"
                    className={`form-control form-control-lg ${errors.image ? 'is-invalid' : ''}`}
                    id="inputGroupFile01"
                    onChange={handleImageChange}
                    aria-describedby="imageError"
                    required
                  />
                  {errors.image && <div id="imageError" className="invalid-feedback">{errors.image}</div>}
                </div>
              </div>
            </div>
      
            <div className="row m-3 mt-0 text-start">
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
                    placeholder="Contact"
                    value={safehouse.contact}
                    onChange={handleChange}
                    aria-describedby="contactError"
                    required
                  />
                  {errors.contact && <div id="contactError" className="invalid-feedback">{errors.contact}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaLocationDot />
                  </span>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.landmark ? 'is-invalid' : ''}`}
                    placeholder="Landmark"
                    value={safehouse.landmark}
                    onChange={handleChange}
                    aria-describedby="landmarkError"
                    required
                  />
                  {errors.landmark && <div id="landmarkError" className="invalid-feedback">{errors.landmark}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <CgOrganisation />
                  </span>
                  <input
                    type="text"
                    id="licenseNo"
                    name="licenseNo"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.licenseNo ? 'is-invalid' : ''}`}
                    placeholder="License Number"
                    value={safehouse.licenseNo}
                    onChange={handleChange}
                    aria-describedby="licenseNoError"
                    required
                  />
                  {errors.licenseNo && <div id="licenseNoError" className="invalid-feedback">{errors.licenseNo}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <MdNumbers />
                  </span>
                  <input
                    type="text"
                    id="capacity"
                    name="capacity"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.capacity ? 'is-invalid' : ''}`}
                    placeholder="Capacity"
                    value={safehouse.capacity}
                    onChange={handleChange}
                    aria-describedby="capacityError"
                    required
                  />
                  {errors.capacity && <div id="capacityError" className="invalid-feedback">{errors.capacity}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaCoins />
                  </span>
                  <input
                    type="text"
                    id="rent"
                    name="rent"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.rent ? 'is-invalid' : ''}`}
                    placeholder="Rent"
                    value={safehouse.rent}
                    onChange={handleChange}
                    aria-describedby="rentError"
                    required
                  />
                  {errors.rent && <div id="rentError" className="invalid-feedback">{errors.rent}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaList />
                  </span>
                  <textarea
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={safehouse.description}
                    onChange={handleChange}
                    rows="4"
                    aria-describedby="descriptionError"
                    required
                  ></textarea>
                  {errors.description && <div id="descriptionError" className="invalid-feedback">{errors.description}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-lg bg-purple text-white  mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Safe House'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupporterEditSafeHouse;
