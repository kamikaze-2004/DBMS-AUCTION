import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from 'react';
import "../src/components/register.css";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropDown(!showDropDown);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-5 text-end">
      <div className="container-fluid text-end">
        <div className="d-flex align-items-center"> {/* Added container */}
          <Link to="/" className="px-2 text-white">
            Home
          </Link>
          <Link to="/login" className="px-2 text-white">
            Login
          </Link>
          <Link to="/register" className="px-2 text-white">
            Register
          </Link>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="px-2" style={{ backgroundColor: 'inherit',border:'inherit',color: 'white' }}> {/* Changed backgroundColor to inherit */}
              Product
            </Dropdown.Toggle>
            <Dropdown.Menu show={showDropDown} onToggle={handleDropdownToggle}>
              <Dropdown.Item href="/products_direct" className="text-black">Direct product</Dropdown.Item> {/* Added text-white class */}
              <Dropdown.Item href="/products_auc" className="text-black">Auction product</Dropdown.Item> {/* Added text-white class */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
