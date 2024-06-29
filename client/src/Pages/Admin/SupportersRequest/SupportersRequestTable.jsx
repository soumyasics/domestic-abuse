import React, { useState, useEffect, useCallback } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import './SupportersRequestTable.css';
import {
  viewSupporterReqsForAdmin,
  approveSupportersById,
  rejectSupportersById,
  viewSupporters,
  removeSupportersById,
  IMG_BASE_URL,
} from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SupporterDetails from '../SupporterDetails/SupporterDetails';
import demoImage from '../../../Assets/demo-supp.png'; 
import { BsDashCircle } from "react-icons/bs";

const SupportersRequestTable = (props) => {
  const [supporters, setSupporters] = useState([]);
  const [activeSupporters, setActiveSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupporter, setSelectedSupporter] = useState(null);
  const [action, setAction] = useState(false);
  const fetchSupporters = useCallback(async () => {
    try {
      if (props.activePage === 'new-request') {
        const supporterData = await viewSupporterReqsForAdmin();
        const filteredSupporters = supporterData.data.filter(supporter => !supporter.adminApproved);
        setSupporters(filteredSupporters);
        setCounter(1);
        setAction(false);
      }
      if (props.activePage === 'all-supporters') {
        const supporterData = await viewSupporters();
        const allSupporters = supporterData.data;
        const activeSupportersFiltered = allSupporters.filter(supporter => supporter.isActive);
        setSupporters(allSupporters);
        setActiveSupporters(activeSupportersFiltered);
        setCounter(1);
        setAction(true);
      }
    } catch (error) {
      console.error('Error fetching Supporters:', error);
      toast.error('Error fetching supporter requests.');
    } finally {
      setLoading(false);
    }
  }, [props.activePage]);

  useEffect(() => {
    fetchSupporters();
  }, [fetchSupporters]);

  const handleApprove = async (id) => {
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
                fetchSupporters();
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

  const handleReject = async (id) => {
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
                fetchSupporters();
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

  const handleRemoval = async (id) => {
    confirmAlert({
      title: 'Confirm Removal',
      message: 'Are you sure you want to remove this supporter?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await removeSupportersById(id);
              if (response.success) {
                toast.success('Supporter removed successfully.');
                fetchSupporters();
              } else {
                toast.error(response.message || 'Error removing supporter.');
              }
            } catch (error) {
              toast.error('Error removing supporter.');
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
              <tr className="text-center ">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>Image</th>
                <th className='bg-purple text-white'>Name</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Email Id</th>
                <th className='bg-purple text-white'>Organisation Name</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {action ? activeSupporters.map((supporter, index) => (
                <tr key={supporter._id}>
                  <td>{counter + index}</td>
                  <td>
                    <div className="rounded-circle overflow-hidden mx-auto" style={{ width: '50px', height: '50px' }}>
                      <img
                        src={`${IMG_BASE_URL}/${supporter.image && supporter.image.filename ? supporter.image.filename : demoImage}`}
                        alt={`${supporter.name}'s avatar`}
                        className="img-fluid"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = demoImage; 
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td>{supporter.name}</td>
                  <td>{supporter.contact}</td>
                  <td>{supporter.email}</td>
                  <td>{supporter.organization}</td>
                  <td className=''>
                    <div className='text-center'>
                      <div onClick={() => handleRemoval(supporter._id)} className='m-2 danger-box p-1 theme-purple'> <BsDashCircle size={22} color='white' className='mx-2'/>Remove </div>
                    </div>
                  </td>
                </tr>
              )) : supporters.map((supporter, index) => (
                <tr key={supporter._id}>
                  <td>{counter + index}</td>
                  <td>
                    <div className="rounded-circle overflow-hidden mx-auto" style={{ width: '50px', height: '50px' }}>
                      <img
                        src={`${IMG_BASE_URL}/${supporter.image && supporter.image.filename ? supporter.image.filename : demoImage}`}
                        alt={`${supporter.name}'s avatar`}
                        className="img-fluid"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = demoImage; 
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td>{supporter.name}</td>
                  <td>{supporter.contact}</td>
                  <td>{supporter.email}</td>
                  <td>{supporter.organization}</td>
                  <td className=''>
                    <div className='text-center'>
                      <i className="bi bi-eye m-3" onClick={() => handleView(supporter)}></i>
                      <i className="bi bi-x m-3 redhover" onClick={() => handleReject(supporter._id)}></i>
                      <i className="bi bi-check2 m-3 greenhover" onClick={() => handleApprove(supporter._id)}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleClose} className='bg-creamy'>
            <Modal.Header closeButton className='bg-creamy'>
              <Modal.Title>Supporter Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-creamy'>
              {selectedSupporter && <SupporterDetails supporter={selectedSupporter} />}
            </Modal.Body>
            <Modal.Footer className='bg-creamy'>
              <Button className='bg-purple border-0' onClick={handleClose}>
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
