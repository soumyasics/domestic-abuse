import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import './AdminLegalProfessionalViewAll.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import axiosInstance from '../../../Constant/BaseURL'
import { viewAllApprovedLegalProfessionals, rejectLegalProfessionalsById } from '../../../Services/apiService';
import { useNavigate } from 'react-router-dom';

const AdminLegalProfessionalViewAll = () => {
  const [legalProfessionals, setLegalProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  console.log("im here");
  const toggleUserActiveState = (legalProfessionals) => {
    console.log(legalProfessionals.isActive);
    if(legalProfessionals.isActive){
      handleDeactive(legalProfessionals._id)
    }
    else{
      handleActive(legalProfessionals._id)
    }
  }
  const itemsPerPage = 10;
const navigate=useNavigate()
  const fetchLegalProfessionals = useCallback(async () => {
    try {
      const response = await viewAllApprovedLegalProfessionals();
     if (response) {
       console.log('Fetched legal professionals:', response);  // Debugging log
       setLegalProfessionals(response);
     } else {
       toast.error(response.message);
       setLegalProfessionals([]);
     }
    } catch (error) {
      toast.error('Error fetching legal professionals.');
      setLegalProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegalProfessionals();
  }, [fetchLegalProfessionals]);
  const handleActive = (id) => {
    console.log(id);
    axiosInstance.post(`/activateLegalProfessionalById/${id}`)
    .then((res)=>{
      if(res.data.status === 200){
        
        legalProfessionals.isActive=true   
        fetchLegalProfessionals(currentPage);
}
    })
    .catch((err) => {
      console.log("Error",err);
    })
  }

  const handleDeactive = (id) => {
    axiosInstance.post(`/deActivateLegalProfessionalById/${id}`)
    .then((res) => {
      if(res.data.status === 200){
        legalProfessionals.isActive=false   
        fetchLegalProfessionals(currentPage);

      }
    })
    .catch((err) => {
      console.log("Error",err);
    })
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const navigateToInd=(id)=>{
    navigate(`/admin-viewdetailedLegalProfessional-aprvd/${id}`)
  } 
  const paginatedLegalProfessionals = Array.isArray(legalProfessionals)
    ? legalProfessionals.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    : [];

  const pageCount = Array.isArray(legalProfessionals)
    ? Math.ceil(legalProfessionals.length / itemsPerPage)
    : 0;

  return (
    <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-1">Loading...</p>
      ) : legalProfessionals.length === 0 ? (
        <p className="m-5 text-center fs-1">No legal professionals found</p>
      ) : (
        <>
          <Table striped bordered hover className="legal-professionals-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>Name</th>
                <th className='bg-purple text-white'>Email-Id</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Firm Name</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {paginatedLegalProfessionals.map((professional, index) => (
                <tr key={professional._id}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{professional.name}</td>
                  <td>{professional.email}</td>
                  <td>{professional.contact}</td>
                  <td>{professional.firmName}</td>
                  <td className=''>
                    <div className='text-center'>
                      <i className="m-3 cursor-pointer" onClick={() => {navigateToInd([professional._id])}}><BsEye size={22} /></i>
                      <button
                     className={`toggle-button ${professional.isActive ? 'active' : 'inactive'}`} 
                    onClick={()=>{toggleUserActiveState(professional)}}
                    >
                      {professional.isActive ? 'Active' : 'Inactive'}
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

export default AdminLegalProfessionalViewAll;
