import React, { useEffect, useState } from 'react';
import './SupporterEditBlogs.css';
import { deleteBlogsById, editBlogsById, IMG_BASE_URL, viewBlogsById } from '../../../Services/apiService';
import demo from '../../../Assets/blog-demo.png';
import { PiPencilDuotone } from "react-icons/pi";
import { useParams,Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SupporterEditBlogs() {

    const {id}=useParams()
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        image: {filename:''},
    });

    
  useEffect(() => {
    // Fetch blogs from backend
    const fetchBlogs = async () => {
      try {
        const response = await viewBlogsById(id);
        console.log("bol",response);
        setFormValues(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
const navigate=useNavigate()
    const [errors, setErrors] = useState({});
    const validate = () => {
        const errors = {};

        if (!formValues.title) {
            errors.title = "Blog title is required";
        }

        if (!formValues.content) {
            errors.content = "content is required";
        }

        if (!formValues.image) {
            errors.image = "Cover image is required";
        } else if (!/\.(jpg|jpeg|png|gif)$/i.test(formValues.image.title)) {
            errors.image = "Only image files are allowed (jpg, jpeg, png, gif)";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { title, value, files } = e.target;
        if (title === 'image') {
            setFormValues({ ...formValues, [title]: files[0] });
        } else {
            setFormValues({ ...formValues, [title]: value });
        }
    };

    const handleSubmit = (e) => {
       e.preventDefault()
             
                try {
                    const response =  editBlogsById(id,formValues);
                    console.log('Edit supporter response:', response);
    
                    if (response.status==200) {
                        toast.success('Blog updated successfully');
                        navigate('/supporter-view-blogs');
                    } else {
                        toast.success(response.message || 'Blog updated successfully');
                    }
                } catch (error) {
                    console.error('Error updating profile:', error);
                    toast.error('An error occurred while updating the profile');
                }
    
        
    };


    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Edit Blogs</h3>
                </div>
            </div>
            <div className='row m-5  d-flex justify-content-center align-items-center '>
                <div className='col-8 border border-5 mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row m-5'>
                            <div className='col position-relative'>
                                <div className='overflow-hidden'>
                                    <img
                                        src={formValues.image && formValues.image.filename ? `${IMG_BASE_URL}/${formValues.image.filename}` : demo}
                                        alt='blog demo'
                                        className='img-fluid'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = demo;
                                        }}

                                    />
                                </div>

                                <div className='rounded-circle p-2 m-3 bg-white top-0 end-0 border-light position-absolute cursor-pointer'>
                                    <label htmlFor="imageUpload" className="image-upload-label cursor-pointer">
                                        <PiPencilDuotone color={'#59244C'} size={30} />
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        title="image"
                                        // accept="image/*"
                                        className={`image-upload-input cursor-pointer ${errors.image ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {errors.image && <div id="imageError" className="invalid-feedback ms-2">{errors.image}</div>}
                            </div>
                            <div className='col'>
                                <div className='row m-5'>
                                    <div className='col-4 text-center d-flex align-items-center '>
                                        <h5 className='theme-purple justify-content-center'>Blog title</h5>
                                    </div>
                                    <div className='col-8'>
                                        <div className='input-group w-100'>
                                            <input
                                                type='text'
                                                title='title'
                                                value={formValues.title}
                                                onChange={handleChange}
                                                className={`form-control  supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.title ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.title && <div id="titleError" className="invalid-feedback ms-2">{errors.title}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className='row m-5'>
                                    <div className='col-4 text-center d-flex align-items-center'>
                                        <h5 className='theme-purple justify-content-center'>content</h5>
                                    </div>
                                    <div className='col-8'>
                                        <div className='input-group w-100'>
                                            <textarea
                                                title='content'
                                                value={formValues.content}
                                                onChange={handleChange}
                                                className={`form-control  supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.content ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.content && <div id="contentError" className="invalid-feedback ms-2">{errors.content}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'></div>
                            <div className='col-4 text-end'>
                                <button type='submit' className='btn text-white bg-purple py-2 px-5 ' onClick={handleSubmit}>Update</button>
                            </div>
                            <div className='col-4 text-end'>
                                {/* <button type='button' className='btn text-white bg-purple py-2 px-5 ' >Cancel</button> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default SupporterEditBlogs