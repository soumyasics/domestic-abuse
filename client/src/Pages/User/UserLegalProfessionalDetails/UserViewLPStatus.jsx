import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserLegalProfessionalDetails.css';
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL, fetchLegalStatusByIssueId, getLegalProfessionalById, sendRequesttoLP } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFile } from "react-icons/fa";
import demo from '../../../Assets/supp-edit-profile.png';
function UserViewLPStatus() {
   
  // const { st} = useParams();
      const { st,id } = useParams();
      
      const [legalProfessional, setLegalProfessional] = useState({
        name: '',
        email: '',
        contact: '',
        barAssociationId: '',
        firmName: '',
        licenseNumber: '',
        photo: null,
        proof: null,
    });
    const [data, setData] = useState([])

    const [imagePreview, setImagePreview] = useState(demo);
      const navigate = useNavigate();
    
      useEffect(() => {
        const fetchLegalProfessionalData = async () => {
          if (id) {
            try {
              const legalProfessionalData = await fetchLegalStatusByIssueId(id);
              setData(legalProfessionalData.data);
              console.log(legalProfessionalData.data);
            } catch (error) {
              console.error('Failed to fetch legal professional data:', error);
            }
          }
        };
        fetchLegalProfessionalData();
        console.log("st",st);

      }, [id]);
    
   
      const handleCancel = () => {
        toast.info('Request cancelled.');
        // Implement cancel logic here
      };
    
      return (
        <div className='container'>
          <ToastContainer />
          <div className='row m-5'>
            <div className='col'>
              <h3 className='text-center theme-purple fw-bold'>Legal Professional Details</h3>
            </div>
          </div>
          {console.log("daa",data)}
          {data.length>0 ? (
            data.map(x=>{
return(
           
            <div className='row theme-purple m-5'>
              <div className='col text-center bg-purple d-flex'>
                <div className="rounded-circle overflow-hidden m-auto" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                  <img
                    src={x.lpId.photo && x.lpId.photo.filename ? `${IMG_BASE_URL}/${x.lpId.photo.filename}` : demoLegalProfessional}
                    alt='Legal Professional'
                    className='img-fluid '
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = demoLegalProfessional;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='col fs-6 border rounded bg-creamy'>
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Name:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.name}
                  </div>
                </div>
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Email Id:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.email}
                  </div>
                </div>
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Contact No:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.contact}
                  </div>
                </div>
                
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Firm Name:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.firmName}
                  </div>
                </div>
                
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    License Number:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.licenseNumber}
                  </div>
                </div>
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Bar Association ID:
                  </div>
                  <div className='col-6 text-secondary'>
                    {x.lpId.barAssociationId}
                  </div>
                </div>
              
                <div className='row border-bottom m-5'>
                  <div className='col-6'>
                    Status:
                  </div>
                  <div className='col-6 text-secondary'>
               {(st=='p')?<span>Pending</span>:(st=='a')?<span>Approved</span>:<span>Rejected</span>}
                  </div>
                </div>
              </div>
            </div>
)
            })
          ) : (
            <p>Loading legal professional data...</p>
          )}
        </div>
      );
    }
    
    

export default UserViewLPStatus