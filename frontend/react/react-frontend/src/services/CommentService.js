import axios from 'axios';

const COMMENT_API_BASE_URL = "http://localhost:8080/api";

class CommentService {
    saveComment(formdata) {
        const token = localStorage.getItem('accessToken');

        return axios.post(COMMENT_API_BASE_URL + '/comments', formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    getComment(id) {
        const token = localStorage.getItem('accessToken');

        return axios.get(COMMENT_API_BASE_URL + '/comments/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    deleteComment(id) {
        const token = localStorage.getItem('accessToken');

        return axios.delete(COMMENT_API_BASE_URL + '/comments/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

const commentService = new CommentService();
export default commentService;
