import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { viewCounsellorForAdmin, viewPaymentsForUser } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function UserViewPaymentReqs() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const fetchpayments = useCallback(async () => {
        try {
            const response = await viewPaymentsForUser(localStorage.getItem('userId'));
            console.log(response);
            setPayments(response || []);
        } catch (error) {
            console.error('Error fetching Counsellors:', error);
            toast.error('Error fetching counsellors.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchpayments();
    }, [localStorage.getItem('userId')]);

  

   


 

    return (
        <div className='container-fluid'>
            <div className='row my-5 mx-3'>
                
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <h3 className='theme-purple'>All Payment Requests</h3>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <div className="table-responsive">
                        {loading ? (
                            <p className="theme-purple fs-1">Loading...</p>
                        ) : payments.length === 0 ? (
                            <p className="m-5 text-center fs-1 theme-purple h3">No Payment Request available</p>
                        ) : (
                            <>
                                <Table striped bordered hover className="counsellors-table">
                                    <thead>
                                        <tr className="text-center">
                                            <th className='bg-purple text-white'>#</th>
                                            <th className='bg-purple text-white'>Legal Professional Name</th>
                                            <th className='bg-purple text-white'>Contact Number</th>
                                            <th className='bg-purple text-white'>Request Date</th>
                                            <th className='bg-purple text-white'>Amount</th>                                           
                                            <th className='bg-purple text-white'>Category</th>

                                            <th className='bg-purple text-white'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {payments.map((p, index) => (
                                            <tr key={p._id}>
                                                <td className='theme-purple text-center'>{index + 1}</td>
                                                <td className='theme-purple text-center'>{p.lpId.name}</td>
                                                <td className='theme-purple text-center'>{p.lpId.contact}</td>
                                                <td className='theme-purple text-center'>{p.date.slice(0,10)}</td>
                                                <td className='theme-purple text-center'>{p.payment}</td>
                                                <td className='theme-purple text-center'>{p.category}</td>

                                                <td className='theme-purple'>
                                                    {p.paymentStatus=='Requested'?(
                                                        <Link className=" theme-purple link-dark"
                                                        to= {`/user-payment/${p._id}`}>Pay Now</Link>
                                                
                                                    ):(<span>Paid</span>)}
                                                        
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                               
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};


export default UserViewPaymentReqs