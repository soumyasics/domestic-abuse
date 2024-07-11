import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
//import { viewUsersForAdmin, activateUserById, deactivateUserById } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import './AdminUserViewAll.css';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import axiosInstance from '../../../Constant/BaseURL';
import { useNavigate } from 'react-router-dom';

const AdminUserViewAll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async () => {
    try {
      // const response = await viewUsersForAdmin();
      // setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching user requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  const toggleUserActiveState = (user) => {
    if (user.isActive) {
      handleDeactivate(user._id);
    } else {
      handleActivate(user._id);
    }
  };

  const handleActivate = async (id) => {
    try {
      // const response = await activateUserById(id);
      // if (response.success) {
      //   toast.success('User activated successfully.');
      //   fetchUsers(currentPage);
      // } else {
      //   toast.error(response.message || 'Error activating user.');
      // }
    } catch (error) {
      toast.error('Error activating user.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      // const response = await deactivateUserById(id);
      // if (response.success) {
      //   toast.success('User deactivated successfully.');
      //   fetchUsers(currentPage);
      // } else {
      //   toast.error(response.message || 'Error deactivating user.');
      // }
    } catch (error) {
      toast.error('Error deactivating user.');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const navigateToInd = (id) => {
    navigate(`/admin-viewdetailedUser-aprvd/${id}`);
  };

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
                <h3 className='theme-purple'>Users</h3>
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
                      <i className="m-3 cursor-pointer" onClick={() => navigateToInd(user._id)}><BsEye size={22} /></i>
                      <button
                        className={`toggle-button ${user.isActive ? 'active' : 'inactive'}`} 
                        onClick={() => toggleUserActiveState(user)}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
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

export default AdminUserViewAll;
