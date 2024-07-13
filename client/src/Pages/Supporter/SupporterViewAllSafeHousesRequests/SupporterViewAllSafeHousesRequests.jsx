import React, { useState, useEffect } from 'react';
import './SupporterViewAllSafeHousesRequests.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { viewSafehouses,rejectSafehouseById, viewSafehousesBySupporterId } from '../../../Services/apiService'; 
import { Link,useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupporterViewAllSafeHousesRequests() {
  const [safehouses, setSafehouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;
  const navigate=useNavigate();

  const fetchSafehouses = async () => {
    try {
      const response = await viewSafehousesBySupporterId(localStorage.getItem('supporterId'));
      console.log(response);
      if (response.status === 200) {
        setSafehouses(response.data);
      } else {
        console.error('Failed to fetch safehouses:', response.msg);
      }
    } catch (error) {
      console.error('Error fetching safehouses:', error);
    }
  };
  useEffect(() => {
    fetchSafehouses();
  }, []); // Empty dependency array ensures it runs only once on component mount

  const handleEdit = (id) => {
    navigate('/supporter-edit-safe-house',{ state: { safehouseId: id } })
  };

  const handleRemove = async (id) => {
    confirmAlert({
      title: 'Confirm Removal',
      message: 'Are you sure you want to remove this safehouse?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await rejectSafehouseById(id);
              if (response.success) {
                toast.success('Safehouse removed successfully.');
                fetchSafehouses();
              } else {
                toast.error(response.message || 'Error removing safehouse.');
              }
            } catch (error) {
              toast.error('Error removing safehouse.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Pagination logic
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
          <h4 className='theme-purple'>Safe House Details</h4>
        </div>
        <div className='col text-end'>
          <button className='btn bg-purple text-white'><Link to="/supporter-add-safe-space" className='text-white text-decoration-none'>Add New Safe House</Link></button>
        </div>
      </div>
      <div className='table-responsive m-5 mt-5'>
        <Table bordered hover className="supporters-table view-all-safehouse-theme-table-body">
          <thead>
            <tr className="text-center">
              <th className='view-all-safehouse-theme text-white'>SI.No</th>
              <th className='view-all-safehouse-theme text-white'>Name</th>
              <th className='view-all-safehouse-theme text-white'>Address</th>
              <th className='view-all-safehouse-theme text-white'>Contact Number</th>
              <th className='view-all-safehouse-theme text-white'>Landmark</th>
              <th className='view-all-safehouse-theme text-white'>Capacity</th>
              <th className='view-all-safehouse-theme text-white'>Monthly Rent</th>
              <th className='view-all-safehouse-theme text-white'>Status</th>
              <th className='view-all-safehouse-theme text-white'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentSafehouses.map((safehouse, index) => (
              <tr key={safehouse._id} className='view-all-safehouse-theme-table-body'>
                <td className='p-2'>{offset + index + 1}</td>
                <td className='p-2'>{safehouse.name}</td>
                <td className='p-2'>{safehouse.address}</td>
                <td className='p-2'>{safehouse.contact}</td>
                <td className='p-2'>{safehouse.landmark}</td>
                <td className='p-2'>{safehouse.capacity}</td>
                <td className='p-2'>{safehouse.rent}</td>
                <td className='p-2'>{safehouse.adminApproved?'Approved':'Pending'}</td>
                <td className='p-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2'>
                      <FaPen
                        className='mx-2 text-white'
                        onClick={() => handleEdit(safehouse._id)}
                      />
                    </div>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2'>
                      <RxCross1
                        className='mx-2 cursor-pointer text-white'
                        onClick={() => handleRemove(safehouse._id)}
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

export default SupporterViewAllSafeHousesRequests;