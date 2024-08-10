import React, { useEffect, useState } from 'react';
import { getSuggestionById, fetchLegalReqss,IMG_BASE_URL, viewMySuggestionByIssueId, fetchHouseReqss, fetchCouncReqss } from '../../../Services/apiService';
import { RiMessage2Fill } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from "react-icons/fa";
import './UserViewSuggestionDetails.css';

function UserViewSuggestionDetails() {
  const [issue, setIssue] = useState({});
  const [datas, setDatas] = useState({
    approved:0,
    rejected:0,
    pending:0
  });
  const [houses, setHouses] = useState({
    approved:0,
    rejected:0,
    pending:0
  });
  const [couns, setCouns] = useState({
    approved:0,
    rejected:0,
    pending:0
  });
  const { id } = useParams();
  const [user, setUser] = useState({
    type: '',
    _id:'',
    description: '',
    severity: '',
    location: '',
    contact: '',
    dateTime: '',
    userId: {
      address: '',
      contact: '',
      dob: '',
      email: '',
      gender: '',
      relation: '',
      file: { filename: '' },
      safetyPlan: ''
    },

  });

  const [suggestion, setSuggestion] = useState({
    sug1: false,
    sug2: false,
    sug3: false,
    suppId:''
  });

  const fetchSuggestionsByIssues = async () => {
    try {
      const response = await viewMySuggestionByIssueId(id);
      console.log("Suggestions API response:", response.data);
      
      setSuggestion({
        sug1: response.data.sug1,
        sug2: response.data.sug2,
        sug3: response.data.sug3,
        suppId:response.data.supporterId._id?response.data.supporterId._id:''
      });
      console.log("Updated suggestion state:", {
        sug1: response.data.sug1,
        sug2: response.data.sug2,
        sug3: response.data.sug3
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Error fetching suggestions.');
    }
  };
  let st=datas.pending==1?'p':((datas.approved)==1?'a':'r')
  let stc=couns.pending==1?'p':((couns.approved)==1?'a':'r')

  const fetchSuggestions = async () => {
    try {
      const response = await getSuggestionById(id);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching the user data');
    }
  };
  
  const fetchLegalReqs = async () => {
    try {
      const response = await fetchLegalReqss(id);
      if (response.status === 200) {
       console.log("count",response);
       setDatas(response.data)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching the user data');
    }
  };
    
  const fetchHouseReqs = async () => {
    try {
      const response = await fetchHouseReqss(id);
      if (response.status === 200) {
       console.log("count",response);
       setHouses(response.data)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching the user data');
    }
  };
    
  const fetchCouncReqs = async () => {
    try {
      const response = await fetchCouncReqss(id);
      if (response.status === 200) {
       console.log("count",response);
       setCouns(response.data)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching the user data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSuggestions();
      await fetchSuggestionsByIssues();
      await fetchLegalReqs()
      await fetchCouncReqs()
      await fetchHouseReqs()
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log("sug1",suggestion);
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row m-5'>
        <div className='col'>
          <div className='col text-end'>
            <Link to={`/user-chat-supporter/${user._id}/${suggestion.suppId}`}><button className='btn bg-purple text-white rounded-4 p-3 py-1 fw-semibold'><span className='mx-2'><RiMessage2Fill size={30} /></span>Chat with Supporter</button></Link>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col m-5 border rounded'>
          <div className='row m-5'>
            <div className='col '>
              <h4 className='theme-purple  text-center '>User Issues</h4>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Type of Issue</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{user.type}</div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Location</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple '>{user.location}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Description</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{user.description}</div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Date</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{user?.dateTime?.slice(0, 10)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col fw-semibold'>Severity</div>
              </div>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col theme-purple'>{user.severity}</div>
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Time</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col theme-purple'>
                  <div className='col theme-purple'>{user?.dateTime?.slice(11, 16)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <div className='row m-2'>
                <div className='col'>
                  <div className='col fw-semibold'>Attachments</div>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col theme-purple'>
                  <a href={`${IMG_BASE_URL}/${user.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaDownload className='theme-purple mx-1' /> File</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col m-5 border rounded'>
          <div className='row m-5'>
            <div className='col'>
              <h2 className='theme-purple'>Supporter Suggestions</h2>
            </div>
          </div>
          {(suggestion.sug1)?(
            <>
          <div className='row mx-5 '>
            {console.log(suggestion)}
           
            {((datas.pending==0)&&(datas.approved==0)&&(datas.rejected==0))?'':(

            <div className='col text-end'>
              <span className='text-info m-2'>Status</span> 
              {datas.pending==1?<span className='m-2'>Pending </span>
               :datas.approved==1?<span className='m-2'>Approved </span>:
               <span className='m-2'>Rejected </span>
              }
             
            </div>)
}
          
          </div>
 
          <div className='row m-5 fw-semibold mt-0'>
            <div className='col text-white supporter-add-suggestion-box1 rounded-4 text-center p-2'>
              Meet an Advocate
            </div>
            {(datas.pending==0)&&(datas.approved!=1)?(
              <> 
               <div className='col text-center'>
               
             <Link to={`/user-view-all-legal-professionals/${user._id}`}> <button className='btn bg-purple text-white rounded-4 px-5'>Request</button></Link>
            </div>
            </>):('')
             }
              {((datas.pending==0)&&(datas.approved==0)&&(datas.rejected==0))?'':(
            <div className='col text-center'>
            <Link to={`/user-legal-professional-view-Status/${st}/${id}`}> 
               <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button></Link>
            </div>
            )}
         
          </div>
          </>):('')
}
{(suggestion.sug2)?(
            <>
            {console.log(houses)}
          <div className='row mx-5'>
            
          {((houses.pending==0)&&(houses.approved==0)&&(houses.rejected==0))?'':(
              <div className='col text-end'>
             

              <span className='text-info m-2'>Status</span> <span className='m-2'> 
              {houses.pending==1?<span className='m-2'>Pending </span>
               :houses.approved==1?<span className='m-2'>Approved </span>:
               <span className='m-2'>Rejected </span>
              }
              </span>

            </div>)
}
          </div>
         
          <div className='row m-5 fw-semibold mt-0'>
            <div className='col text-white supporter-add-suggestion-box2 rounded-4 text-center p-2'>
              Move to Safehouse
            </div>
            {(houses.pending==0||houses.rejected==1)?(
              <> 
            <div className='col text-center'>
            <Link to={`/user-view-safehouse-issue/${id}`}>   <button className='btn bg-purple text-white rounded-4 px-5'>Request</button></Link>
            </div>
            </>):('')
          }
                {((houses.pending==0)&&(houses.approved==0)&&(houses.rejected==0))?'':(
  <div className='col text-center'>
                          <Link to={`/user-view-safehouse-issue/${id}`}> 

            <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button>
            </Link> </div>
                )}
          </div>
          </>):('')
        }
            {(suggestion.sug3)?(
            <>
          <div className='row mx-5'>
          {((couns.pending==0)&&(couns.approved==0)&&(couns.rejected==0))?'':(
            <div className='col text-end'>
              <span className='text-info m-2'>Status</span> <span className='m-2'> 
              {couns.pending==1?<span className='m-2'>Pending </span>
               :couns.approved==1?<span className='m-2'>Approved </span>:
               <span className='m-2'>Rejected </span>
              }
              </span>
            </div>)}
          </div>
        
          <div className='row m-5 fw-semibold mt-0'>
           <div className='col text-white supporter-add-suggestion-box3 rounded-4 text-center p-2'>
              Meet a Counselor
            </div>
            {(couns.pending==0||couns.rejected==1)?(
              <> 
            <div className='col text-center'>
            
            <Link to={`/user-view-all-counsellors/${id}`}>   <button className='btn bg-purple text-white rounded-4 px-5'>Request</button></Link>
            </div>
            </>):('')
        }
                  {((couns.pending==0)&&(couns.approved==0)&&(couns.rejected==0))?'':(

            <div className='col text-center'>
               <Link to={`/user-view-all-counsellor-details-withIssue/${stc}/${id}`}> 
              <button className='btn bg-purple text-white rounded-4 px-5'>View Details</button>
              </Link>
            </div> 
                  )}
          </div>
          </>):('')
        }
        </div>
          
      </div>
    </div>
  )
}

export default UserViewSuggestionDetails