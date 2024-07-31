import { addPayment, IMG_BASE_URL, viewPaymentsByappId } from '../../../Services/apiService';
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../../Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests.css';
import { viewCounsellorAppointments, acceptAppointmentById, rejectAppointmentById, acceptCouncAppointmentById, rejectCouncAppointmentById, viewLPAppointments, acceptLPAppointmentById, rejectLPAppointmentById, viewLPAprvdAppointments } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import { Link, useParams,useNavigate } from 'react-router-dom';

function LegalProfessionalAddPayment() {
    const{id}=useParams()
    const [loading, setLoading] = useState(true);

    const [formValues, setFormValues] = useState({
        lpId:localStorage.getItem('lpId'),
        payment: '',
        category: '',
        appId: id,

    });
    const [appointments, setAppointments] = useState([]);
  
  
    const fetchAppointments = useCallback(async () => {
      try {
        const response = await viewPaymentsByappId(id);
        setAppointments(response.data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Error fetching appointment requests.');
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAppointments();
    }, [fetchAppointments]);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const errors = {};

        if (!formValues.payment) {
            errors.payment = "payment  is required";
        }

        if (!formValues.category) {
            errors.category = "category is required";
        }

       

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
       
            setFormValues({ ...formValues, [name]: value });
        
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("vla",validate());
        if (!validate()) {
         
              toast.error('Please fix the errors in the form.');
              return;
            }
        
            setIsSubmitting(true);
            try {
              const response = await addPayment(formValues);
              if (response.success) {
                toast.success('Payment requested successfully!');
            
        
                // Reset form or perform additional actions on success
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              console.error('Error Registering Blog', error);
              toast.error('Registration failed. Please try again.');
            } finally {
              setIsSubmitting(false);
            }            console.log("Blog added successfully", formValues);
        }
  return (
    <div>

<form onSubmit={handleSubmit} noValidate>
    
       payment: <input type="text" name="payment" onChange={handleChange}/>
      Category:  <input type="text" name="category" onChange={handleChange}/>
      <div className='col-4 text-end'>
                            <button type='submit' className='btn text-white bg-purple py-2 px-5 '>Add Payment</button>
                        </div>
</form>


{
appointments.length === 0 ? (
                <p className="m-5 text-center fs-1 theme-purple">No new entries</p>
              ) : (
                <>
                  <Table striped bordered hover className="appointments-table">
                    <thead>
                      <tr className="text-center">
                        <th className='bg-purple text-white'>#</th>
                        <th className='bg-purple text-white'>User Name</th>
                        <th className='bg-purple text-white'>Contact Number</th>
                        <th className='bg-purple text-white'>Payment Date</th>
                        <th className='bg-purple text-white'>Amount</th>
                        <th className='bg-purple text-white'>Category</th>
                        <th className='bg-purple text-white'>Status</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {appointments.map((appointment, index) => {
                        return (
                          <tr key={appointment._id}>
                            <td>{index + 1 }</td>
                            <td>{appointment.userId.name}</td>
                            <td>{appointment.userId.contact}</td>
                            <td>{appointment.date.slice(0,10)}</td>
                            <td>{appointment.payment}</td>
                            <td>{appointment.category}</td>
                            <td>{appointment.paymentStatus}</td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
               
                </>
              )}

    </div>
  )
}

export default LegalProfessionalAddPayment