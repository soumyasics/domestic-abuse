import React, { useEffect, useState } from 'react';
import './SupporterAddSuggestion.css';
import { FaDownload } from "react-icons/fa";
import { addSuggestions, getSuggestionById, IMG_BASE_URL } from '../../../Services/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SupporterAddSuggestion() {
  const navigate=useNavigate()
  console.log("pp",localStorage.getItem('supporterId'));
  
  const {id}=useParams()
  const [user, setUser] = useState({
    type: '',
    description: '',
    severity: '',
    location: '',
    contact: '',
    dateTime: '',
    userId:{
      
      address:'',
      contact:'',
      dob:'',
      email:'',
      gender:'',
            relation:'',
    file:{filename:''},
      aadhar:''
      
    }
  });

  const [issue, setIssue] = useState({
   
  });

  const [suggestion, setSuggestion] = useState({
   
    supporterId:localStorage.getItem('supporterId'),
    issueId:id,
    sug1:false,
    sug2: false,
    sug3: false
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
   
            try {
                const response = await getSuggestionById(id);
                if (response.status === 200) {
                    setUser(response.data);
                    // setImagePreview(response.data.photo ? `${IMG_BASE_URL}/${response.data.photo.filename}` : demo);
                } else {
                   console.log(response);
                }
            } catch (error) {
                console.error('Error fetching legal professional data:', error);
                toast.error('An error occurred while fetching the legal professional data');
            }
        
    };

    fetchSuggestions();
}, []);


useEffect(() => {
  console.log("user",user);
})
const handleSuggestionChange = (event) => {
  const { name, checked } = event.target;

  setSuggestion(prevState => ({
      ...prevState,
      [name]: checked
  }));
};
const navtoHome=()=>{
  navigate('/supporter-home')
}
  const handleSubmit =async (event) => {
    event.preventDefault();
    // Here you can add the logic to save the suggestion to the backend
    console.log(suggestion);
    try {
      const response = await addSuggestions(suggestion);
      console.log('Fetch supporter response:', response);
      if (response.success) {
        toast.success("Suggestion Send Successfully")
        setTimeout(navtoHome,700)

      } else {
          toast.error('not found');
      }
  } catch (error) {
      console.error('Error fetching supporter data:', error);
      toast.error('An error occurred while fetching the supporter data');
  }
  };

  return (
    <div className='container-fluid mb-5'>
      <div className='row m-5'>
        <div className='col'>
          <h3 className='text-center theme-purple'>User Suggestions</h3>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col'>
          <div className='card bg-creamy'>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h4 className='theme-purple text-decoration-underline text-center card-title'>User Details</h4>
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Name</div>
                <div className='col theme-purple'>{user?.userId?.name}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Email Id</div>
                <div className='col theme-purple'>{user?.userId?.email}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Date of Birth</div>
                <div className='col theme-purple'>{user?.userId?.dob}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Gender</div>
                <div className='col theme-purple'>{user?.userId?.gender}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Aadhar Number</div>
                <div className='col theme-purple'>{user?.userId?.aadhar}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Contact No</div>
                <div className='col theme-purple'>{user?.userId?.contact}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Address</div>
                <div className='col theme-purple card-text'>{user?.userId?.address}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Relationship to Abuser</div>
                <div className='col theme-purple'>{user?.userId?.relation}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card bg-creamy'>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h4 className='theme-purple text-decoration-underline text-center card-title'>User Issues</h4>
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Type of Issue</div>
                <div className='col theme-purple'>{user?.type}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Description</div>
                <div className='col theme-purple'>{user?.description}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Severity</div>
                <div className='col theme-purple'>{user?.severity}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Attachments</div>
                <div className='col theme-purple'>
                  <a href={`${IMG_BASE_URL}/${user?.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a>
                </div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Location</div>
                <div className='col theme-purple card-text'>{user?.location}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Contact No</div>
                <div className='col theme-purple'>{user?.contact}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Date</div>
                <div className='col theme-purple'>{user?.dateTime.slice(0, 10)}</div>
              </div>
              <div className='row border-bottom m-3 card-text'>
                <div className='col'>Time</div>
                <div className='col theme-purple'>{user?.dateTime.slice(11,16)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col'>
          <h3 className='theme-purple'>Add a Suggestion</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate className='text-white'>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box1 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="meetAdvocate"
                name="sug1"
                checked={suggestion.sug1}
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="meetAdvocate">
                Meet an Advocate
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box2 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="moveToSafehouse"
                name="sug2"
                checked={suggestion.sug2}
               
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="moveToSafehouse">
                Move to Safehouse
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 my-3'>
          <div className='col-6 supporter-add-suggestion-box3 rounded-2 p-1 ps-0'>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="meetCounsellor"
                name="sug3"
                checked={suggestion.sug3}
                
                onChange={handleSuggestionChange}
              />
              <label className="form-check-label" htmlFor="meetCounsellor">
                Meet a Counsellor
              </label>
            </div>
          </div>
        </div>
        <div className='row m-5 opacity-75'>
          <div className='col text-center'>
            <button type="submit" className="btn bg-purple text-white rounded-4 px-5">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SupporterAddSuggestion;
