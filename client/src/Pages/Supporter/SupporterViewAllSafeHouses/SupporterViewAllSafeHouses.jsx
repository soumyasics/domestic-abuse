import React, { useState } from 'react';
import './SupporterViewAllSafeHouses.css';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

function SupporterViewAllSafeHouses() {
  const [safehouses, setSafehouses] = useState([
    // Sample data for demonstration
    {
      _id: '1',
      houseName: 'Safe House 1',
      address: '123 Street, City',
      contact: '1234567890',
      landmark: 'Near Park',
      licenseNo: 'LN12345',
      accommodationCapacity: '10',
      image: 'path/to/image1.jpg',
      monthlyRent: '$1000',
      description: 'Description 1',
    },
    {
      _id: '2',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
     {
      _id: '3',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '4',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '5',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '6',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '7',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '8',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '9',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '10',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '11',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '12',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '13',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '14',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '15',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '16',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '17',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '18',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '19',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '20',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '21',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '22',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '23',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    {
      _id: '24',
      houseName: 'Safe House 2',
      address: '456 Avenue, City',
      contact: '0987654321',
      landmark: 'Near Mall',
      licenseNo: 'LN67890',
      accommodationCapacity: '15',
      image: 'path/to/image2.jpg',
      monthlyRent: '$1500',
      description: 'Description 2',
    },
    // ... add more sample safehouses up to at least 20 to test pagination
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const safehousesPerPage = 10;

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
                <td className='p-2'>{safehouse.houseName}</td>
                <td className='p-2'>{safehouse.address}</td>
                <td className='p-2'>{safehouse.contact}</td>
                <td className='p-2'>{safehouse.landmark}</td>
                <td className='p-2'>{safehouse.accommodationCapacity}</td>
                <td className='p-2'>{safehouse.monthlyRent}</td>
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
