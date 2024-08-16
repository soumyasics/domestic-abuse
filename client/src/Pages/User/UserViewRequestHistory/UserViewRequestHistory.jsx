import React, { useEffect, useState } from 'react';
import './UserViewRequestHistory.css';
import safehouseDemo from '../../../Assets/ADMIN VIEW DETAILS.png';
import { IMG_BASE_URL, viewAllSafehouseReqsByUser, viewAllSafehouses } from '../../../Services/apiService';
import ReactPaginate from 'react-paginate';
import {  useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function UserViewRequestHistory() {
    const [safehouses, setSafehouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const safehousesPerPage = 4;
    const navigate = useNavigate();

    // Fetch safehouses data from the backend
    const fetchSafehouses = async () => {
        try {
            const response = await viewAllSafehouseReqsByUser(localStorage.getItem('userId'));
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

    return (
        <div className='container-fluid'>
            <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate(-1)} />
                </div>
            </div>
            <div className='col text-center'>
                    <h3 className='theme-purple'>My Safe House Requests</h3>
                </div>
            {currentSafehouses.length > 0 ? (
                currentSafehouses.map((safehouse) => (
                    <div className='row m-5' key={safehouse._id}>
                        <div className='col user-view-safehouse-dimension d-flex m-auto'>
                            <img
                                src={safehouse.houseId.image && safehouse.houseId.image.filename ? `${IMG_BASE_URL}/${safehouse.houseId.image.filename}` : safehouseDemo}
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
                                            <h5 className='card-title theme-purple'>{safehouse.houseId.name ? safehouse.houseId.name : 'New House'}</h5>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>Shared by {safehouse.houseId.capacity}</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.houseId.landmark ? safehouse.houseId.landmark : 'Landmark'}</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'><b>{safehouse.houseId.rent}</b>/ Per Month</p>
                                        </div>
                                    </div>
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.houseId.description ? safehouse.houseId.description : 'Description not available'}</p>
                                        </div>
                                    </div>
                                    {/* <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.paymentStatus ? safehouse.paymentStatus : 'Payment Status Unavailable'}</p>
                                        </div>
                                    </div> */}
                                    <div className='row m-3'>
                                        <div className='col'>
                                            <p className='card-text'>{safehouse.status ? 'Supporter Status : '+safehouse.status : 'Supporter Status Unavailable'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-center m-5'><h3 className='theme-purple m-5'> No History available.</h3></div>
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
    )
}

export default UserViewRequestHistory