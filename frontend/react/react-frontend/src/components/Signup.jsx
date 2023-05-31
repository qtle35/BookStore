import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import axios from 'axios';

function Signup() {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
    });

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            navigate('/login');
        }
    }, [isRegistered]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, name, email } = formData;
        try {
            const user = new FormData();
            user.append('username', username);
            user.append('password', password);
            user.append('name', name);
            user.append('email', email);

            const response = await axios.post('http://localhost:8080/auth/signup', user);

            if (response.status === 201) {
                setIsError(false);
                setErrorMessage('');
                setIsRegistered(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('Username hoặc email trùng!');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Signup
                        </button>
                    </form>

                    <p className="mt-3">
                        Already have an account? <NavLink to="/login">Login</NavLink>
                    </p>

                    {isError && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default Signup;
