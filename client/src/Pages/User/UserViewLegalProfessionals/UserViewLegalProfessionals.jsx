import React, { useState, useEffect, useCallback } from 'react';
import './UserViewLegalProfessionals.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import demoLegalProfessional from '../../../Assets/legal-professional-registration.png';
import { IMG_BASE_URL, viewAllApprovedLegalProfessionals } from '../../../Services/apiService';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserViewLegalProfessionals = () => {
  const [legalProfessionals, setLegalProfessionals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8; // 2 rows per page and 4 cards per row
  const navigate = useNavigate();

  const fetchLegalProfessionals = useCallback(async () => {
    try {
      const response = await viewAllApprovedLegalProfessionals();
      setLegalProfessionals(response.data || []);
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

  const handleCardClick = (id) => {
    navigate(`/user-legal-professional-detail/${id}`);
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
          <p className="m-5 text-center fs-1">No legal professionals found</p>
        ) : (
          paginatedProfessionals.map((legalProfessional, index) => (
            <div key={legalProfessional._id} className='col-md-3'>
              <div
                className='card m-3 cursor-pointer user-view-legal-professionals-card'
                onClick={() => handleCardClick(legalProfessional._id)}
              >
                <img
                  src={legalProfessional.photo && legalProfessional.photo.filename ? `${IMG_BASE_URL}/${legalProfessional.photo.filename}` : demoLegalProfessional}
                  alt='Legal Professional'
                  className='card-img-top img-fluid'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = demoLegalProfessional;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
        previousLinkClassName={'page-link '}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        activeLinkClassName={'bg-purple text-white'}
      />
    </div>
  );
};

export default UserViewLegalProfessionals;
