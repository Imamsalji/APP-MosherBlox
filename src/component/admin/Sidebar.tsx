import React from "react";
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";

export default function Sidebar() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-secondary navbar-expand-lg">
            <div className="container">
                <ul className="navbar-nav">
                    <li
                        className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""
                            }`}
                    >
                        <NavLink href="/dashboard">
                            <i className="far fa-home"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li
                        className={`nav-item ${location.pathname === "/products" ? "active" : ""
                            }`}
                    >
                        <NavLink href="/products">
                            <i className="far fa-fire"></i>
                            <span>product</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
