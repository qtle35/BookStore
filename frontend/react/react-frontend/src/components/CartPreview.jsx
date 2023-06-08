import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    CartStateContext,
    CartDispatchContext,
    removeFromCart,
    toggleCartPopup
} from "./context/CartContext";
import "./style/Cart.scss"

const CartPreview = () => {
    const navigate = useNavigate();
    const { items, isCartOpen } = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);


    const handleRemove = (event, productId) => {
        event.stopPropagation();
        return removeFromCart(dispatch, productId);
    };
    const viewBook = (book) => {
        toggleCartPopup(dispatch);
        navigate(`/userbookdetail/${book.id}`, { state: { book } });
    };
    const handleProceedCheckout = () => {
        toggleCartPopup(dispatch);
        if (items.length !== 0) navigate("/checkout");
    };

    return (
        <div className={`cart-preview ${isCartOpen ? "active" : ""}`}>
            <ul className="cart-items">
                {items.map((product) => {
                    return (
                        <li className="cart-item" key={product.name} onClick={() => viewBook(product)}>
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
                                onClick={(event) => handleRemove(event, product.id)}
                            >
                                ×
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="action-block">
                <button
                    type="button"
                    className={`${items && items.length === 0 ? 'disabled' : ''}`}
                    onClick={handleProceedCheckout}
                >
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default CartPreview;
