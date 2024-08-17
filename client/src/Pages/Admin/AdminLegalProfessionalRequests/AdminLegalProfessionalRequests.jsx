import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import './AdminLegalProfessionalRequests.css';
import { viewLegalProfessionalReqsForAdmin, approveLegalProfessionalsById, rejectLegalProfessionalsById } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const AdminLegalProfessionalRequests = () => {
  const [legalProfessionals, setLegalProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const navigate=useNavigate()

  const fetchLegalProfessionals = useCallback(async () => {
    try {
      const response = await viewLegalProfessionalReqsForAdmin();
      if (response.success) {
        console.log('Fetched legal professionals:', response.data);  // Debugging log
        setLegalProfessionals(response.data.data);
      } else {
        toast.error(response.message);
        setLegalProfessionals([]);
      }
    } catch (error) {
      toast.error('Error fetching legal professional requests.');
      setLegalProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegalProfessionals();
  }, [fetchLegalProfessionals]);

  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this legal professional?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveLegalProfessionalsById(id);
              if (response.success) {
                toast.success(response.message || 'Legal professional approved successfully.', {
                  autoClose: 900, 
                });
                fetchLegalProfessionals();
              } else {
                toast.error(response.message || 'Error approving legal professional.', {
                  autoClose: 900, 
                });
              }
            } catch (error) {
              toast.error('Error approving legal professional.', {
                autoClose: 900, 
              });
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleReject = async (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this legal professional?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectLegalProfessionalsById(id);
              if (response.success) {
                toast.success(response.message || 'Legal professional rejected successfully.', {
                  autoClose: 900, 
                });
                fetchLegalProfessionals();
              } else {
                toast.error(response.message || 'Error rejecting legal professional.', {
                  autoClose: 900, 
                });
              }
            } catch (error) {
              toast.error('Error rejecting legal professional.', {
                autoClose: 900, 
              });
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  const navigateToInd=(id)=>{
    navigate(`/admin-viewdetailedLegalProfessional/${id}`)
  } 
   const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

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
        <p className="m-5 text-center fs-1">No new entries</p>
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
                      <i className="m-3 cursor-pointer" onClick={() => {navigateToInd(professional._id)}}><BsEye size={22} /></i>
                      <Button
                        variant="outline-success"
                        className="m-2 px-5"
                        onClick={() => handleApprove(professional._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="m-2 px-5"
                        onClick={() => handleReject(professional._id)}
                      >
                        Reject
                      </Button>
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

export default AdminLegalProfessionalRequests;
