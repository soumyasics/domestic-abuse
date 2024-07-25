import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import './CounsellorAppointmentRequests.css';
import { viewCounsellorAppointments, acceptAppointmentById, rejectAppointmentById, acceptCouncAppointmentById, rejectCouncAppointmentById } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { BsEye } from "react-icons/bs";

const CounsellorAppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await viewCounsellorAppointments(localStorage.getItem('counsellorId'));
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching appointment requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [fetchAppointments, currentPage]);

  const handleAccept = async (id) => {
    confirmAlert({
      title: 'Confirm Acceptance',
      message: 'Are you sure you want to accept this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await acceptCouncAppointmentById(id);
              if (response.status==200) {
                toast.success('Appointment accepted successfully.');
                fetchAppointments(currentPage);
              } else {
                toast.error(response.message || 'Error accepting appointment.');
              }
            } catch (error) {
              toast.error('Error accepting appointment.');
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
      message: 'Are you sure you want to reject this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectCouncAppointmentById(id);
              if (response.status==200) {
                toast.success('Appointment rejected successfully.');
                fetchAppointments(currentPage);
              } else {
                toast.error(response.message || 'Error rejecting appointment.');
              }
            } catch (error) {
              toast.error('Error rejecting appointment.');
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

  const paginatedAppointments = appointments.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(appointments.length / itemsPerPage);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  return (
    <div className='container-fluid'>
        <div className='row m-5'>
            <div className='col text-center'>
                <h3 className='theme-purple'>Appointment Request</h3>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
            <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-2">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="m-5 text-center fs-1 theme-purple">No new entries</p>
      ) : (
        <>
          <Table striped bordered hover className="appointments-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>User Name</th>
                <th className='bg-purple text-white'>DOB</th>
                <th className='bg-purple text-white'>Gender</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Type of Issues</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {paginatedAppointments.map((appointment, index) => {
                const { formattedDate, formattedTime } = formatDateTime(appointment.appointmentDate);
                return (
                  <tr key={appointment._id}>
                    <td>{index + 1 + currentPage * itemsPerPage}</td>
                    <td>{appointment.userId.name}</td>
                    <td>{appointment.userId.dob.slice(0,10)}</td>
                    <td>{appointment.userId.gender}</td>
                    <td>{appointment.userId.contact}</td>
                    <td>{appointment.issueId.type}</td>
                    <td className=''>
                      <div className='text-center'>
                        {/* <i className="m-3 cursor-pointer"><BsEye size={22} /></i> */}
                        <Button
                          variant="outline-success"
                          className="m-2 px-5"
                          onClick={() => handleAccept(appointment._id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="m-2 px-5"
                          onClick={() => handleReject(appointment._id)}
                        >
                          Reject
                        </Button>
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

export default CounsellorAppointmentRequests;
