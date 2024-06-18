import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import './SupportersRequestTable.css';
import {
  viewSupporterReqsForAdmin,
  approveSupportersById,
  rejectSupportersById,
} from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SupporterDetails from '../SupporterDetails/SupporterDetails';

const SupportersRequestTable = () => {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupporter, setSelectedSupporter] = useState(null);

  useEffect(() => {
    fetchSupporters();
  }, []);

  const fetchSupporters = async () => {
    try {
      const supporterData = await viewSupporterReqsForAdmin();
      setSupporters(supporterData.data);
      console.log(supporterData);
    } catch (error) {
      console.error('Error fetching Supporters:', error);
      toast.error('Error fetching supporter requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this supporter?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await approveSupportersById(id);
              if (response.success) {
                toast.success('Supporter approved successfully.');
                setSupporters((prev) => prev.filter((supporter) => supporter.id !== id));
              } else {
                toast.error(response.message || 'Error approving supporter.');
              }
            } catch (error) {
              toast.error('Error approving supporter.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleReject = (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this supporter?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectSupportersById(id);
              if (response.success) {
                toast.success('Supporter rejected successfully.');
                setSupporters((prev) => prev.filter((supporter) => supporter.id !== id));
              } else {
                toast.error(response.message || 'Error rejecting supporter.');
              }
            } catch (error) {
              toast.error('Error rejecting supporter.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleView = (supporter) => {
    setSelectedSupporter(supporter);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedSupporter(null);
  };

  return (
    <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-1">Loading...</p>
      ) : supporters.length === 0 ? (
        <p className="m-5 text-center fs-1">No new entries</p>
      ) : (
        <>
          <Table striped bordered hover className="supporters-table">
            <thead className="">
              <tr className="text-center">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email Id</th>
                <th>Organisation Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {supporters.map((supporter, index) => (
                <tr key={supporter.id}>
                  <td>{counter + index}</td>
                  <td>
                    <img
                      src={supporter.image}
                      alt={`${supporter.name}'s avatar`}
                      className="img-fluid supporter-profile-pic"
                    />
                  </td>
                  <td>{supporter.name}</td>
                  <td>{supporter.contact}</td>
                  <td>{supporter.email}</td>
                  <td>{supporter.organization}</td>
                  <td className=' '>
                    <div className='text-center'>
                      <i className="bi bi-eye m-3" onClick={() => handleView(supporter)}></i>
                      <i className="bi bi-x m-3 redhover" onClick={() => handleReject(supporter.id)}></i>
                      <i className="bi bi-check2 m-3 greenhover" onClick={() => handleApprove(supporter.id)}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Supporter Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedSupporter && <SupporterDetails supporter={selectedSupporter} />}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default SupportersRequestTable;
