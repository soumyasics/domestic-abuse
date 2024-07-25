import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import './CounsellorViewClients.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom';
import { viewCounsellorAprvdAppointments } from '../../../Services/apiService';

function CounsellorViewClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 10;
  
    const fetchClients = useCallback(async () => {
      try {
          const response = await viewCounsellorAprvdAppointments(localStorage.getItem('counsellorId'));
          setClients(response.data || []);
      } catch (error) {
          console.error('Error fetching issues:', error);
          toast.error('Error fetching issues.');
      } finally {
          setLoading(false);
      }
  }, [localStorage.getItem('counsellorId')]);

  useEffect(() => {
      
      fetchClients();
  }, [fetchClients]);
  
    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
  
    const paginatedClients = clients.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  
    const pageCount = Math.ceil(clients.length / itemsPerPage);
  
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return { formattedDate, formattedTime };
    };
    const navigateToDetails = (id) => {
        navigate(`/counsellor-view-detaild-client/${id}`);
    };

    return (
      <div className='container-fluid'>
          <div className='row m-5'>
              <div className='col text-center'>
                  <h3 className='theme-purple'>Clients</h3>
              </div>
          </div>
          <div className='row m-5'>
              <div className='col'>
              <div className="table-responsive">
        <ToastContainer />
        {loading ? (
          <p className="theme-purple fs-2">Loading...</p>
        ) : clients.length === 0 ? (
          <p className="m-5 text-center fs-1 theme-purple">No new entries</p>
        ) : (
          <>
            <Table striped bordered hover className="table-responsive">
            <thead>
                                    <tr className="text-center">
                                        <th className='bg-purple text-white'>User Name</th>
                                        <th className='bg-purple text-white'>Gender</th>
                                        <th className='bg-purple text-white'>Date of Birth</th>
                                        <th className='bg-purple text-white'>Type of Issue</th>
                                        <th className='bg-purple text-white'>Severity</th>
                                        <th className='bg-purple text-white'>Location</th>
                                        <th className='bg-purple text-white'>Date</th>

                                        <th className='bg-purple text-white'>Action</th>
                                    </tr>
                                </thead>
              <tbody className='text-center'>
                {paginatedClients.map((client, index) => {
                  const { formattedDate, formattedTime } = formatDateTime(client.appointmentDate);
                  return (
                    <tr key={client._id}>
                   <td>{client.userId.name}</td>
                                            <td>{client.userId.gender}</td>
                                            <td>{client.userId.dob.slice(0, 10)}</td>
                                            <td>{client.issueId.type}</td>
                                            <td>{client.issueId.severity}</td>
                                            <td>{client.issueId.location}</td>
                                            <td>{client.issueId.dateTime.slice(0, 10)}</td>
                      <td className=''>
                        <div className='text-center'>
                          <i className="m-3 cursor-pointer"><BsEye size={22} /></i>
                          <Link className=" theme-purple link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                           to={`/counsellor-view-detaild-client/${client.issueId._id}`}>View Details</Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
              </div>
          </div>
      </div>
    );
  };
export default CounsellorViewClients