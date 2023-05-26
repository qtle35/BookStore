import React, { useEffect, useState, useContext } from 'react';
import BookService from '../services/BookService';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListBook.css'; // Import CSS file for custom styles

function ListBook() {
    const navigate = useNavigate();
    const { isLoggedIn, userLogout } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            fetchBooks();
        }
    }, [isLoggedIn, navigate]);

    const fetchBooks = async () => {
        try {
            const response = await BookService.getAllBooks();
            setBooks(response.data);
            setFilteredBooks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addBook = () => {
        navigate('/Book/-1');
    };

    const viewBook = (id) => {
        navigate(`/Book/${id}`);
    };

    const deleteBook = async (id) => {
        try {
            await BookService.deleteBook(id);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const searchBooks = () => {
        axios
            .get(`http://localhost:8080/api/Books?name=${searchInput}`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
    const handleLogout = () => {
        userLogout();
    };
    return (
        <div className="container">
            <div className="row search-container">
                <h1>List Books</h1>
                <div className="btn-group">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button onClick={searchBooks} className="btn btn-outline-success">
                        Search
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 offset-md-5 offset-md-5">
                    <button className="btn btn-outline-success" onClick={addBook}>
                        New Book
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
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
                                    <button onClick={() => viewBook(book.id)} className="btn btn-outline-success">
                                        View
                                    </button>
                                    <button onClick={() => deleteBook(book.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ListBook;
