import React,{ useState, useEffect, useCallback }  from 'react';
import { Table, Button } from 'react-bootstrap';
import { viewCounsellorForAdmin, approveCounsellorsById, rejectCounsellorsById } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import './AdminCounsellorViewAll.css';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import { LuUserX } from "react-icons/lu";
import axiosInstance from '../../../Constant/BaseURL'

function AdminCounsellorViewAll() {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const toggleUserActiveState = (counsellors) => {
    console.log(counsellors.isActive);
    if(counsellors.isActive){
      handleDeactive(counsellors._id)
    }
    else{
      handleActive(counsellors._id)
    }
  }
  const fetchCounsellors = useCallback(async () => {
    try {
      const response = await viewCounsellorForAdmin();
      console.log(response);
      setCounsellors(response || []);
    } catch (error) {
      console.error('Error fetching Counsellors:', error);
      toast.error('Error fetching counsellor requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounsellors(currentPage);
  }, [fetchCounsellors, currentPage]);

  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this counsellor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveCounsellorsById(id);
              if (response.success) {
                toast.success('Counsellor approved successfully.');
                fetchCounsellors(currentPage);
              } else {
                toast.error(response.message || 'Error approving counsellor.');
              }
            } catch (error) {
              toast.error('Error approving counsellor.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };


  const handleActive = (id) => {
    console.log(id);
    axiosInstance.post(`/activateCounsellorsById/${id}`)
    .then((res)=>{
      if(res.data.status === 200){
        
        counsellors.isActive=true   
        fetchCounsellors(currentPage);
}
    })
    .catch((err) => {
      console.log("Error",err);
    })
  }

  const handleDeactive = (id) => {
    axiosInstance.post(`/removeCounsellorsById/${id}`)
    .then((res) => {
      if(res.data.status === 200){
        counsellors.isActive=false   
        fetchCounsellors(currentPage);

      }
    })
    .catch((err) => {
      console.log("Error",err);
    })
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedCounsellors = counsellors.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(counsellors.length / itemsPerPage);

  return (
    <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-1">Loading...</p>
      ) : counsellors.length === 0 ? (
        <p className="m-5 text-center fs-1">No new entries</p>
      ) : (
        <>
          <Table striped bordered hover className="counsellors-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>Name</th>
                <th className='bg-purple text-white'>Email-Id</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Location</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {paginatedCounsellors.map((counsellor, index) => (
                <tr key={counsellor._id}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{counsellor.name}</td>
                  <td>{counsellor.email}</td>
                  <td>{counsellor.contact}</td>
                  <td>{counsellor.location}</td>
                  <td className=''>
                    <div className='text-center'>
                      <i className="m-3 cursor-pointer" onClick={() => {/* navigate to detailed view */}}><BsEye size={22} /></i>
                      <button
                     className={`toggle-button ${counsellor.isActive ? 'active' : 'inactive'}`} 
                    onClick={()=>{toggleUserActiveState(counsellor)}}
                    >
                      {counsellor.isActive ? 'Active' : 'Inactive'}
                    </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
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
          />
        </>
      )}
    </div>
  );
};


export default AdminCounsellorViewAll