import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import carseekImg from "../src/components/images/carseek.jpg"; // Adjust the path as needed
import "../src/styles/register.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header({ user, loading, setLoading }) {
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div>
      {loading && <div id="loading"></div>}
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary px-5 text-end">
          <div className="container-fluid text-end">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <a href="#home" className="navbar-brand">
                  <img
                    src={carseekImg}
                    width="130"
                    height="50"
                    className="item"
                    alt="Car Seek Logo"
                  />
                </a>
                <Link to="/" className="px-2 text-white">
                  Home
                </Link>
                <Link to="/#about" className="px-2 text-white">
                  About
                </Link>
                <Link to="/#services" className="px-2 text-white">
                  Services
                </Link>
                <Link to="/#contact" className="px-2 text-white">
                  Contact
                </Link>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="px-2"
                    style={{
                      backgroundColor: "inherit",
                      border: "inherit",
                      color: "white",
                    }}
                  >
                    Product
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    show={showDropDown}
                    onToggle={handleDropdownToggle}
                  >
                    <Dropdown.Item className="text-black">
                      <Link
                        to="/products_dir"
                        className="text-decoration-none text-dark"
                      >
                        Direct product
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="text-black text-decoration-none">
                      <Link
                        to="/products_auc"
                        className="text-decoration-none text-dark"
                      >
                        Auction product
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
                {user ? (
                  <Link to="/dashboard" className="px-2 text-white">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="px-2 text-white">
                    Login
                  </Link>
                )}
                <Link to="/register" className="px-2 text-white">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
