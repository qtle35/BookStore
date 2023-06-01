import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, userLogin, isError, userLogout } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!(username && password)) {
            return;
        }

        if (isLoggedIn) {
            userLogout();
            return;
        }

        try {
            await userLogin(username, password);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/book');
        }
    }, [isLoggedIn]);
    useEffect(() => {
        if (isError) {
            userLogout();
        }
    }, [isError]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>

                        {isError && (
                            <div className="alert alert-danger mt-3">
                                Username hoặc password sai!
                            </div>
                        )}
                    </form>
                    <p className="mt-3">
                        Don't have an account yet? <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
