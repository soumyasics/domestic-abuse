import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import './AdminUserRequests.css';
//import { viewUserReqsForAdmin, approveUserById, rejectUserById } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const AdminUserRequests = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      // const response = await viewUserReqsForAdmin();
      // setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching Users:', error);
      toast.error('Error fetching user requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  const handleApprove = async (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              // const response = await approveUserById(id);
              // if (response.success) {
              //   toast.success('User approved successfully.');
              //   fetchUsers(currentPage);
              // } else {
              //   toast.error(response.message || 'Error approving user.');
              // }
            } catch (error) {
              toast.error('Error approving user.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const navigateToInd = (id) => {
    navigate(`/admin-viewdetailedUser-req/${id}`);
  };

  const handleReject = async (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              // const response = await rejectUserById(id);
              // if (response.success) {
              //   toast.success('User rejected successfully.');
              //   fetchUsers(currentPage);
              // } else {
              //   toast.error(response.message || 'Error rejecting user.');
              // }
            } catch (error) {
              toast.error('Error rejecting user.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-1">Loading...</p>
      ) : users.length === 0 ? (
        <p className="m-5 text-center fs-1">No new entries</p>
      ) : (
        <>
        <div className='row'>
            <div className='col'>
                <h3 className='theme-purple'>New Users</h3>
            </div>
        </div>
          <Table striped bordered hover className="users-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>Name</th>
                <th className='bg-purple text-white'>Email-Id</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Gender</th>
                <th className='bg-purple text-white'>Address</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {paginatedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td className=''>
                    <div className='text-center'>
                      <i className="m-3 cursor-pointer" onClick={() => { navigateToInd(user._id) }}><BsEye size={22} /></i>
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

export default AdminUserRequests;
