import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './ListBook.css';
import BookService from '../services/BookService';
import AuthContext from './AuthContext';

function ListBook() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    useEffect(() => {
        fetchBooks();
    }, [isLoggedIn]);

    const fetchBooks = async () => {
        try {
            const response = await BookService.getAllBooks();
            setBooks(response.data);
            setFilteredBooks(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const addBook = () => {
        navigate('/Book/-1');
    };

    const viewBook = (book) => {
        if (user) {
           navigate(`/userbookdetail/${book.id}`, { state: { book } }); 
        }
        else {
            navigate('/login')
        }
    };
    const adminViewBook = (book) => {
        navigate(`/book/${book.id}`)
    }
    const deleteBook = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc?');
        if (confirmDelete) {
            try {
                await BookService.deleteBook(id);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };


    useEffect(() => {
        setFilteredBooks(
            books.filter(
                (book) =>
                    book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [books, searchInput]);


    return (
        <div className="container">
            <div className="row search-container">
                <div className="btn-group">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button className="btn btn-outline-success">
                        Search
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 offset-md-5 offset-md-5">
                    {user && user.rol[0] === 'ADMIN' && (
                        <button className="btn btn-outline-success" onClick={addBook}>
                            New Book
                        </button>
                    )}

                </div>
            </div>
            {isLoading ? (
                <div className="row justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {filteredBooks.map((book) => (
                        <div className="col-lg-4" key={book.id}>
                            <div className="card">
                                <img src={`data:image;base64,${book.image}`} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">Author: {book.author}</p>
                                    <p className="card-text">Category: {book.category}</p>
                                    <p className="card-text">Price (vnd): {book.price}</p>
                                    <div className="card-btn-group">
                                        <button onClick={() => viewBook(book)} className="btn btn-outline-success">
                                            View
                                        </button>
                                        {user && user.rol[0] === 'ADMIN' && (
                                            <button onClick={() => adminViewBook(book)} className="btn btn-outline-success">
                                                admin view
                                            </button>
                                        )}
                                        {user && user.rol[0] === 'ADMIN' && (
                                            <button onClick={() => deleteBook(book.id)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListBook;
