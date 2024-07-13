import React, { useEffect, useState } from 'react';
import './SupporterViewAllSafehouses.css';
import safehouseDemo from '../../../Assets/ADMIN VIEW DETAILS.png';
import { IMG_BASE_URL, rejectSafehouseById, viewAllSafehouses } from '../../../Services/apiService';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
function SupporterViewAllSafehouses() {
    const [safehouses, setSafehouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const safehousesPerPage = 4;
const navigate=useNavigate()
    // Fetch safehouses data from the backend
    const fetchSafehouses = async () => {
        try {
            const response = await viewAllSafehouses();
            console.log('Response:', response); // Log the response to debug
            if (response.status === 200) {
                setSafehouses(response.data.data || []);
            } else {
                console.error('Failed to fetch safehouses:', response.message);
            }
        } catch (error) {
            console.error('Error fetching safehouses:', error);
        }
    };

    useEffect(() => {
        fetchSafehouses();
    }, []);

    // Handle pagination
    const offset = currentPage * safehousesPerPage;
    const currentSafehouses = safehouses ? safehouses.slice(offset, offset + safehousesPerPage) : [];
    const pageCount = Math.ceil(safehouses.length / safehousesPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const deleteHouse=(id)=>{
        
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this safe house?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await rejectSafehouseById(id);
            if (response.success) {
              console.log(`Safehouse with ID: ${id} rejected successfully`);
              fetchSafehouses(); // Refresh the list after rejection
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
    

    return (
        <div className='container-fluid'>
            {currentSafehouses.length > 0 ? (
                currentSafehouses.map((safehouse) => (
                    <div className='row m-5' key={safehouse._id}>
                        <div className='col user-view-safehouse-dimension d-flex m-auto'>
                            <img
                                src={safehouse.image && safehouse.image.filename ? `${IMG_BASE_URL}/${safehouse.image.filename}` : safehouseDemo}
                                alt='safehouses'
                                className='img-fluid rounded object-fit-cover'
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = safehouseDemo;
                                }}
                            />
                        </div>
                        <div className='col d-flex align-items-center'>
                            <div className='card shadow user-view-safehouse-dimension'>
                                <div className='card-body'>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <h5 className='card-title theme-purple'>{safehouse.name ? safehouse.name : 'New House'}</h5>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>Shared by {safehouse.capacity}</p>
                                        </div>
                                        {/* <div className='col text-end'>
                                            <button className='btn bg-purple text-white rounded-4 mx-5'>Request</button>
                                        </div> */}
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.landmark ? safehouse.landmark : 'Landmark'}</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'><b>{safehouse.rent}</b>/ Per Month</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.description ? safehouse.description : 'Description not available'}</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col text-end'>
                                            <span className='m-2'><button className='btn text-primary-emphasis btn-light' onClick={()=>{navigate(`/supporter-edit-safe-house/${safehouse._id}`)}}>Edit</button></span>
                                            <span className='m-2'><button className='btn text-danger btn-light' onClick={()=>{deleteHouse(safehouse._id)}}>Delete</button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-center m-5'><h3 className='theme-purple m-5'> No safehouses available.</h3></div>
            )}
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
    );
}

export default SupporterViewAllSafehouses;
