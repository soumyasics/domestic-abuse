import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './CounsellorViewAppointmentDetails.css';
import { getUserById, viewPendingIssues, IMG_BASE_URL } from '../../../Services/apiService';
import demo from '../../../Assets/supp-edit-profile.png';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CounsellorViewAppointmentDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        dob: '',
        gender: '',
        address: '',
        relation: '',
        safetyPlan: '',
        image: { filename: '' },
    });
    const [imagePreview, setImagePreview] = useState(demo);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const fetchUser = useCallback(async () => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
            if (response.data.image && response.data.image.filename) {
                setImagePreview(`${IMG_BASE_URL}${response.data.image.filename}`);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Error fetching user details.');
        }
    }, [userId]);

    const fetchIssues = useCallback(async () => {
        try {
            const response = await viewPendingIssues(userId);
            setIssues(response.data || []);
        } catch (error) {
            console.error('Error fetching issues:', error);
            toast.error('Error fetching issues.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUser();
        fetchIssues();
    }, [fetchUser, fetchIssues]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const paginatedIssues = issues.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil(issues.length / itemsPerPage);

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>User Details</h3>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <img
                        src={imagePreview}
                        alt='profile demo'
                        className='img-fluid rounded-circle object-fit-contain'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = demo;
                        }}
                    />
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col fw-semibold'>
                            Name
                        </div>
                        <div className='col fw-semibold'>
                            Email
                        </div>
                    </div>
                    <div className='row theme-purple fs-5 mb-5'>
                        <div className='col'>
                            {user.name}
                        </div>
                        <div className='col'>
                            {user.email}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col fw-semibold'>
                            Date of Birth
                        </div>
                        <div className='col fw-semibold'>
                            Gender
                        </div>
                    </div>
                    <div className='row theme-purple fs-5 mb-5'>
                        <div className='col'>
                            {user.dob}
                        </div>
                        <div className='col'>
                            {user.gender}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col fw-semibold'>
                            Address
                        </div>
                        <div className='col fw-semibold'>
                            Relationship to Abuser
                        </div>
                    </div>
                    <div className='row theme-purple fs-5 mb-5'>
                        <div className='col'>
                            {user.address}
                        </div>
                        <div className='col'>
                            {user.relation}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col fw-semibold'>
                            Safety Plan
                        </div>
                    </div>
                    <div className='row theme-purple fs-5 mb-5'>
                        <div className='col'>
                            {user.safetyPlan}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col-8 bg-creamy'>
                    {loading ? (
                        <p className="theme-purple fs-1">Loading...</p>
                    ) : issues.length === 0 ? (
                        <p className="m-5 text-center fs-1">No issues available</p>
                    ) : (
                        <>
                            <h3 className='theme-purple'>Reported Issues</h3>
                            <Table striped bordered hover className="issues-table">
                                <thead>
                                    <tr className="text-center">
                                        <th className='bg-purple text-white'>User Name</th>
                                        <th className='bg-purple text-white'>Gender</th>
                                        <th className='bg-purple text-white'>Date of Birth</th>
                                        <th className='bg-purple text-white'>Type of Issue</th>
                                        <th className='bg-purple text-white'>Severity</th>
                                        <th className='bg-purple text-white'>Location</th>
                                        <th className='bg-purple text-white'>Date</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {paginatedIssues.map((issue, index) => (
                                        <tr key={index}>
                                            <td>{issue.userId.name}</td>
                                            <td>{issue.userId.gender}</td>
                                            <td>{issue.userId.dob.slice(0, 10)}</td>
                                            <td>{issue.type}</td>
                                            <td>{issue.severity}</td>
                                            <td>{issue.location}</td>
                                            <td>{issue.dateTime.slice(0, 10)}</td>
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
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakLinkClassName={'page-link'}
                                activeLinkClassName={'bg-purple text-white'}
                            />
                        </>
                    )}
                </div>
                <div className='col-4 text-center text-white'>
                    <div className='row'>
                        <div className='col'>
                            <h4 className='theme-purple'>Supporter Suggestions</h4>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col m-3 supporter-add-suggestion-box1 rounded p-2 h4'>
                            Meet an Advocate
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col m-3 supporter-add-suggestion-box2 rounded p-2 h4'>
                            Move to Safehouse
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col m-3 supporter-add-suggestion-box3 rounded p-2 h4'>
                            Meet a Counselor
                        </div>
                    </div>
                    <div className='row m-5 h4'>
                        <div className='col theme-purple'>
                            Current Status
                        </div>
                        <div className='col text-success'>
                            Accepted
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounsellorViewAppointmentDetails;
