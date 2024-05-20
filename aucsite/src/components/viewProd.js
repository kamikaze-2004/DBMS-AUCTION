import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProduct({ user }) {
  const { prodname: pname } = useParams();
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);
  const [raise, setRaise] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/${pname}`
        );
        setProd(response.data);
        console.log("product details:", response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch the specific product details");
      }
    };
    fetchProductDetails();
  }, [pname]);

  const onRaise = () => {
    setRaise(!raise);
  };

  const handleBuy = () => {
    if (prod) {
      navigate(`/pay/${prod.prod_name}?price=${prod.price}`);
    }
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
              {prod.sale_type !== "auction" && (
                <button className="btn btn-success mt-3" onClick={handleBuy}>
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
