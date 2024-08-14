import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserLegalProfessionalDetails.css';
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL, fetchHouseStatusByIssueId, fetchLegalStatusByIssueId, getLegalProfessionalById, sendRequesttoLP } from '../../../Services/apiService';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFile } from "react-icons/fa";
import demo from '../../../Assets/supp-edit-profile.png';
function UserViewSafeHouseStatus() {
  
  // const { st} = useParams();
  const { st,id } = useParams();
      
  const [legalProfessional, setLegalProfessional] = useState({
    name: '',
    landmark: '',
    contact: '',
    rent: '',
    description: '',
    suppName: '',

    image: null,
});
const [data, setData] = useState([])

const [imagePreview, setImagePreview] = useState(demo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLegalProfessionalData = async () => {
      if (id) {
        try {
          const legalProfessionalData = await fetchHouseStatusByIssueId(id);
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
          <h3 className='text-center theme-purple fw-bold'>Safe House Details</h3>
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
                src={x.houseId.image && x.houseId.image.filename ? `${IMG_BASE_URL}/${x.houseId.image.filename}` : demoLegalProfessional}
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
                {x.houseId.name}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Email Id:
              </div>
              <div className='col-6 text-secondary'>
                {x.houseId.contact}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact No:
              </div>
              <div className='col-6 text-secondary'>
                {x.houseId.contact}
              </div>
            </div>
            
            <div className='row border-bottom m-5'>
              <div className='col-6'>
              Supporter Name:
              </div>
              <div className='col-6 text-secondary'>
                {x.suppId.name}
              </div>
            </div>
            
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                District:
              </div>
              <div className='col-6 text-secondary'>
                {x.houseId.landmark}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Description:
              </div>
              <div className='col-6 text-secondary'>
                {x.houseId.description}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Rent:
              </div>
              <div className='col-6 text-secondary'>
                {x.houseId.rent}
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
        <p>Loading Safe House Details..</p>
      )}
    </div>
  );
}

export default UserViewSafeHouseStatus