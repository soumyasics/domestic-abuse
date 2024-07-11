import React, { useState } from 'react';
import './SupporterAddBlogs.css';

function SupporterAddBlogs() {
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        image: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!formValues.name) {
            errors.name = "Blog name is required";
        }

        if (!formValues.description) {
            errors.description = "Description is required";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Perform the add blog action
            console.log("Blog added successfully", formValues);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row m-5'>
                <div className='col text-center'>
                    <h3 className='theme-purple'>Add Blogs</h3>
                </div>
            </div>
            <div className='row m-5  d-flex justify-content-center align-items-center '>
                <div className='col-6 border border-5 mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center '>
                                <h4 className='theme-purple justify-content-center'>Blog Name</h4>
                            </div>
                            <div className='col-8'>
                                <div className='input-group'>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formValues.name}
                                        onChange={handleChange}
                                        className={`form-control form-control-lg supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.name ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.name && <div id="nameError" className="invalid-feedback ms-2">{errors.name}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row m-5'>
                            <div className='col-4 text-center d-flex align-items-center'>
                                <h4 className='theme-purple justify-content-center'>Description</h4>
                            </div>
                            <div className='col-8'>
                                <div className='input-group'>
                                    <textarea
                                        name='description'
                                        value={formValues.description}
                                        onChange={handleChange}
                                        className={`form-control form-control-lg supporter-add-blog-input opacity-50 shadow m-2 me-0 border ${errors.description ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.description && <div id="descriptionError" className="invalid-feedback ms-2">{errors.description}</div>}
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
                                <button type='submit' className='btn text-white bg-purple py-2 px-5 '>Add Blogs</button>
                            </div>
                            <div className='col-4 text-end'>
                                <button type='button' className='btn text-white bg-purple py-2 px-5 '>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SupporterAddBlogs;
