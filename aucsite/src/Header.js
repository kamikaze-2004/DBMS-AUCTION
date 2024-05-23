import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../src/styles/register.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faInfoCircle, faHandHoldingUsd, faEnvelope, faCar, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import carseekImg from "./carseek.jpg";

export default function Header({ user, setUser }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const handleDropdownLinkClick = () => {
    setShowDropDown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);

  function handleLogout() {
    setUser(null);
    navigate("/");
  }

  return (
    <header>
      <nav className="">
        <div className="container mx-auto flex items-center justify-between px-5 py-3">
          <a className="flex items-center" href="#home">
            <img
              src={carseekImg}
              width="130"
              height="50"
              alt="Car Seek Logo"
              className="mr-3"
            />
          </a>
          <div className="flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li className="nav-item item">
                <Link to="/" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  Home
                </Link>
              </li>
              {location.pathname === '/' && <>
                <li className="nav-item item">
                  <a href="#about" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    About
                  </a>
                </li>
                <li className="nav-item item">
                  <a href="#services" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-1" />
                    Services
                  </a>
                </li>
                <li className="nav-item item">
                  <a href="#contact" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                    Contact
                  </a>
                </li>
              </>}
              <li className="nav-item item">
                {user ? (
                  <Link to="/dashboard" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    Login
                  </Link>
                )}
              </li>
              {!user && <li className="nav-item item">
                <Link to="/register" className="nav-link px-2 text-gray-400 hover:text-blue-500">
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  Register
                </Link>
              </li>}
              <li className="nav-item item relative" ref={dropdownRef}>
                <button onClick={handleDropdownToggle} className="nav-link px-2 text-gray-400 hover:text-blue-500 flex items-center">
                  <FontAwesomeIcon icon={faCar} className="mr-1" />
                  Product
                </button>
                {showDropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <Link to="/products_dir" className="block px-4 py-2 text-gray-800 hover:bg-blue-400" onClick={handleDropdownLinkClick}>Direct product</Link>
                    <Link to="/products_auc" className="block px-4 py-2 text-gray-800 hover:bg-blue-400" onClick={handleDropdownLinkClick}>Auction Products</Link>
                  </div>
                )}
              </li>
              {user && <li className="nav-item item">
                <p onClick={handleLogout} className="nav-link px-2 text-gray-400 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                  Logout
                </p>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
