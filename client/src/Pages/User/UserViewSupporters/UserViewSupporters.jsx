import React, { useState, useEffect, useCallback } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './UserViewSupporters.css';
import {
  viewSupporters,
  IMG_BASE_URL,
} from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupporterDetails from '../../Admin/SupporterDetails/SupporterDetails';
import demoImage from '../../../Assets/demo-supp.png'; 

function UserViewSupporters() {
  const [supporters, setSupporters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const supportersPerPage = 20;
  const [showModal, setShowModal] = useState(false);
  const [selectedSupporter, setSelectedSupporter] = useState(null);

  const fetchSupporters = useCallback(async () => {
    try {
      const supporterData = await viewSupporters();
      if (supporterData.status==200) {
        setSupporters(supporterData.data);
      } else {
        toast.error('Error fetching supporters');
      }
    } catch (error) {
      console.error('Error fetching supporters:', error);
      toast.error('Error fetching supporters');
    }
  }, []);

  useEffect(() => {
    fetchSupporters();
  }, [fetchSupporters]);

  const offset = currentPage * supportersPerPage;
  const currentSupporters = supporters.slice(offset, offset + supportersPerPage);
  const pageCount = Math.ceil(supporters.length / supportersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
    <div className='container-fluid'>
      <ToastContainer />
      <div className='row m-5 text-center'>
        <div className='col'>
          <h4 className='theme-purple'>All Supporters</h4>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col table-responsive'>
          <Table striped bordered hover className="supporters-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>#</th>
                <th className='bg-purple text-white'>Image</th>
                <th className='bg-purple text-white'>Name</th>
                <th className='bg-purple text-white'>Contact Number</th>
                <th className='bg-purple text-white'>Email Id</th>
                <th className='bg-purple text-white'>Organisation Name</th>
                <th className='bg-purple text-white'>View</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {currentSupporters.map((supporter, index) => (
                <tr key={supporter._id}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <div className="rounded-circle overflow-hidden mx-auto" style={{ width: '50px', height: '50px' }}>
                      <img
                        src={supporter.image && supporter.image.filename ? `${IMG_BASE_URL}/${supporter.image.filename}` : demoImage}
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
                  <td>
                    <div className='text-center'>
                      <i className="bi bi-eye m-3" onClick={() => handleView(supporter)}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
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
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakLinkClassName={'page-link'}
              activeLinkClassName={'bg-purple text-white'}
            />
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default UserViewSupporters;
