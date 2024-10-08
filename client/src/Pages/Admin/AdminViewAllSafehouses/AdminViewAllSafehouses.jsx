import React, { useEffect, useState } from 'react';
import './AdminViewAllSafehouses.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaEye } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { viewSafehouses } from '../../../Services/apiService';

function AdminViewAllSafehouses() {
  const [safehouses, setSafehouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;
  const navigate = useNavigate();

  const fetchSafehouses = async () => {
    try {
      const response = await viewSafehouses();
      if (response.success) {
        setSafehouses(response.data);
      } else {
        console.error('Failed to fetch safehouses:', response.message);
        setSafehouses([]); // Ensure safehouses is always defined
      }
    } catch (error) {
      console.error('Error fetching safehouses:', error);
      setSafehouses([]); // Ensure safehouses is always defined
    }
  };

  useEffect(() => {
    fetchSafehouses();
  }, []);

  const handleAccept = (id) => {
    console.log(`Accept Safe House with ID: ${id}`);
  };

  const handleView = (id) => {
    console.log(`View Safe House with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Reject Safe House with ID: ${id}`);
  };

  // Pagination logic
  const offset = currentPage * safehousesPerPage;
  const currentSafehouses = safehouses ? safehouses.slice(offset, offset + safehousesPerPage) : [];
  const pageCount = Math.ceil(safehouses ? safehouses.length / safehousesPerPage : 0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container-fluid m-auto'>
      <div className='row m-5 mt-5 mb-2'>
        <div className='col'>
          <h4 className='theme-purple'>Safe House Details</h4>
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
              {/* <th className='view-all-safehouse-theme text-white fs-6'>Action</th> */}
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
                {/* <td className='p-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2'>
                      <FaEye 
                        className='mx-2 text-white'
                        onClick={() => handleView(safehouse._id)}
                      />
                    </div>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2'>
                      <TiTick
                        className='mx-2 text-white'
                        onClick={() => handleAccept(safehouse._id)}
                      />
                    </div>
                    <div className='bg-purple rounded-circle cursor-pointer mx-2'>
                      <RxCross1 
                        className='mx-2 text-white'
                        onClick={() => handleReject(safehouse._id)}
                      />
                    </div>
                  </div>
                </td> */}
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

export default AdminViewAllSafehouses;
