import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await axios.get('http://localhost:8080/api/orders/checkout', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        const cf = window.confirm('Ban co chac?');
        if (cf) {
            try {
                const token = localStorage.getItem('accessToken');
                await axios.delete(`http://localhost:8080/api/orders/checkout/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Danh sách đơn hàng đã đặt</h1>

            {orders.map((order) => (
                <div className="card mb-4" key={order.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h3 className="mb-0 no-wrap">Đơn hàng #{order.id}</h3>
                                <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                                    Xóa
                                </button>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Ngày đặt hàng: {order.orderdate}</p>
                                <p className="card-text">Địa chỉ: {order.address}</p>
                                <p className="card-text">Số điện thoại: {order.phone}</p>
                                <p className="card-text">Tổng tiền: {order.total}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h4 className="mt-5">Danh sách sản phẩm:</h4>
                                <ul className="list-group">
                                    {order.items.map((item) => (
                                        <li className="list-group-item" key={item.id}>
                                            <p className="mb-1 product-name">{item.title}</p>
                                            <p className="mb-1">Số lượng: {item.quantity}</p>
                                            <p className="mb-1">Giá: {item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;
