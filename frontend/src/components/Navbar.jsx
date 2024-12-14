import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Custom styling for the navbar
import { Container, useColorMode } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <nav className="navbar">
            <h3 className="logo">
                <Link to={"/"}>PRODUCT STORE 🛒</Link>
            </h3>
            <ul
                className={isMobile ? "nav-links-mobile" : "nav-links"}
                onClick={() => setIsMobile(false)}
            >
                <li>
                    <Link to="/create">
                        <CiSquarePlus className="plus-icon" />
                    </Link>
                </li>
                <li>
                    <button onClick={toggleColorMode} className="btn">
                        {colorMode === "light" ? (
                            <LuSun size={20} />
                        ) : (
                            <IoMoon size={20} />
                        )}
                    </button>
                </li>
            </ul>

            <button
                className="mobile-menu-icon"
                onClick={() => setIsMobile(!isMobile)}
            >
                {isMobile ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <i className="fas fa-bars"></i>
                )}
            </button>
        </nav>
    );
};

export default Navbar;
