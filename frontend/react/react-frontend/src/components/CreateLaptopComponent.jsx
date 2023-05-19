import React, { useState, useEffect, useCallback } from 'react';
import LaptopService from '../services/LaptopService';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'


const CreateLaptopComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [laptop, setLaptop] = useState({
        name: '',
        price: '',
        brand: '',
        sold: false,
        nsx: '',
        image: ''
    });
    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(acceptedFiles)
        setLaptop((prevState) => ({
            ...prevState,
            image: '',
          }));
    }, []);
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
                const res = await LaptopService.getLaptops(id);
                setLaptop(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (id !== '-1') {
            fetchData();
        }
    }, [id]);
    const checkDuplicate = async () => {
        try {
            const res = await LaptopService.getAllLaptops();
            const laptops = res.data;
            const duplicatedLaptop = laptops.find(laptops => laptops.name === laptop.name && laptops.brand === laptop.brand);

            if (duplicatedLaptop) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLaptop((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const isDuplicate = await checkDuplicate();
        const formData = new FormData();
        formData.append('name', laptop.name);
        formData.append('price', laptop.price);
        formData.append('brand', laptop.brand);
        formData.append('sold', laptop.sold);
        formData.append('nsx', laptop.nsx);
        formData.append('image', laptop.image);
        if (selectedFiles.length > 0) {
            
            formData.append('image1', selectedFiles[0]);
        }

        try {
            if (id === '-1') {

                if (isDuplicate) {

                    alert('Laptop da ton tai!');
                    return;
                }
                await LaptopService.createLaptop(formData);
            } else {
                await LaptopService.updateLaptop(formData, id);
            }
            navigate('/laptop');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        navigate('/laptop');
    };
    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h1>{id === '-1' ? 'Add a new laptop' : 'Edit laptop'}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                placeholder="*"
                                type="text"
                                className="form-control"
                                name="name"
                                value={laptop.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={laptop.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="brand"
                                value={laptop.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sold:</label>
                            <input
                                type="checkbox"
                                name="sold"
                                checked={laptop.sold}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>NSX:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="nsx"
                                value={laptop.nsx}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className={selectedFiles.length > 0 ? "d-none" : ""}>Tải ảnh lên</p>
                                <div className="image-preview-container">

                                    {selectedFiles.length > 0 && (
                                        <img className="image-preview" src={URL.createObjectURL(selectedFiles[0])} alt="preview" />
                                    )}
                                    {laptop.image !== '' && selectedFiles.length === 0 && (
                                        <img className="image-preview" src={`data:image/jpeg;base64,${laptop.image}`} alt="preview" />
                                    )}

                                </div>
                            </div>
                        </div>


                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                        <button className='btn btn-danger' onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLaptopComponent;
