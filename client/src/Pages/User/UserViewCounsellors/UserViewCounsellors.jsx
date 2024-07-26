import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { viewCounsellorForAdmin } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import './UserViewCounsellors.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


function UserViewCounsellors() {
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const {id}=useParams()

    const fetchCounsellors = useCallback(async () => {
        try {
            const response = await viewCounsellorForAdmin();
            console.log(response);
            setCounsellors(response || []);
        } catch (error) {
            console.error('Error fetching Counsellors:', error);
            toast.error('Error fetching counsellors.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCounsellors(currentPage);
    }, [fetchCounsellors, currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const paginatedCounsellors = counsellors.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil(counsellors.length / itemsPerPage);

    const navigateToDetails = (cid) => {
        console.log("hr");
        navigate(`/user-view-all-counsellor-details/${cid}/${id}`);
    };

    return (
        <div className='container-fluid'>
            <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong  size={35} className='cursor-pointer' onClick={() => navigate('/user-home')}/>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <h3 className='theme-purple'>All Counsellors</h3>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <div className="table-responsive">
                        {loading ? (
                            <p className="theme-purple fs-1">Loading...</p>
                        ) : counsellors.length === 0 ? (
                            <p className="m-5 text-center fs-1 theme-purple h3">No counsellors available</p>
                        ) : (
                            <>
                                <Table striped bordered hover className="counsellors-table">
                                    <thead>
                                        <tr className="text-center">
                                            <th className='bg-purple text-white'>#</th>
                                            <th className='bg-purple text-white'>Name</th>
                                            <th className='bg-purple text-white'>Email-Id</th>
                                            <th className='bg-purple text-white'>Contact Number</th>
                                            <th className='bg-purple text-white'>Location</th>
                                            <th className='bg-purple text-white'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {paginatedCounsellors.map((counsellor, index) => (
                                            <tr key={counsellor._id}>
                                                <td className='theme-purple text-center'>{index + 1 + currentPage * itemsPerPage}</td>
                                                <td className='theme-purple text-center'>{counsellor.name}</td>
                                                <td className='theme-purple text-center'>{counsellor.email}</td>
                                                <td className='theme-purple text-center'>{counsellor.contact}</td>
                                                <td className='theme-purple text-center'>{counsellor.location}</td>
                                                <td className='theme-purple'>
                                                    <div className='text-center'>
                                                        <Link className=" theme-purple link-dark"
                                                            to= {`/user-view-all-counsellor-details/${counsellor._id}/${id}`}>View Details</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserViewCounsellors;
