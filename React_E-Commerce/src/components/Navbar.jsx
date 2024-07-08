import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Logout from '../auth/Logout'
import { getCartFromCookie, saveCartToCookie } from '../utils/CookieCart'
import { AuthContext } from '../auth/AuthenProvider'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const [cart, setCart] = useState(state)

    useEffect(() => {
            setCart(state);
    }, [state]);
    useEffect(() => {
        // Lấy giỏ hàng từ cookie khi component được mount
        const initialCart = getCartFromCookie();
        setCart(initialCart);
    }, []);
    useEffect(() => {
        if (cart && cart.length > 0) {
            saveCartToCookie(cart);
        }
    }, [cart])
    const [showAccount, setShowAccount] = useState(false)
    const hanldeAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const tokenExpiration = localStorage.getItem("tokenExpiration")
    let isLoggedIn;
    const userRole = localStorage.getItem("userRole")
    const auth = useContext(AuthContext)
    const now = new Date().getTime();
    if (now > tokenExpiration) {
        auth.handleLogout()
        isLoggedIn = ""
    } else {
        isLoggedIn = localStorage.getItem("token")
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Charles & Keith</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center align-items-center">
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({cart.length}) </NavLink>
                        <div className="dropdown">
                            <button className={`btn btn-secondary dropdown-toggle ${showAccount ? "show" : ""}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={hanldeAccountClick}>
                                Account
                            </button>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                                {isLoggedIn ? (
                                    <>
                                        {(userRole === "ROLE_ADMIN" || userRole === "ROLE_STAFF") && (
                                            <li className="dropdown-item">
                                                <NavLink className="nav-link" aria-current="page" to={"/admin/dashboard"}>
                                                    Admin
                                                </NavLink>
                                            </li>
                                        )}
                                        <Logout />
                                    </>
                                ): (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar