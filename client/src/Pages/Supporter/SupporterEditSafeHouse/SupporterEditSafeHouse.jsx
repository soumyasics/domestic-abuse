import React, { useState } from 'react';
import './SupporterEditSafeHouse.css';
import safehouseImg from '../../../Assets/newhouse.jpeg';
import { FaHouse, FaLocationDot, FaCoins, FaList } from "react-icons/fa6";
import { MdNumbers, MdFamilyRestroom } from "react-icons/md";
import { FaPhoneAlt, FaCameraRetro } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupporterEditSafeHouse() {
  const [safehouse, setSafehouse] = useState({
    houseName: '',
    address: '',
    contact: '',
    landmark: '',
    licenseNo: '',
    accommodationCapacity: '',
    image: null,
    monthlyRent: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const capacityRegex = /^[1-9][0-9]*$/;
    const rentRegex = /^\$?[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$/;

    if (!safehouse.houseName) {
      newErrors.houseName = 'House Name is required';
    } else if (!nameRegex.test(safehouse.houseName)) {
      newErrors.houseName = 'House Name should only contain alphabets';
    }

    if (!safehouse.address) {
      newErrors.address = 'Address is required';
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

    if (!safehouse.accommodationCapacity) {
      newErrors.accommodationCapacity = 'Accommodation Capacity is required';
    } else if (!capacityRegex.test(safehouse.accommodationCapacity)) {
      newErrors.accommodationCapacity = 'Accommodation Capacity has to be a number and above 0';
    }

    if (!safehouse.image) {
      newErrors.image = 'Image is required';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(safehouse.image.type)) {
      newErrors.image = 'Only image files (jpeg, png, gif) are allowed';
    }

    if (!safehouse.monthlyRent) {
      newErrors.monthlyRent = 'Monthly Rent is required';
    } else if (!rentRegex.test(safehouse.monthlyRent)) {
      newErrors.monthlyRent = 'Enter Valid Monthly Rent';
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
      // Add your API call here
      toast.success('Safe house details updated successfully!');
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
                    id="houseName"
                    name='houseName'
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.houseName ? 'is-invalid' : ''}`}
                    placeholder="House Name"
                    value={safehouse.houseName}
                    onChange={handleChange}
                    aria-describedby="houseNameError"
                    required
                  />
                  {errors.houseName && <div id="houseNameError" className="invalid-feedback">{errors.houseName}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaCameraRetro />
                  </span>
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
                    <FaLocationDot />
                  </span>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.address ? 'is-invalid' : ''}`}
                    placeholder="Address"
                    value={safehouse.address}
                    onChange={handleChange}
                    aria-describedby="addressError"
                    required
                  />
                  {errors.address && <div id="addressError" className="invalid-feedback">{errors.address}</div>}
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
                    <CgOrganisation />
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
                    <MdNumbers />
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
                    <MdFamilyRestroom />
                  </span>
                  <input
                    type="text"
                    id="accommodationCapacity"
                    name="accommodationCapacity"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.accommodationCapacity ? 'is-invalid' : ''}`}
                    placeholder="Accommodation Capacity"
                    value={safehouse.accommodationCapacity}
                    onChange={handleChange}
                    aria-describedby="accommodationCapacityError"
                    required
                  />
                  {errors.accommodationCapacity && <div id="accommodationCapacityError" className="invalid-feedback">{errors.accommodationCapacity}</div>}
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
                    id="monthlyRent"
                    name="monthlyRent"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.monthlyRent ? 'is-invalid' : ''}`}
                    placeholder="Monthly Rent"
                    value={safehouse.monthlyRent}
                    onChange={handleChange}
                    aria-describedby="monthlyRentError"
                    required
                  />
                  {errors.monthlyRent && <div id="monthlyRentError" className="invalid-feedback">{errors.monthlyRent}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0 text-start">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text home-card-bg border-end-0 rounded-start-2 bg-purple text-white">
                    <FaList />
                  </span>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className={`form-control form-control-lg border border-start-0 home-card-bg rounded-end-2 ${errors.description ? 'is-invalid' : ''}`}
                    placeholder="Description"
                    value={safehouse.description}
                    onChange={handleChange}
                    aria-describedby="descriptionError"
                    required
                  />
                  {errors.description && <div id="descriptionError" className="invalid-feedback">{errors.description}</div>}
                </div>
              </div>
            </div>
            <div className="row m-3 mt-0">
              <div className="col text-center">
                <button type="submit" className="btn bg-theme btn-lg fw-bolder px-5 text-white rounded-pill" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
