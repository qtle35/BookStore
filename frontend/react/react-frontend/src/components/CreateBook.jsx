import React, { useState, useEffect, useCallback } from 'react';
import BookService from '../services/BookService';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './style/CreateBook.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [book, setBook] = useState({});
    const [isEditable, setIsEditable] = useState(id === '-1' ? true : false);
    const [errors, setErrors] = useState({});

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(acceptedFiles);
        setBook((prevState) => ({
            ...prevState,
            image: '',
        }));
    }, []);

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const imageURL = URL.createObjectURL(selectedFiles[0]);
            setImagePreview(imageURL);
        } else if (book.image) {
            setImagePreview(`data:image;base64,${book.image}`);
        } else {
            setImagePreview('');
        }
    }, [selectedFiles, book.image]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
    });

    useEffect(() => {
        return () => {
            selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [selectedFiles]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await BookService.getBook(id);
                setBook(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (id !== '-1') {
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isEditable) {
            setIsEditable(true);
            return;
        }
        const validationErrors = {};
        if (!book.title) {
            validationErrors.title = 'Please enter the title';
        }
        if (!book.author) {
            validationErrors.author = 'Please enter the author';
        }
        if (!book.description) {
            validationErrors.description = 'Please enter the description';
        }
        if (!book.category) {
            validationErrors.category = 'Please select a category';
        }
        if (!book.sold) {
            validationErrors.sold = 'Please enter the number of sold copies';
        }
        if (!book.date) {
            validationErrors.date = 'Please enter the date established';
        }
        if (!book.page) {
            validationErrors.page = 'Please enter the number of pages';
        }
        if (!book.price) {
            validationErrors.price = 'Please enter the price';
        }
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (selectedFiles.length === 0 && id === '-1') {
            alert('hãy chọn ảnh');
            return;
        }
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('description', book.description);
        formData.append('category', book.category);
        formData.append('sold', book.sold);
        formData.append('date', book.date);
        formData.append('page', book.page);
        formData.append('price', book.price);
        if (selectedFiles.length > 0) {
            formData.append('image1', selectedFiles[0]);
        }

        try {
            setBook((prevState) => ({
                ...prevState,
                image: '',
            }));
            if (id === '-1') {
                await BookService.createBook(formData);
            } else {
                await BookService.updateBook(formData, id);
            }
            navigate('/book');
        } catch (error) {
            if (error !== Object) { alert(error.response.data) };
        }
    };

    const handleCancel = () => {
        navigate('/book');
    };

    return (
        <form className="container form-control">
            <h1>Book</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className={`col-lg-10 form-control ${errors.title ? 'is-invalid' : ''}`}
                                value={book.title || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Author</label>
                            <input
                                type="text"
                                name="author"
                                className={`col-lg-10 form-control ${errors.author ? 'is-invalid' : ''}`}
                                value={book.author || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                        </div>
                    </div>
                    <hr />
                    <div className="col">
                        <label className="col-lg-12 form-label">Description about the book</label>
                        <textarea
                            className={`col-lg-11 form-control ${errors.description ? 'is-invalid' : ''}`}
                            name="description"
                            cols="30"
                            value={book.description || ''}
                            onChange={handleChange}
                            disabled={!isEditable}
                            required
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label">Date Established</label>
                            <input
                                type="date"
                                name="date"
                                className={`col-lg-10 form-control ${errors.date ? 'is-invalid' : ''}`}
                                value={book.date || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Number of pages</label>
                            <input
                                type="number"
                                name="page"
                                className={`col-lg-10 form-control ${errors.page ? 'is-invalid' : ''}`}
                                value={book.page || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.page && <div className="invalid-feedback">{errors.page}</div>}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <label className="form-label">Category</label>
                            <select
                                className={`col-lg-10 form-select ${errors.category ? 'is-invalid' : ''}`}
                                name="category"
                                onChange={handleChange}
                                disabled={!isEditable}
                                value={book.category || ''}
                                required
                            >
                                <option disabled value="">
                                    Select a category
                                </option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Historical">Historical</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label">Sold Copies</label>
                            <input
                                type="number"
                                name="sold"
                                className={`col-lg-10 form-control ${errors.sold ? 'is-invalid' : ''}`}
                                value={book.sold || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.sold && <div className="invalid-feedback">{errors.sold}</div>}
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label">Price (vnd)</label>
                            <input
                                type="number"
                                name="price"
                                className={`col-lg-10 form-control ${errors.price ? 'is-invalid' : ''}`}
                                value={book.price || ''}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>
                    </div>

                    <hr />
                    {user && user.rol[0] === 'ADMIN' && (
                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                {id === '-1' ? 'Add' : isEditable ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="col-lg-6">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className={selectedFiles.length > 0 ? 'd-none' : ''}>Tải ảnh lên</p>
                        <div className="image-preview-container">
                            {selectedFiles.length > 0 && (
                                <img className="image-preview" src={imagePreview} alt="preview" />
                            )}
                            {id !== '-1' && selectedFiles.length === 0 && (
                                <img className="image-preview" src={imagePreview} alt="preview3" />
                            )}
                        </div>
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateBook;
