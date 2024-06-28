import React, { useState, useEffect } from 'react';
import './SupporterViewAllSafeHouses.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { viewSafehouses } from '../../../Services/apiService'; 
import { Link } from 'react-router-dom';

function SupporterViewAllSafeHouses() {
  const [safehouses, setSafehouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;

  useEffect(() => {
    // Fetch safehouses data from backend
    const fetchSafehouses = async () => {
      try {
        const response = await viewSafehouses();
        if (response.status === 200) {
          setSafehouses(response.data);
        } else {
          console.error('Failed to fetch safehouses:', response.msg);
        }
      } catch (error) {
        console.error('Error fetching safehouses:', error);
      }
    };

    fetchSafehouses();
  }, []); // Empty dependency array ensures it runs only once on component mount

  const handleEdit = (id) => {
    // Edit functionality
    console.log(`Edit Safe House with ID: ${id}`);
  };

  const handleRemove = (id) => {
    // Remove functionality
    console.log(`Remove Safe House with ID: ${id}`);
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
        <div className='col'>
          <h4 className='theme-purple'><Link to="/supporter-add-safe-space">Add New Safe House</Link></h4>
        </div>
      </div>
      <div className='table-responsive m-5 mt-2'>
        <Table bordered hover className="supporters-table view-all-safehouse-theme-table-body">
          <thead>
            <tr className="text-center">
              <th className='view-all-safehouse-theme text-white'>SI.No</th>
              <th className='view-all-safehouse-theme text-white'>Name</th>
              <th className='view-all-safehouse-theme text-white'>Address</th>
              <th className='view-all-safehouse-theme text-white'>Contact Number</th>
              <th className='view-all-safehouse-theme text-white'>Landmark</th>
              <th className='view-all-safehouse-theme text-white'>Accommodation Capacity</th>
              <th className='view-all-safehouse-theme text-white'>Monthly Rent</th>
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

export default SupporterViewAllSafeHouses;
