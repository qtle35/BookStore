import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import axios from 'axios';

function Signup() {
    const { userLogin,  } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            navigate('/login')
    }
    }, [isRegistered]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!(username && password && name && email)) {
            setIsError(true);
            setErrorMessage('Please, inform all fields!');
            return;
        }

        try {
            const user = {
                username,
                password,
                name,
                email,
            };
            console.log(user)
            const response = await axios.post('http://localhost:8080/auth/signup', user);

            if (response.status === 200) {
                const { accessToken } = response.data;
                userLogin({ data: {}, accessToken });

                setUsername('');
                setPassword('');
                setName('');
                setEmail('');
                setIsError(false);
                setErrorMessage('');
                setIsRegistered(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('An error occurred during signup.');
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
                                value={username}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter email"
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
