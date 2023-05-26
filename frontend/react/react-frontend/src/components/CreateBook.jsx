import React, { useState, useEffect, useCallback } from 'react';
import BookService from '../services/BookService';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'


const CreateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [book, setbook] = useState({});
    const [isEditable, setIsEditable] = useState(id === '-1' ? true : false);
    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(acceptedFiles)
        setbook((prevState) => ({
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
        accept: { "image/*": [] },
    });
    useEffect(() =>
        () => {
            selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        }, [selectedFiles]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await BookService.getBooks(id);
                setbook(res.data);
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
        setbook((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isEditable) {
            event.preventDefault();
            setIsEditable(true);
            return;
        }
        setbook((prevState) => ({
            ...prevState,
            image: '',
        }));
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
        else {

        }

        try {
            if (id === '-1') {
                await BookService.createBook(formData);
            } else {
                await BookService.updateBook(formData, id);
            }
            navigate('/book');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        navigate('/book');
    };
    return (
        <form className="container form-control" >
            <h1>Book</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label">Title</label>
                            <input type="text" name='title' className="col-lg-10  form-control" value={book.title} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Author</label>
                            <input type="text" name='author' className="col-lg-10  form-control" value={book.author} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className="col">
                        <label className="col-lg-12 form-label">Description about the book</label>
                        <textarea className="col-lg-11  form-control" name='description' cols="30" value={book.description} onChange={handleChange} disabled={!isEditable} ></textarea>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label">Date
                                Established</label>
                            <input type="date" name='date' className="col-lg-10  form-control" value={book.date} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Number of pages</label>
                            <input type="number" name='page' className="col-lg-10  form-control" value={book.page} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className="col-4">
                            <label className="form-label">Category</label>
                            <select
                                className="border-1 form-select"
                                name='category'
                                onChange={handleChange}
                                disabled={!isEditable}
                                defaultValue={book.category ? book.category : "default"}
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="Action" selected={book.category === "Action"}>Action</option>
                                <option value="Comedy" selected={book.category === "Comedy"}>Comedy</option>
                                <option value="Fantasy" selected={book.category === "Fantasy"}>Fantasy</option>
                                <option value="Historical" selected={book.category === "Historical"}>Historical</option>
                                <option value="Horror" selected={book.category === "Horror"}>Horror</option>
                                <option value="Romance" selected={book.category === "Romance"}>Romance</option>
                                <option value="Thriller" selected={book.category === "Thriller"}>Thriller</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label">Sold Copies</label>
                            <input type="number" name='sold' className="col-lg-10  form-control" value={book.sold} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label">Price (vnd)</label>
                            <input type="number" name='price' className="col-lg-10  form-control" value={book.price} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className="col-12">
                        <button type='submit' className="btn btn-success" onClick={handleSubmit}>{id === 0 ? 'Add' : (isEditable ? 'Save' : 'Edit')}</button>
                    </div>
                    {/* <label>{book.imagePath}</label> */}
                </div>

                <div className="col-lg-6">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className={selectedFiles.length > 0 ? "d-none" : ""}>Tải ảnh lên</p>
                        <div className="image-preview-container">

                            {selectedFiles.length > 0 && (
                                <img className="image-preview" src={imagePreview} alt="preview" />
                            )}
                            {id !== '-1' && selectedFiles.length === 0 && (
                                <img className="image-preview" src={imagePreview} alt="preview3" />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
};

export default CreateBook;
