import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from './context/AuthContext';
import {
    CartStateContext,
    CartDispatchContext,
    toggleCartPopup,
    removeFromCart
} from "./context/CartContext";
import CartPreview from "./CartPreview";

const Navbar = () => {
    const { items: cartItems, isCartOpen } = useContext(CartStateContext);
    const cartDispatch = useContext(CartDispatchContext);
    const cartQuantity = cartItems.length;
    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);
    const handleCartButton = (event) => {
        event.preventDefault();
        return toggleCartPopup(cartDispatch);
    };
    const { user, userLogout } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!storedUser);
        setUserName(storedUser?.name || '');
    }, [localStorage.getItem('user')]);
    const enterMenuStyle = () => {
        return isLoggedIn ? 'd-none' : 'd-block';
    };

    const handleLogout = () => {
        userLogout();
        removeFromCart();
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Book Store</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                </div>
                <div className="ml-auto">
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <React.Fragment>
                                <li className="nav-item">
                                    <span className="nav-link">{userName}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <li className="nav-item" style={{ display: enterMenuStyle() }}>
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="cart">
                    <div className="cart-info">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Số lượng</td>
                                    <td>:</td>
                                    <td>
                                        <strong>{cartQuantity}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền</td>
                                    <td>:</td>
                                    <td>
                                        <strong>{cartTotal}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a className="cart-icon" href="#" onClick={handleCartButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="35" fill="green" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        {cartQuantity ? (
                            <span className="cart-count">{cartQuantity}</span>
                        ) : (
                            ""
                        )}
                    </a>
                    <CartPreview />
                </div>
            </div>
        </nav >
    );
}

export default Navbar;
