import React, { useState, useEffect, useCallback } from 'react';
import './UserViewLegalProfessionals.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL, viewAllApprovedLegalProfessionals } from '../../../Services/apiService';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserViewLegalProfessionals = () => {
  const {id}=useParams()
  const {x}=useParams()
  const [legalProfessionals, setLegalProfessionals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8; // 2 rows per page and 4 cards per row
  const navigate = useNavigate();

  const fetchLegalProfessionals = useCallback(async () => {
    try {
      const response = await viewAllApprovedLegalProfessionals();
      setLegalProfessionals(response || []);
    } catch (error) {
      console.error('Error fetching legal professionals:', error);
      toast.error('Error fetching legal professionals.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegalProfessionals();
  }, [fetchLegalProfessionals]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleCardClick = (advId) => {
    navigate(`/user-legal-professional-detail/${id}/${advId}`);
  };

  const paginatedProfessionals = legalProfessionals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(legalProfessionals.length / itemsPerPage);

  return (
    <div className='container-fluid'>
      <ToastContainer />
      <div className='row my-5 mx-3'>
        <div className='col'>
          <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate('/user-home')} />
        </div>
        <div className='col text-end d-flex justify-content-end'>
          <div className='input-group w-50'>
            <input
              type='text'
              id='search'
              name='search'
              className='form-control bg-creamy border border-end-0 rounded-start-2'
              placeholder='Search Legal Professionals'
            />
            <span className='bg-purple text-white text-center px-4 d-flex align-items-center justify-content-center border border-start-0 rounded-end-2 cursor-pointer'>
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      <div className='row m-5'>
        <div className='col text-center'>
          <h3 className='theme-purple'>Legal Professionals</h3>
        </div>
      </div>
      <div className='row m-5'>
        {loading ? (
          <p className="theme-purple fs-1">Loading...</p>
        ) : paginatedProfessionals.length === 0 ? (
          <p className="m-5 text-center fs-3 theme-purple">No legal professionals found</p>
        ) : (
          paginatedProfessionals.map((legalProfessional, index) => (
            <div key={legalProfessional._id} className='col-auto m-5'>
              <div
                className='card m-3 cursor-pointer user-view-legal-professionals-card'
                onClick={() => handleCardClick(legalProfessional._id)}
              >
                <img
                  src={legalProfessional.photo && legalProfessional.photo.filename ? `${IMG_BASE_URL}/${legalProfessional.photo.filename}` : demoLegalProfessional}
                  alt='Legal Professional'
                  className='card-img-top'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = demoLegalProfessional;
                  }}
                />
                <div className='card-body bg-purple text-white text-center'>
                  <h5 className='card-title mt-5'>{legalProfessional.name}</h5>
                  <h5 className='card-title mb-5'>{legalProfessional.firmName}</h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
  );
};

export default UserViewLegalProfessionals;
