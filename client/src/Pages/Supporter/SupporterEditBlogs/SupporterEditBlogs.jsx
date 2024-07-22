import React, { useEffect, useState } from 'react';
import './SupporterEditBlogs.css';
import { deleteBlogsById, editBlogsById, IMG_BASE_URL, viewBlogsById } from '../../../Services/apiService';
import demo from '../../../Assets/blog-demo.png';
import { PiPencilDuotone } from "react-icons/pi";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupporterEditBlogs() {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        image: null,
    });

    useEffect(() => {
        // Fetch blogs from backend
        const fetchBlogs = async () => {
            try {
                const response = await viewBlogsById(id);
                console.log("Blog", response);
                setFormValues(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [id]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!formValues.title) errors.title = "Blog title is required";
        if (!formValues.content) errors.content = "Content is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormValues({ ...formValues, image: files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        console.log("fun called",validate());
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('content', formValues.content);
        if (formValues.image) formData.append('image', formValues.image);

        try {
            const response = await editBlogsById(id, formData);
            console.log('Edit blog response:', response);

            if (response.status === 200) {
                toast.success('Blog updated successfully');
                navigate('/supporter-view-blogs');
            } else {
                toast.error(response.message || 'Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('An error occurred while updating the blog');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Edit Blog</h3>
                </div>
            </div>
            <div className='row m-5 d-flex justify-content-center align-items-center'>
                <div className='col-8 border border-5 mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row m-5'>
                            <div className='col position-relative'>
                                <div className='overflow-hidden'>
                                    <img
                                        src={formValues.image ? `${IMG_BASE_URL}/${formValues.image.filename}` : demo}
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
                                        name="image"
                                        accept="image/*"
                                        className={`image-upload-input cursor-pointer ${errors.image ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {errors.image && <div id="imageError" className="invalid-feedback ms-2">{errors.image}</div>}
                            </div>
                            <div className='col'>
                                <div className='row m-5'>
                                    <div className='col-4 text-center d-flex align-items-center'>
                                        <h5 className='theme-purple'>Blog Title</h5>
                                    </div>
                                    <div className='col-8'>
                                        <div className='input-group w-100'>
                                            <input
                                                type='text'
                                                name='title'
                                                value={formValues.title}
                                                onChange={handleChange}
                                                className={`form-control supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.title ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            {errors.title && <div id="titleError" className="invalid-feedback ms-2">{errors.title}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className='row m-5'>
                                    <div className='col-4 text-center d-flex align-items-center'>
                                        <h5 className='theme-purple'>Content</h5>
                                    </div>
                                    <div className='col-8'>
                                        <div className='input-group w-100'>
                                            <textarea
                                                name='content'
                                                value={formValues.content}
                                                onChange={handleChange}
                                                className={`form-control supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.content ? 'is-invalid' : ''}`}
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
                                <button type='submit' className='btn text-white bg-purple py-2 px-5'>Update</button>
                            </div>
                            <div className='col-4 text-end'>
                                <button type='button' className='btn text-white bg-purple py-2 px-5' onClick={() => navigate('/supporter-view-blogs')}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SupporterEditBlogs;
