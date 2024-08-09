import React, { useEffect, useState } from 'react';
import './UserViewSafehouses.css';
import safehouseDemo from '../../../Assets/ADMIN VIEW DETAILS.png';
import { addHouseReqs, IMG_BASE_URL, searchhouseByName, viewAllSafehouses } from '../../../Services/apiService';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

function UserViewSafehouses() {
    const [safehouses, setSafehouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
const [searchdata,setSearchData]=useState()
const [houseReqs,setHouseReqs]=useState({
    userId:localStorage.getItem('userId'),
    houseId:''
})

    const safehousesPerPage = 4;
    const navigate = useNavigate();

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
    const fetchSafehousesByLandMark = async () => {
        try {
            const response = await searchhouseByName(searchdata);
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
        fetchSafehouses()
       
    }, [searchdata]);

    // Handle pagination
    const offset = currentPage * safehousesPerPage;
    const currentSafehouses = safehouses ? safehouses.slice(offset, offset + safehousesPerPage) : [];
    const pageCount = Math.ceil(safehouses.length / safehousesPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData(value);
        console.log(value,searchdata);
    };
// const search=(data)=>{
//     fetchSafehousesByLandMark()
// }
const reqHouse=async(id)=>{
    try {
        houseReqs.houseId=id
        console.log("data to be",houseReqs);
        const response = await addHouseReqs(houseReqs);
        console.log("dy",response.data.data.status);
        if (response.data.status==200) {
          toast.success('Request Send to Supporter');
          
        } else {
          toast.error(response.data.msg);
        }
  } catch (error) {
      console.error('Error Adding Issue', error);
      toast.error(error.response?.data?.message || 'failed to Add Issue. Please try again.');
  }
}
    return (
        <div className='container-fluid'>
            <div className='row my-5 mx-3'>
                <div className='col'>
                    <FaArrowLeftLong size={35} className='cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <div className='col text-end'>
                  <Link to={`/user-view-request-history`}>  <button className='btn bg-purple text-white rounded-4 mx-5'>Request History</button>
                  </Link>
                </div>
                <div className='col text-start'>
                    <div className='input-group'>
                        <input
                            type='text'
                            id='search'
                            name='search'
                            onChange={handleChange}
                            className='form-control bg-creamy  border border-end-0 rounded-start-2'
                            placeholder='Search Safe House'
                        />
                        <span className='bg-purple text-white  text-center px-4 d-flex align-items-center justify-content-center border border-start-0 rounded-end-2 cursor-pointer' onClick={()=> fetchSafehousesByLandMark()}><FaSearch /></span>
                    </div>
                </div>
            </div>
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
                                        <div className='col text-end'>
                                            <button className='btn bg-purple text-white rounded-4 mx-5' onClick={()=>{reqHouse(safehouse._id)}}>Request</button>
                                        </div>
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

export default UserViewSafehouses;
