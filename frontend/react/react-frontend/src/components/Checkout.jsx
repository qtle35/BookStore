import React, { useContext, useState, useEffect } from "react";
import { CartStateContext, CartDispatchContext } from "./context/CartContext";
import { useNavigate } from 'react-router-dom';
import './style/Checkout.css';
import axios from "axios";

const Checkout = () => {
    const { items } = useContext(CartStateContext);
    const navigate = useNavigate()
    const dispatch = useContext(CartDispatchContext);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUserData(userData);
    }, []);
    const handleCheckout = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const order = {
            username: userData.preferred_username,
            address: address,
            phone: phone,
            orderdate: formattedDate,
            items: items.map((product) => ({
                id: product.id,
                title: product.title,
                quantity: product.quantity,
                price: product.price,
            })),
            total: items.reduce((total, product) => total + product.quantity * product.price, 0),
        };
        console.log(order)
        const token = localStorage.getItem('accessToken');
        axios.post("http://localhost:8080/api/orders/checkout", order, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log("Order response:", response.data);
                dispatch({ type: "CLEAR_CART" });
                navigate('/orders')
            })
            .catch((error) => {
                console.error("Order error:", error);
            });
        setAddress("");
        setPhone("");
    };

    const totalPrice = items.reduce((total, product) => {
        return total + product.quantity * product.price;
    }, 0);

    return (
        <div className="checkout-container container">
            <div className="col-sm-3 user-info ">
                <h2>User Information</h2>
                {userData && (
                    <>
                        <p>Email: {userData.email}</p>
                        <p>Name: {userData.name}</p>
                        <p>Username: {userData.preferred_username}</p>
                    </>
                )}
                <form className="form" onSubmit={handleCheckout}>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Checkout</button>
                </form>
            </div>
            <div className="col-sm-9 cart-info card ">
                <div className="card-body">
                    <h2 className="card-title">Cart Details</h2>
                    <ul className="list-group">
                        {items.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="item-name">{product.title}</span>
                                <span className="item-price">{product.price}</span>
                                <span className="item-quantity">x {product.quantity}</span>
                                <span className="item-total">{product.price * product.quantity}vnd</span>
                            </li>
                        ))}
                    </ul>
                    <p className="total-amount text-end">Total Amount: {totalPrice}vnd</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
