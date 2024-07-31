import React, { useCallback, useEffect, useState } from 'react';
import './UserAddCase.css';
import { addCase, getIssueById, viewCaseByissueId } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import '../../Counsellor/CounsellorAppointmentRequests/CounsellorAppointmentRequests.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
function UserAddCase() {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: `case-${id.slice(20, 24).toUpperCase()}`,
    description: '',
    status: 'Trial',
    date: '',
  });


  const [errors, setErrors] = useState({});
  const [caseDetails, setCaseDetails] = useState([])

  const validate = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.status) newErrors.location = 'Status is required';
    if (!formData.date) newErrors.date = 'Date is required';
    return newErrors;
  };
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [loading, setLoading] = useState(true);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log(formData);
        const response = await addCase(formData,id);
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          navigate('/legal-professional-home');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error Adding Cases', error);
        toast.error(error.response?.data?.message || 'failed to Add Issue. Please try again.');
      }
    }
  };


  const fetchCaseDetails = useCallback(async () => {
    try {
      const response = await viewCaseByissueId(id);
      setCaseDetails(response.data || []);
      console.log("case da",response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching case details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("in 2");
    fetchCaseDetails();
  }, []);
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
                Case Number
              </div>
              <div className='col-8'>
                <input
                  id='title'
                  name='title'
                  type='text'
                  className='form-control form-control-lg'
                  placeholder={`case-${id.slice(20, 24).toUpperCase()}`}
                  disabled
                />
                {errors.title && <div className='text-danger'>{errors.title}</div>}
              </div>
            </div>
            <div className='row m-5'>
              <div className='col-4 theme-purple text-center fs-5'>
                Status
              </div>
              <div className='col-8'>
                <select
                  id='status'  // Changed to 'status' to match the name attribute
                  name='status'
                  className='form-control form-control-lg'
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value='trial'>Trial</option>
                  <option value='open'>Open</option>
                  <option value='final judgement'>Final Judgement</option>
                </select>

                {errors.status && <div className='text-danger'>{errors.status}</div>}
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

      <Table striped bordered hover className="appointments-table">
                    <thead>
                      <tr className="text-center">
                        <th className='bg-purple text-white'>#</th>
                        <th className='bg-purple text-white'>Case No</th>
                        <th className='bg-purple text-white'>Case Status</th>
                        <th className='bg-purple text-white'>Date</th>
                        <th className='bg-purple text-white'>Description</th>
                        
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {
                        caseDetails&&caseDetails.length>0?(
                      caseDetails.map((appointment, index) => {
                        return (
                          <tr key={appointment._id}>
                            <td>{++index}</td>
                            <td>{appointment.title}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.date.slice(0,10)}</td>
                            <td>{appointment.description}</td>
                          
                          </tr>
                        )
                      })
                    ):(<p></p>)
                  }
                    </tbody>
                  </Table>
    </div>
  );
}

export default UserAddCase;
