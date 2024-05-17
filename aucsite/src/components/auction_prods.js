import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProductsAuc = ({ user }) => {
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const currUser = user;
  const [raiseIndex, setRaiseIndex] = useState(null);

  const navigate = useNavigate();
  function onView(pname) {
    navigate(`/viewProd/${pname}`);
  }
  //   const [raise,setRaise] = useState(false);

  //   function onRaise()
  //   {
  //     setRaise(!raise);
  //   }

  //   console.log(raise);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/auction_prods`
        );
        setAllProductDetails(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch product details");
      }
    };
    fetchProductDetails();
  }, []);
  const onRaise = (index) => {
    setRaiseIndex(raiseIndex === index ? null : index);
  };

  return (
    <div className="container-fluid">
      {console.log("auc_page:user:" + currUser)}
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
                  <p className="card-text">
                    Auction End Time: Ends in {product.duration} days
                  </p>
                  <div>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => onRaise(index)}
                    >
                      Raise Bid
                    </button>
                    {raiseIndex === index && (
                      <div>
                        <label for="raise">
                          Enter your bid(new bid must be atleast 10% higher than
                          the current bid):
                        </label>
                        <input type="number" className="bg-light"></input>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary "
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

export default ProductsAuc;
