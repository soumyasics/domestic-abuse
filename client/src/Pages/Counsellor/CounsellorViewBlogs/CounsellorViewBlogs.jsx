import React, { useEffect, useState } from 'react';
import './CounsellorViewBlogs.css';
import { deleteBlogsById, getBlogsByCounsellorId, IMG_BASE_URL } from '../../../Services/apiService'; // Assuming getBlogs is the function to fetch blogs from backend
import demo from '../../../Assets/blog-demo.png';
import { FaRegCalendarAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CounsellorViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;
const navigate=useNavigate()
const fetchBlogs = async () => {
  try {
    const response = await getBlogsByCounsellorId(localStorage.getItem('counsellorId'));
    console.log("bol",response);
    setBlogs(response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};
  useEffect(() => {
    // Fetch blogs from backend


    fetchBlogs();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
 const deleteBlogsById1=async(id)=>{
    try {
        const response =await  deleteBlogsById(id);
        console.log('del supporter response:', response);

        if (response.status==200) {
            toast.success('Blog Removed successfully');
fetchBlogs()
            navigate('/counsellor-view-blogs');
        } else {
            toast.success(response.message || 'Blog updated successfully');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('An error occurred while updating the profile');
    }


 }

  const displayBlogs = blogs
    .slice(currentPage * blogsPerPage, (currentPage + 1) * blogsPerPage)
    .map((blog) => (
      <div>
     
      <div className='row bg-creamy m-5' key={blog.id}>
        <div className='col m-5'>
          <img
            src={blog.image ? `${IMG_BASE_URL}/${blog.image.filename}` : demo}
            alt='blog demo'
            className='img-fluid object-fit-contain px-5'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = demo;
            }}
          />
        </div>
        <div className='col'>
          <div className='row theme-purple m-5'>
            <div className='col'>
              <h5>{blog.author}</h5>
            </div>
            <div className='col d-flex justify-content-center align-items-center'>
              <h5>
                <span className='me-2'><FaRegCalendarAlt size={20} /></span>
                <span className='my-4'>{new Date(blog.date).toLocaleDateString()}</span>
              </h5>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <h5 className='theme-purple'>{blog.title}</h5>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col'>
              <p className='fs-6'>{blog.content}</p>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col text-end'>
              <span><Link to={`/counsellor-edit-blogs/${blog._id}`}><button className='btn rounded bg-purple px-5 m-2 text-white'>Edit</button></Link></span>
              <span><button className='btn rounded bg-purple px-5 m-2 text-white' onClick={()=>{deleteBlogsById1(blog._id)}}>Remove</button></span>
            </div>
          </div>
        </div>
      </div>
      </div>
    ));

  return (
    <div className='container-fluid'>
      <div className='row m-5 mb-2'>
        <div className='col text-center theme-purple'>
          <h5 className=''>Counsellor Blogs</h5>
          <h3 className='supporter-view-blogs-heading-bordersupporter-view-blogs-heading-border border-bottom border-5 rounded w-50 d-flex justify-content-center m-auto'>
            Come and Join Our Family
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {displayBlogs}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(blogs.length / blogsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
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
      </div>
    </div>
  );
}

export default CounsellorViewBlogs;
