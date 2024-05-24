import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import "../src/styles/register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faInfoCircle, faHandHoldingUsd, faEnvelope,faCar,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import carseekImg from "./carseek.jpg";

export default function Header({ user, isLandingpageOpen, setIsLandingpageOpen ,setUser}) {
  const [showDropDown, setShowDropDown] = useState(false);

  const location=useLocation();
  const navigate=useNavigate();

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  };


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand mx-5" href="#home">
            <img
              src={carseekImg}
              width="130"
              height="50"
              alt="Car Seek Logo"
            />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto nav-links">
              <li className="nav-item item">
                <Link to="/" className="nav-link px-2">
                  <FontAwesomeIcon icon={faHome} className="me-1" />
                  Home
                </Link>
              </li>
              {location.pathname==='/' && <>
              <li className="nav-item item">
                <a href="#about" className="nav-link px-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                  About
                </a>
              </li>
              <li className="nav-item item">
                <a href="#services" className="nav-link px-2">
                  <FontAwesomeIcon icon={faHandHoldingUsd} className="me-1" />
                  Services
                </a>
              </li>
              <li className="nav-item item">
                <a href="#contact" className="nav-link px-2">
                  <FontAwesomeIcon icon={faEnvelope} className="me-1" />
                  Contact
                </a>
              </li>
              </>}
              <li className="nav-item item">
                {user ? (
                  <Link to="/dashboard" className="nav-link px-2">
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link px-2">
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    Login
                  </Link>
                )}
              </li>
              
              <li className="nav-item item">
                <Link to="/register" className="nav-link px-2">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Register
                </Link>
              </li>
              {user && (
                <li className="nav-item item">
                  <Dropdown show={showDropDown} onToggle={handleDropdownToggle}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle px-2 text-white"
                      style={{
                        backgroundColor: "inherit",
                        border: "inherit",
                      }}
                    >
                      <FontAwesomeIcon icon={faCar} className="me-1" />

                      Product
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/products_dir" className="text-decoration-none text-dark">
                          Direct product
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/products_auc" className="text-decoration-none text-dark">
                          Auction Products
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                
              )}
              <li className="nav-item item">
                {user ? (
                  <button onClick={()=>{setUser(null);
                    navigate('/');
                  }}>
                    <FontAwesomeIcon icon={faSignOutAlt} />logout</button>
                ) :<></>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
