import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../src/components/register.css";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-5 text-end">
      <div className="container-fluid text-end">
        <Link to="/" className="px-2 text-white">
          Home
        </Link>
        <br />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/login" className="px-2 text-white">
              Login
            </Link>
            <Link to="/register" className="px-2 text-white">
              Register
            </Link>
            {/* <Link to="/login">Login</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
