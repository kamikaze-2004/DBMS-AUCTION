// src/components/ViewProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "./loading";

export default function ViewProduct({ user, loading, setLoading }) {
  const { prodname } = useParams();
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);
  const [raise, setRaise] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/products/${prodname}`);
        setProd(response.data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch the specific product details");
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchProductDetails();
  }, [prodname, setLoading]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  const onRaise = () => {
    setRaise(!raise);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-dark bg-light h-100">
            <div className="card-header">
              <h3 className="card-title">{prod.prod_name}</h3>
            </div>
            <div className="card-body">
              {prod.image_url && (
                <div className="text-center mb-3">
                  <img
                    src={prod.image_url}
                    alt={prod.prod_name}
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
