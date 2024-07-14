import React, { useState } from 'react';
import './CounsellorAddBlogs.css';
import { addBlog } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CounsellorAddBlogs() {
    const [formValues, setFormValues] = useState({
        counsellorId: localStorage.getItem('counsellorId'),
        title: '',
        content: '',
        image: null,
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const errors = {};

        if (!formValues.title) {
            errors.title = "Blog title is required";
        }

        if (!formValues.content) {
            errors.content = "Content is required";
        }

        if (!formValues.image) {
            errors.image = "Cover image is required";
        } else if (!/\.(jpg|jpeg|png|gif)$/i.test(formValues.image.name)) {
            errors.image = "Only image files are allowed (jpg, jpeg, png, gif)";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormValues({ ...formValues, [name]: files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await addBlog(formValues, localStorage.getItem('counsellorId'));
            if (response.success) {
                toast.success('Blog registered successfully!');
                setTimeout(() => {
                    navigate('/counsellor-view-all-blogs');
                }, 1000);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error registering blog', error);
            toast.error('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Add Blogs</h3>
                </div>
            </div>
            <div className='row m-5 d-flex justify-content-center align-items-center'>
                <div className='col-6 border border-5 mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'>
                                <h4 className='theme-purple justify-content-center'>Blog Title</h4>
                            </div>
                            <div className='col-8'>
                                <div className='input-group'>
                                    <input
                                        type='text'
                                        name='title'
                                        value={formValues.title}
                                        onChange={handleChange}
                                        className={`form-control form-control-lg supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.title ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.title && <div id="titleError" className="invalid-feedback ms-2">{errors.title}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'>
                                <h4 className='theme-purple justify-content-center'>Content</h4>
                            </div>
                            <div className='col-8'>
                                <div className='input-group'>
                                    <textarea
                                        name='content'
                                        value={formValues.content}
                                        onChange={handleChange}
                                        className={`form-control form-control-lg supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.content ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.content && <div id="contentError" className="invalid-feedback ms-2">{errors.content}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'>
                                <h4 className='theme-purple justify-content-center'>Cover Image</h4>
                            </div>
                            <div className='col-8'>
                                <div className='input-group'>
                                    <input
                                        type='file'
                                        name='image'
                                        onChange={handleChange}
                                        className={`form-control form-control-lg supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.image ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.image && <div id="imageError" className="invalid-feedback ms-2">{errors.image}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'></div>
                            <div className='col-4 text-end'>
                                <button type='submit' className='btn text-white bg-purple py-2 px-5'>Add Blogs</button>
                            </div>
                            <div className='col-4 text-end'>
                                <button type='button' className='btn text-white bg-purple py-2 px-5'>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CounsellorAddBlogs;
