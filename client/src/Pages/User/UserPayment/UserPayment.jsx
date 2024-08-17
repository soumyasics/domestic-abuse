import React, { useCallback, useEffect, useState } from 'react';
import './UserPayment.css';
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { addPaymentByUser, viewPaymentsByIdforUser } from '../../../Services/apiService';
import { toast } from 'react-toastify';

function UserPayment() {
    const [errors, setErrors] = useState({});
    const [paymentData, setpaymentData] = useState({
        payment: 0,
        
    });
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cv: ''
    });
    let formIsValid=true
const {id}=useParams()
const [loading, setLoading] = useState(true);

const fetchLegalProfessionals = useCallback(async () => {
    try {
      const response = await viewPaymentsByIdforUser(id);
      console.log(response.data);
      
      setpaymentData(response.data);
    } catch (error) {
      console.error('Error fetching legal professionals:', error);
      toast.error('Error fetching legal professionals.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegalProfessionals();
  }, [fetchLegalProfessionals]);

  const validateExpiryDate = () => {
    const { expiryMonth, expiryYear } = formValues;
    const currentDate = new Date();
    const selectedDate = new Date(`20${expiryYear}-${expiryMonth}-01`); // Construct the selected date as the 1st day of the month

    if (selectedDate < currentDate) {
        return false; // The selected date is in the past
    }
    return true; // The selected date is valid
};
    const validate = () => {
        const errors = {};
console.log("in validate");

        if (!formValues.cardNumber) {
            errors.cardNumber = "Card number is required";
            formIsValid=false
        } else if (formValues.cardNumber.length !== 16) {
            errors.cardNumber = "Card number must be 16 digits";
            formIsValid=false
        }

        if (!formValues.expiryMonth) {
            errors.expiryMonth = "Expiry month is required";
            formIsValid=false
        } else if (!/^(0[1-9]|1[0-2])$/.test(formValues.expiryMonth)) {
            formIsValid=false
            errors.expiryMonth = "Invalid month";
        }

        if (!formValues.expiryYear) {
            errors.expiryYear = "Expiry year is required";
            formIsValid=false
        } else if (!/^\d{2}$/.test(formValues.expiryYear)) {
            errors.expiryYear = "Invalid year";
            formIsValid=false
        }

        if (!formValues.cv) {
            errors.cv = "CVV code is required";
            formIsValid=false
        } else if (formValues.cv.length !== 3) {
            errors.cv = "CVV code must be 3 digits";
            formIsValid=false
        }
        if (!validateExpiryDate()) {
            errors.expiryMonth = "Expiration date cannot be in the past";
            errors.expiryYear = "Expiration date cannot be in the past";
            formIsValid = false;
        }
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
             
            setErrors(errors);
            if (!validate()) {
                toast.error('Please fix the errors in the form.');
                return;
            }
            const response = await addPaymentByUser(id);
            console.log(response);
            if (response.data.status === 200) {
                toast.success('Payment Successful', {
                    autoClose: 900, 
                  });

                  setTimeout(()=>{navigate('/user-view-payments')},1200)

            } else {
                toast.error('Payment failed.', {
                    autoClose: 900, 
                  });
            }
      
        } catch (error) {
            console.error('Error adding payment:', error.response || error.message || error);
            toast.error('Error Adding Payments.');
        }
    };


    return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='row m-5'>
                <div className='col w-50 border border-5 m-5'>
                    <div className='row border-bottom border-5 bg-creamy'>
                        <div className='col'>
                            <h3 className='opacity-50 px-5 py-3'>Payment Details</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='card user-payment-card m-5'>
                            <div className='row'>
                                <div className='col'>
                                    <h4 className='card-title m-3'>CARD NUMBER</h4>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            name='cardNumber'
                                            value={formValues.cardNumber}
                                            onChange={handleChange}
                                            className={`form-control shadow m-2 me-0 border ${errors.cardNumber ? 'is-invalid' : ''}`}
                                            placeholder='Valid Card Number'
                                        
                                        />
                                        <span className="input-group-text m-2 ms-0 shadow">
                                            <FaLock />
                                        </span>
                                        {errors.cardNumber && <div id="cardNumberError" className="invalid-feedback ms-2">{errors.cardNumber}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <h4 className='card-title m-3'>EXPIRY DATE</h4>
                                </div>
                                <div className='col text-center'>
                                    <h4 className='card-title m-3'>CVV CODE</h4>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col mb-5 ms-2'>
                                    <div className='input-group'>
                                        {/* <input
                                            type='text'
                                            name='expiryMonth'
                                            value={formValues.expiryMonth}
                                            onChange={handleChange}
                                            className={`form-control shadow m-2 border ${errors.expiryMonth ? 'is-invalid' : ''}`}
                                            placeholder='MM'
                                          
                                        /> */}
                                        <select
    name="expiryMonth"
    value={formValues.expiryMonth}
    onChange={handleChange}
    className={`form-control shadow m-2 border ${errors.expiryMonth ? 'is-invalid' : ''}`}
>
    <option value="" disabled>Select Month</option>
    <option value="01">January</option>
    <option value="02">February</option>
    <option value="03">March</option>
    <option value="04">April</option>
    <option value="05">May</option>
    <option value="06">June</option>
    <option value="07">July</option>
    <option value="08">August</option>
    <option value="09">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
</select>
{errors.expiryMonth && <div id="expiryMonthError" className="invalid-feedback ms-2">{errors.expiryMonth}</div>}

                                    </div>
                                </div>
                                <div className='col mb-5'>
                                    <div className='input-group'>
                                        {/* <input
                                            type='text'
                                            name='expiryYear'
                                            value={formValues.expiryYear}
                                            onChange={handleChange}
                                            className={`form-control shadow m-2 border ${errors.expiryYear ? 'is-invalid' : ''}`}
                                            placeholder='YY'
                                         
                                        /> */}
                                        <select
    name="expiryYear"
    value={formValues.expiryYear}
    onChange={handleChange}
    className={`form-control shadow m-2 border ${errors.expiryYear ? 'is-invalid' : ''}`}
>
    <option value="" disabled>Select Year</option>
    {[...Array(15)].map((_, index) => {
        const year = new Date().getFullYear() + index;
        return (
            <option key={year} value={String(year).slice(-2)}>
                {year}
            </option>
        );
    })}
</select>
                                        {errors.expiryYear && <div id="expiryYearError" className="invalid-feedback ms-2">{errors.expiryYear}</div>}
                                    </div>
                                </div>
                                <div className='col mb-5 me-2'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            name='cv'
                                            value={formValues.cv}
                                            onChange={handleChange}
                                            className={`form-control shadow m-2 border ${errors.cv ? 'is-invalid' : ''}`}
                                            placeholder='CVV'
                                         
                                        />
                                        {errors.cv && <div id="cvError" className="invalid-feedback ms-2">{errors.cv}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row m-5 mb-1 user-payment-final-payment text-center rounded-2'>
                            <div className='col'>
                                <h3 className='text-white text-end d-inline-block py-2 ms-5'>Payable Amount </h3>
                                <span className='bg-white rounded-4 px-2 m-3 theme-purple float-end'> &#8377;{paymentData.payment}</span>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col d-grid gap-2'>
                                <button type='submit' className='fs-5 user-payment-pay text-white btn mx-5'>Pay</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPayment;
