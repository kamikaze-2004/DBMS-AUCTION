import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

export default function ViewProduct({ user }) {
  const prodid = useParams().prodname;
  console.log("pname:",prodid);
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);
  const [raise, setRaise] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/${prodid}`
        );
        setProd(response.data);
        console.log("product details:",prod);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(
          error.message || "Failed to fetch the specific product details"
        );
      }
    };
    fetchProductDetails();
  },[]);

  const onRaise = () => {
    setRaise(!raise);
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!prod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-dark bg-light h-100">
            <div className="card-header">
              <h3 className="card-title">{prod.car_brand+"  "+prod.car_model}</h3>
            </div>
            <div className="card-body">
              {prod.image_url && (
                <div className="text-center mb-3">
                  <img
                    src={prod.image_url}
                    alt={prod.car_brand + prod.car_model}
                    className="img-fluid"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              )}
              <p className="card-text">Username: {prod.username}</p>
              <p className="card-text">Price: Rs.{prod.price}</p>
              <p className="card-text">
                Years of Usage: {prod.y_o_u ? prod.y_o_u : "Not mentioned"}
              </p>
              {prod.sale_type === "auction" && (
                <div>
                  <p className="card-text">
                    Auction End Time: Ends in {prod.duration} days
                  </p>
                  <button className="btn btn-primary mx-1" onClick={onRaise}>
                    Raise Bid
                  </button>
                  {raise && (
                    <div className="mt-2">
                      <label htmlFor="raise">
                        Enter your bid (new bid must be at least 10% higher than
                        the current bid):
                      </label>
                      <input
                        type="number"
                        id="raise"
                        className="form-control mt-1 bg-light"
                      />
                    </div>
                  )}
                </div>
              )}
              <button className="btn btn-success mt-3">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
