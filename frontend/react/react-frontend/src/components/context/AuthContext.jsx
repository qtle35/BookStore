import React, { createContext, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);


    const userLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', {
                username,
                password
            });
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            const decodedToken = jwt_decode(accessToken);
            localStorage.setItem('user', JSON.stringify(decodedToken));
            setUser(decodedToken);
            setIsLoggedIn(true);
            setIsError(false)
        } catch (error) {
            setIsError(true);
        }
    };
    const userLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user')
        localStorage.removeItem('cartItems')
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                isError,
                userLogin,
                userLogout,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
