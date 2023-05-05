import React, { useEffect, useState } from 'react';
import LaptopService from '../services/LaptopService';
import { useNavigate } from 'react-router-dom';

function ListLaptopComponent() {
    const navigate = useNavigate();
    const [laptops, setLaptops] = useState([]);
    const [searchResult, setsearchResult] = useState([]);

    useEffect(() => {
        LaptopService.getAllLaptops().then((res) => {
            setLaptops(res.data);
            setsearchResult(res.data);
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
    const searchLaptop = (e) => {
        const value = e.target.value;
        const filteredLaptops = laptops.filter(
            (laptop) => {
                if (value === null) {
                    return laptop
                }
                else {
                    return laptop.name.toLowerCase().includes(value.toLowerCase()) ||
                        laptop.brand.toLowerCase().includes(value.toLowerCase())
                }

            }

        );
        setsearchResult(filteredLaptops);
    };

    return (
        <div className="container">
            <div className="row search-container">
                <h1>List laptops</h1>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search by name or brand..."
                    onChange={searchLaptop}
                />
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
                    {searchResult.map((laptop) => (
                        <tr key={laptop.id}>
                            <td>{laptop.id}</td>
                            <td>{laptop.name}</td>
                            <td>{laptop.price}</td>
                            <td>{laptop.brand}</td>
                            <td><input type="checkbox" defaultChecked={laptop.sold} /></td>
                            <td>{laptop.nsx}</td>
                            <td>{laptop.imageData}</td>
                            <td>
                                <button onClick={() => viewLaptop(laptop.id)} className='btn btn-success' >View</button>
                                <button onClick={() => deleteLaptop(laptop.id)} className='btn btn-danger' >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success col-lg-12" onClick={addLaptop}>
                New laptop
            </button>
        </div>
    );
};

export default ListLaptopComponent;
