import React, { useEffect, useState } from 'react';
import LaptopService from '../services/LaptopService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListLaptopComponent() {
    const navigate = useNavigate();
    const [laptops, setLaptops] = useState([]);
    const [filteredLaptops, setFilteredlaptops] = useState([]);
    const [k, setK] = useState('')

    useEffect(() => {
        LaptopService.getAllLaptops().then((res) => {
            setLaptops(res.data);
            setFilteredlaptops(res.data);
        });
    }, []);

    const addLaptop = () => {
        navigate('/laptop/-1');
    };

    const viewLaptop = (id) => {
        navigate(`/laptop/${id}`);
    };

    const deleteLaptop = async (id) => {
        try {
            await LaptopService.deleteLaptop(id);
            setLaptops(laptops.filter((laptop) => laptop.id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setFilteredlaptops(laptops.filter((laptop) => {
            return laptop.name.toLowerCase().includes(k.toLowerCase()) ||
                laptop.brand.toLowerCase().includes(k.toLowerCase())
        }))
    }, [laptops, k])
    const searchButton = () => {
        axios.get(`http://localhost:8080/api/v1/laptops?name=${k}`)
            .then((res) => {
                setLaptops(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="container">
            <div className="row search-container">
                <h1>List laptops</h1>
                <div className='btn-group'>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search by name or brand..."
                        onChange={(e) => setK(e.target.value)}
                        id='1'
                    />
                    <button onClick={searchButton} className='btn btn-outline-success'>Search </button>
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Sold</th>
                        <th>Nsx</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLaptops.map((laptop) => (

                        <tr key={laptop.id}>
                            <td>{laptop.id}</td>
                            <td>{laptop.name}</td>
                            <td>{laptop.price}</td>
                            <td>{laptop.brand}</td>
                            <td><input type="checkbox" defaultChecked={laptop.sold} disabled /></td>
                            <td>{laptop.nsx}</td>
                            <td>
                                <img src={`data:image;base64,${laptop.image}`} alt="" />
                            </td>

                            <td>
                                <button onClick={() => viewLaptop(laptop.id)} className='btn btn-outline-success' >View</button>
                                <button onClick={() => deleteLaptop(laptop.id)} className='btn btn-danger' >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-outline-success col-lg-2 offset-md-5 offset-md-5" onClick={addLaptop}>
                New laptop
            </button>
        </div>
    );
};

export default ListLaptopComponent;
