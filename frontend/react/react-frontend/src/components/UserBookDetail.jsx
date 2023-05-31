import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import commentService from '../services/CommentService';
import './UserBookDetail.css';
import './Comment.css';
import { CartDispatchContext, addToCart } from './CartContext';

function UserBookDetail() {
    const userName = JSON.parse(localStorage.getItem('user'));
    const [isAdded, setIsAdded] = useState(false);
    const dispatch = useContext(CartDispatchContext);
    const location = useLocation();
    const book = location.state.book;
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commented, setCommented] = useState([]);
    const [commentError, setCommentError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await commentService.getComment(book.id);
                setCommented(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleAddToCart = () => {
        console.log(quantity)
        const product = { ...book, quantity };
        addToCart(dispatch, product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 3500);
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        setCommentError('');
    };

    const submitComment = async () => {
        if (!comment) {
            setCommentError('Comment is required.');
            return;
        }
        const formData = new FormData();
        formData.append('bookId', book.id);
        formData.append('username', userName.preferred_username);
        formData.append('commented', comment);
        formData.append('rating', rating);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        formData.append('time', formattedDate);

        try {
            const response = await commentService.saveComment(formData);
            const newComment = {
                id: response.data.id,
                username: userName.name,
                rating,
                time: formattedDate,
                commented: comment,
            };
            setCommented((prevCommented) => [...prevCommented, newComment]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc?');
        if (confirmDelete) {
            try {
                await commentService.deleteComment(id);
                setCommented((prevCommented) => prevCommented.filter((comment) => comment.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container user-book-detail">
            <div className="row">
                <div className="col-lg-4">
                    <img src={`data:image;base64,${book.image}`} alt="" className="book-image" />
                </div>
                <div className="col-lg-8">
                    <div className="book-details">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="book-info">Author: {book.author}</p>
                        <p className="book-info">Date Established: {book.date}</p>
                        <p className="book-info">Category: {book.category}</p>
                        <p className="book-info">Pages: {book.page}</p>
                        <p className="book-info">Sold copies: {book.sold}</p>
                        <p className="book-info">Price (vnd): {book.price}</p>
                        <p className="book-description">{book.description}</p>
                        <div className="form-group">
                            <label htmlFor="quantity" className="quantity-label">
                                Quantity:
                            </label>
                            <div className="quantity-input">
                                <button className="btn btn-primary quantity-button" onClick={decreaseQuantity}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control quantity-field"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                                <button className="btn btn-primary quantity-button" onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="add-to-cart-section">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                        <div className="rating-comment-section">
                            <div className="form-group">
                                <label htmlFor="rating">Rating:</label>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`rating-star ${star <= rating ? 'selected' : ''}`}
                                            onClick={() => handleRatingChange(star)}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">Comment:</label>
                                <textarea
                                    id="comment"
                                    className={`form-control ${commentError ? 'is-invalid' : ''}`}
                                    value={comment}
                                    onChange={handleCommentChange}
                                    required
                                ></textarea>
                                {commentError && <div className="invalid-feedback">{commentError}</div>}
                            </div>
                            <button className="btn btn-primary submit-comment-button" onClick={submitComment}>
                                Submit Comment
                            </button>
                        </div>
                        <div className="commented-section">
                            <h3>Comments:</h3>
                            {commented.length > 0 ? (
                                commented.map((c, index) => (
                                    <div key={index} className="comment">
                                        <div className="comment-header">
                                            <strong>{c.username}</strong>
                                            <span className="comment-rating">{c.rating}/5</span>
                                            <span className="comment-time">{c.time}</span>
                                            {(userName.rol[0] === 'ADMIN' || userName.preferred_username === c.username) && (
                                                <button className="comment-remove" onClick={(event) => handleRemove(c.id)}>
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                        <p className="comment-text">{c.commented}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBookDetail;
