import axios from 'axios';

const BOOK_API_BASE_URL = "http://localhost:8080/api/books";

class BookService {
    getAllBooks() {
        const token = localStorage.getItem('accessToken');

        return axios.get(BOOK_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    createBook(formdata) {
        const token = localStorage.getItem('accessToken');

        return axios.post(BOOK_API_BASE_URL, formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
    }

    getBook(id) {
        const token = localStorage.getItem('accessToken');

        return axios.get(BOOK_API_BASE_URL + '/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    updateBook(formdata, id) {
        const token = localStorage.getItem('accessToken');

        return axios.put(BOOK_API_BASE_URL + '/' + id, formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
    }

    deleteBook(id) {
        const token = localStorage.getItem('accessToken');

        return axios.delete(BOOK_API_BASE_URL + '/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

const bookService = new BookService();
export default bookService;
