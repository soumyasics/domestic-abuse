import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SupporterViewAllIssues.css';
//import { fetchUserSuggestions } from '../../../Services/apiService';

const SupporterViewAllIssues= () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 20;

  const fetchSuggestions = useCallback(async () => {
    try {
    //   const response = await fetchUserSuggestions();
    //   setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Error fetching suggestions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedSuggestions = suggestions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(suggestions.length / itemsPerPage);

  return (
    <div className="table-responsive">
      <ToastContainer />
      {loading ? (
        <p className="theme-purple fs-1">Loading...</p>
      ) : suggestions.length === 0 ? (
        <p className="m-5 text-center fs-1">No suggestions available</p>
      ) : (
        <>
          <Table striped bordered hover className="suggestions-table">
            <thead>
              <tr className="text-center">
                <th className='bg-purple text-white'>User Name</th>
                <th className='bg-purple text-white'>Gender</th>
                <th className='bg-purple text-white'>Date of Birth</th>
                <th className='bg-purple text-white'>Type of Issue</th>
                <th className='bg-purple text-white'>Severity</th>
                <th className='bg-purple text-white'>Location</th>
                <th className='bg-purple text-white'>Date</th>
                <th className='bg-purple text-white'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {paginatedSuggestions.map((suggestion, index) => (
                <tr key={index}>
                  <td>{suggestion.name}</td>
                  <td>{suggestion.gender}</td>
                  <td>{suggestion.dob}</td>
                  <td>{suggestion.typeOfIssue}</td>
                  <td>{suggestion.severity}</td>
                  <td>{suggestion.location}</td>
                  <td>{suggestion.date}</td>
                  <td>
                    <div className='text-center'>
                      <button className="btn bg-purple opacity-50 m-1">Suggestions</button>
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

export default SupporterViewAllIssues;
