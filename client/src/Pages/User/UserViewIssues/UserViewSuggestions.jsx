import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import '../../Supporter/SupporterViewAllIssues/SupporterViewAllIssues.css';
import { IMG_BASE_URL,  viewSupportedUserIssuesBYUserId } from '../../../Services/apiService';
import { Link } from 'react-router-dom';
import { FaFile } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
function UserViewSuggestions() {
 
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
  
    const itemsPerPage = 20;
  
    const fetchSuggestions = useCallback(async () => {
      try {
        const response = await viewSupportedUserIssuesBYUserId(localStorage.getItem('userId'));
        console.log(response);
        if(response.data)
setIssues(response.data) 
        else
        setIssues([])
 } catch (error) {
        console.error('Error fetching suggestions:', error);
        toast.error('Error fetching suggestions.');
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchSuggestions();
      console.log("issu",issues);
    }, []);
    useEffect(() => {
      console.log("issu",issues);
    }, []);
    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
  
    const paginatedSuggestions =issues.length? issues.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ):0
  
    const pageCount = Math.ceil(issues.length / itemsPerPage);
 
    return (
      <div className="table-responsive container mt-5">
        <ToastContainer />
        {loading ? (
          <p className="theme-purple fs-1">Loading...</p>
        ) : issues.length === 0 ? (
          <p className="m-5 text-center fs-1">No issues available</p>
        ) : (
          <>
            <h3 className='theme-purple'>Reported Issues</h3>
            <Table striped bordered hover className="suggestions-table">
              <thead>
                <tr className="text-center">
                  <th className='bg-purple text-white'>Date</th>
               
                  <th className='bg-purple text-white'>Type of Issue</th>
                  <th className='bg-purple text-white'>Severity</th>
                  <th className='bg-purple text-white'>Location</th>
                  <th className='bg-purple text-white'>Time</th>
                  <th className='bg-purple text-white'>Attachments</th>

                  <th className='bg-purple text-white'>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {paginatedSuggestions.map((suggestion, index) => (
                  <tr key={index}>
                    <td>{suggestion.dateTime.slice(0, 10)}</td>
                    <td>{suggestion.type}</td>
                    <td>{suggestion.severity}</td>
                    <td>{suggestion.location}</td>
                    <td>{suggestion.dateTime.slice(11, 16)}</td>
                    <td><a href={ `${IMG_BASE_URL}/${suggestion.file?.filename}`} target="_blank" rel="noopener noreferrer"> <FaFile className='theme-purple mx-1'/> Click Here</a>
                    </td>
                    <td>
                      <div className='text-center'>
                       <Link to={`/user-view-suggestion-details/${suggestion._id}`} ><button className="btn bg-purple opacity-50 m-1 text-white">View Details</button></Link>

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
    );
  };



export default UserViewSuggestions