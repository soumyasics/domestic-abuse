import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaEye } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { viewSafehouseReqsForAdmin, approveSafehouseById, rejectSafehouseById } from '../../../Services/apiService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

function AdminSafehouseRequests() {
  const [safehouses, setSafehouses] = useState([]);
  const [safehouseDetail, setSafehouseDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;
  const navigate = useNavigate();

  const fetchSafehouseRequests = async () => {
    const response = await viewSafehouseReqsForAdmin();
    if (response.success) {
      setSafehouses(response.data);
    } else {
      console.error('Failed to fetch safehouse requests:', response.message);
    }
  };

  useEffect(() => {
    fetchSafehouseRequests();
  }, []);

  const handleAccept = (id) => {
    confirmAlert({
      title: 'Confirm Approval',
      message: 'Are you sure you want to approve this safe house?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await approveSafehouseById(id);
            if (response.success) {
              console.log(`Safehouse with ID: ${id} approved successfully`);
              fetchSafehouseRequests(); // Refresh the list after approval
            } else {
              console.error('Failed to approve safehouse:', response.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Approval cancelled')
        }
      ]
    });
  };

  const handleReject = (id) => {
    confirmAlert({
      title: 'Confirm Rejection',
      message: 'Are you sure you want to reject this safe house?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await rejectSafehouseById(id);
            if (response.success) {
              console.log(`Safehouse with ID: ${id} rejected successfully`);
              fetchSafehouseRequests(); // Refresh the list after rejection
            } else {
              console.error('Failed to reject safehouse:', response.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Rejection cancelled')
        }
      ]
    });
  };

  const handleView = async (data) => {
    navigate(`/admin-safehouse-details/${data}`, { state: { data } });
  };

  const offset = currentPage * safehousesPerPage;
  const currentSafehouses = safehouses.slice(offset, offset + safehousesPerPage);
  const pageCount = Math.ceil(safehouses.length / safehousesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container-fluid m-auto'>
      <div className='row m-5 mt-5 mb-2'>
        <div className='col'>
          <h4 className='theme-purple'>Safe House Requests</h4>
        </div>
      </div>
      <div className='table-responsive m-5 mt-2'>
        <Table bordered hover className="supporters-table view-all-safehouse-theme-table-body">
          <thead>
            <tr className="text-center ">
              <th className='view-all-safehouse-theme text-white fs-6'>SI.No</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Name</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Contact Number</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Landmark</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Accommodation Capacity</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Monthly Rent</th>
              <th className='view-all-safehouse-theme text-white fs-6'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center fs-6'>
            {currentSafehouses.map((safehouse, index) => (
              <tr key={safehouse._id} className='view-all-safehouse-theme-table-body fs-6'>
                <td className='p-2'>{offset + index + 1}</td>
                <td className='p-2'>{safehouse.name}</td>
                <td className='p-2'>{safehouse.contact}</td>
                <td className='p-2'>{safehouse.landmark}</td>
                <td className='p-2'>{safehouse.capacity}</td>
                <td className='p-2'>{safehouse.rent}</td>
                <td className='p-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2 p-1'>
                      <FaEye 
                        className='mx-2 text-white'
                        onClick={() => handleView(safehouse._id)}
                      />
                    </div>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2 p-1'>
                      <TiTick
                        className='mx-2 text-white'
                        onClick={() => handleAccept(safehouse._id)}
                      />
                    </div>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2 p-1'>
                      <RxCross1 
                        className='mx-2 text-white'
                        onClick={() => handleReject(safehouse._id)}
                      />
                    </div>
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
            previousLinkClassName={'page-link '}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeLinkClassName={'bg-purple text-white'}
          />  
        </div>
      </div>
    </div>
  );
}

export default AdminSafehouseRequests;
