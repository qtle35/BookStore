import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from './AuthContext';

function Navbar() {
    const { user, isLoggedIn, userLogout } = useContext(AuthContext);

    const logout = () => {
        userLogout();
    };

    const enterMenuStyle = () => {
        return isLoggedIn ? 'd-none' : 'd-block';
    };

    const logoutMenuStyle = () => {
        return isLoggedIn ? 'd-block' : 'd-none';
    };
    const adminPageStyle = () => {
        return user && user.rol && user.rol[0] === 'ADMIN' ? 'd-block' : 'd-none';
    };

    const userPageStyle = () => {
        return user && user.rol && user.rol[0] === 'USER' ? 'd-block' : 'd-none';
    };

    const getUserName = () => {
        return user && user.name ? user.name : '';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Book Store</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        <li className="nav-item" style={{ display: adminPageStyle() }}>
                            <Link className="nav-link" to="/adminpage">AdminPage</Link>
                        </li>
                        <li className="nav-item" style={{ display: userPageStyle() }}>
                            <Link className="nav-link" to="/userpage">UserPage</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{ display: enterMenuStyle() }}>
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item" style={{ display: enterMenuStyle() }}>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item" style={{ display: logoutMenuStyle() }}>
                            <span className="nav-link">{`Hi ${getUserName()}`}</span>
                        </li>
                        <li className="nav-item" style={{ display: logoutMenuStyle() }}>
                            <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;