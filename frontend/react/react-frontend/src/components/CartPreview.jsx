import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    CartStateContext,
    CartDispatchContext,
    removeFromCart,
    toggleCartPopup
} from "./CartContext";
import "./Cart.scss"

const CartPreview = () => {
    const navigate = useNavigate();
    const { items, isCartOpen } = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);

    const handleRemove = (productId) => {
        return removeFromCart(dispatch, productId);
    };

    const handleProceedCheckout = () => {
        toggleCartPopup(dispatch);
        // navigate("/checkout");
    };

    return (
        <div className={`cart-preview ${isCartOpen ? "active" : ""}`}>
            <ul className="cart-items">
                {items.map((product) => {
                    return (
                        <li className="cart-item" key={product.name}>
                            <img
                                className="product-image"
                                src={`data:image;base64,${product.image}`}
                                alt="Product"
                            />
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">{product.price}</p>
                            </div>
                            <div className="product-total">
                                <p className="quantity">
                                    {`Số lượng: ${product.quantity} `}
                                </p>
                                <p className="amount">{product.quantity * product.price}</p>
                            </div>
                            <button
                                className="product-remove"
                                onClick={() => handleRemove(product.id)}
                            >
                                ×
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CartPreview;
