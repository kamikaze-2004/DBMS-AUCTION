import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProductsDir = ({ user, setUser, seller, setSeller }) => {
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const currUser = user;
  const navigate = useNavigate();
  function onView(pname) {
    navigate(`/viewProd/${pname}`);
  }
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/direct_prods/${user}`
        );
        setAllProductDetails(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product details of all products:", error);
        setError(error.message || "Failed to fetch all product details");
      }
    };
    fetchProductDetails();
  }, [user]);

  return (
    <div className="container-fluid">
      {console.log("dir_page:user:" + currUser)}
      <h2>Product Details</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : allProductDetails.length === 0 ? (
        <p>No Products available currently!</p>
      ) : (
        <div className="row">
          {allProductDetails.map((product, index) => (
            <div className="col-md-3 mb-3" key={product.prod_name}>
              <div className="card text-dark bg-light h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.prod_name}</h5>
                  <p className="card-text">Username: {product.username}</p>
                  <p className="card-text">Price: Rs.{product.price}</p>
                  <p className="card-text">
                    Years of Usage:{" "}
                    {product.y_o_u ? product.y_o_u : "Not mentioned"}
                  </p>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => {
                      setSeller(product.username);
                      console.log("seller ", seller, " user ", user);
                      navigate(`/pay/${product.prod_name}?price=${product.price}`);
                    }}
                  >
                    Buy
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => onView(product.prod_name)}
                  >
                    View Product Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsDir;
