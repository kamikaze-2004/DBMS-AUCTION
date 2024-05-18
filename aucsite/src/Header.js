import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import "../src/styles/register.css";

export default function Header({ user }) {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-5 text-end">
      <div className="container-fluid text-end">
        <div className="d-flex align-items-center">
          {" "}
          {/* Added container */}
          <Link to="/" className="px-2 text-white">
            Home
          </Link>
          {/* <Link to="/login" className="px-2 text-white">
            Login
          </Link> */}
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
              {" "}
              {/* Changed backgroundColor to inherit */}
              Product
            </Dropdown.Toggle>
            <Dropdown.Menu show={showDropDown} onToggle={handleDropdownToggle}>
              <Dropdown.Item className="text-black">
                <Link
                  to="/products_dir"
                  className="text-decoration-none text-dark"
                >
                  Direct product
                </Link>
              </Dropdown.Item>{" "}
              {/* Added text-white class */}
              <Dropdown.Item className="text-black text-decoration-none">
                <Link
                  to="/products_auc"
                  className="text-decoration-none text-dark"
                >
                  {" "}
                  Auction product
                </Link>
              </Dropdown.Item>{" "}
              {/* Added text-white class */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
