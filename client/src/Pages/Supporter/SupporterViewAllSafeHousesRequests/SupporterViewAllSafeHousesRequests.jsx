import React, { useState, useEffect } from 'react';
import './SupporterViewAllSafeHousesRequests.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { viewSafehouses,rejectSafehouseById, viewSafehousesBySupporterId, viewSafehousesReqsBySupporterId, rejectHouseReqsById, approveCounsellorsById, approveHouseReqsById, viewapproveReqBySuppId } from '../../../Services/apiService'; 
import { Link,useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEye } from "react-icons/bs";

function SupporterViewAllSafeHousesRequests() {
  const [safehouses, setSafehouses] = useState([]);
  const [apsafehouses, setApSafehouses] = useState([]);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;
  const navigate=useNavigate();

  const fetchSafehouses = async () => {
    try {
      const response = await viewSafehousesReqsBySupporterId(localStorage.getItem('supporterId'));
      console.log(response);
      console.log(
        "ppp",response.data.data
      );
      if (response.data.status === 200) {
        setSafehouses(response.data.data);
      } else {
        setSafehouses([])
        console.error('Failed to fetch safehouses:', response.msg);
      }
    } catch (error) {
      console.error('Error fetching safehouses:', error);
    }
  };
  
  const fetchApSafehouses = async () => {
    try {
      const response = await viewapproveReqBySuppId(localStorage.getItem('supporterId'));
      console.log(response);
      console.log(
        "qqq",response.data.data
      );
      if (response.data.status === 200) {
        setApSafehouses(response.data.data);
      } else {
        setApSafehouses([])
        console.error('Failed to fetch safehouses:', response.msg);
      }
    } catch (error) {
      console.error('Error fetching safehouses:', error);
    }
  };
  useEffect(() => {
    fetchSafehouses();
    fetchApSafehouses()
    console.log(safehouses);
  }, []); // Empty dependency array ensures it runs only once on component mount



  const handleReject = async (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this Request?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectHouseReqsById(id);
              if (response.success) {
                toast.success('Request rejected successfully.');
                fetchSafehouses(currentPage);
              } else {

                toast.error(response.message || 'Error rejecting Request.');
              }
            } catch (error) {
              toast.error('Error rejecting Request.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  
  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this Request?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveHouseReqsById(id);
              console.log(response);
              if (response.success) {
                toast.success('Request approved successfully.');
                fetchSafehouses(currentPage);
              } else {
                toast.error(response.message || 'Error approving Request.');
              }
            } catch (error) {
              toast.error('Error approving Request.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  // Pagination logic
  const offset = currentPage * safehousesPerPage;
  // const currentSafehouses = safehouses?.length>0?(safehouses.slice(offset, offset + safehousesPerPage)):0;
  // const pageCount = Math.ceil(safehouses.length / safehousesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container-fluid m-auto'>
      <div className='row m-5 mt-5 mb-2'>
        <div className='col'>
          {/* <h4 className='theme-purple'>Safe House Details</h4> */}
          {/* <h5  style={{marginLeft:'915px',color:'purple'}}>Approved Details</h5> */}
          
        </div>
        <div className='col text-end'>
        </div>
      </div>
      <div className='table-responsive m-5 mt-5'>
      {safehouses&&safehouses.length>0?(
        <> 
         <Table bordered hover className="supporters-table view-all-safehouse-theme-table-body">
          <thead>
            <tr className="text-center">
              <th className='view-all-safehouse-theme text-white'>SI.No</th>
              <th className='view-all-safehouse-theme text-white'>Name</th>
                <th className='view-all-safehouse-theme text-white'>Email-Id</th>
                <th className='view-all-safehouse-theme text-white'>Contact Number</th>
                <th className='view-all-safehouse-theme text-white'>Gender</th>
                <th className='view-all-safehouse-theme text-white'>Address</th>
              <th className='view-all-safehouse-theme text-white'>Status</th>
              <th className='view-all-safehouse-theme text-white'>Action</th>

            </tr>
          </thead>
          <tbody className='text-center'>
            {safehouses&&safehouses.map((user, index) => (
              <tr key={user._id} className='view-all-safehouse-theme-table-body'>
                 <td className='p-2'>{index+1}</td> 
                <td>{user.userId.name}</td>
                  <td>{user.userId.email}</td>
                  <td>{user.userId.contact}</td>
                  <td>{user.userId.gender}</td>
                  <td>{user.userId.address}</td>
                <td className='p-2'>{user.adminApproved?'Approved':'Pending'}</td>
                <td className=''>
                    <div className='text-center'>
                      {/* <i className="m-3 cursor-pointer" onClick={()=>{navigateToInd(counsellor._id)}}><BsEye size={22} /></i> */}
                      <Button
                        variant="outline-success"
                        className="m-2 px-5"
                        onClick={() => handleApprove(user._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="m-2 px-5"
                        onClick={() => handleReject(user._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      ):(<h2>No New requests From User</h2>)
    }
<br/><br/><br/>
{apsafehouses&&apsafehouses.length>0?(
        <> 
<h4 className='theme-purple'>Approved Safe House Details</h4>


         <Table bordered hover className="supporters-table view-all-safehouse-theme-table-body">
          <thead>
            <tr className="text-center">
              <th className='view-all-safehouse-theme text-white'>SI.No</th>
              <th className='view-all-safehouse-theme text-white'>Name</th>
                <th className='view-all-safehouse-theme text-white'>Email-Id</th>
                <th className='view-all-safehouse-theme text-white'>Contact Number</th>
                <th className='view-all-safehouse-theme text-white'>House Name</th>
                <th className='view-all-safehouse-theme text-white'>User Address</th>

            </tr>
          </thead>
          <tbody className='text-center'>
            {apsafehouses&&apsafehouses.map((user, index) => (
              <tr key={user._id} className='view-all-safehouse-theme-table-body'>
                 <td className='p-2'>{index+1}</td> 
                <td>{user.userId.name}</td>
                  <td>{user.userId.email}</td>
                  <td>{user.userId.contact}</td>
                  <td>{user.houseId.name}</td>
                  <td>{user.userId.address}</td>
             
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      ):(<h2>No Approved Requests Found</h2>)
    }
        <div className="d-flex justify-content-center">
          {/* <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link '}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeLinkClassName={'bg-purple text-white'}
          />   */}
        </div>
      </div>


    </div>
  );
}

export default SupporterViewAllSafeHousesRequests;