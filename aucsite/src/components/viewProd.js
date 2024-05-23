import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/tailwind.css";

export default function ViewProduct({ user }) {
  const { prodname: pid } = useParams();
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);
  const [raise, setRaise] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/${pid}`
        );
        setProd(response.data);
        console.log("product details:", response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch the specific product details");
      }
    };
    fetchProductDetails();
  }, [pid]);

  const onRaise = () => {
    setRaise(!raise);
  };

  const handleBuy = () => {
    if (prod) {
      navigate(`/pay/${pid}?price=${prod.price}`);
    }
  };

  if (error) {
    return (
      <div className="bg-red-500 text-white p-4 rounded" role="alert">
        {error}
      </div>
    );
  }

  if (!prod) {
    return <div>Loading...</div>;
  }

  const auctionEndTime = new Date(prod.createdAt);
  //console.log(auctionEndTime,",",prod.createdAt);
  
  auctionEndTime.setHours(auctionEndTime.getHours() + prod.duration);
  // auctionEndTime.setMinutes(auctionEndTime.getMinutes() + 30);
  const currentTime = new Date();
  const remainingTime = auctionEndTime - currentTime;
  const isAuctionEnded = currentTime > auctionEndTime;

 
  let remainingTimeString;
  if (remainingTime > 0) {
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    remainingTimeString = `Ends in ${hours} hrs ${minutes} min ${seconds} sec`;
  } else {
    remainingTimeString = "Auction has ended";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-4">
                <h3 className="text-xl">{prod.car_brand + " " + prod.car_model}</h3>
              </div>
              <div className="p-4">
                {prod.image_url && (
                  <div className="text-center mb-3">
                    <img
                      src={prod.image_url}
                      alt={prod.prod_name}
                      className="w-full max-h-64 object-contain"
                    />
                  </div>
                )}
                <p className="text-gray-700">Username: {prod.username}</p>
                <p className="text-gray-700">Price: Rs.{prod.price}</p>
                <p className="text-gray-700">
                  Years of Usage: {prod.y_o_u ? prod.y_o_u : "Not mentioned"}
                </p>
                {prod.sale_type === "auction" && (
                  <div>
                    <p className="text-gray-700">
                      Auction End Time: {remainingTimeString}
                    </p>
                    {!isAuctionEnded && (
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
                        onClick={onRaise}
                      >
                        Raise Bid
                      </button>
                    )}
                    {raise && !isAuctionEnded && (
                      <div className="mt-2">
                        <label htmlFor="raise" className="block text-gray-700">
                          Enter your bid (new bid must be at least 10% higher than the current bid):
                        </label>
                        <input
                          type="number"
                          id="raise"
                          className="mt-1 p-2 border rounded w-full"
                        />
                      </div>
                    )}
                    {isAuctionEnded && prod.highest_bidder === user && (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-2"
                        onClick={handleBuy}
                      >
                        Pay
                      </button>
                    )}
                  </div>
                )}
                {prod.sale_type !== "auction" && (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-2"
                    onClick={handleBuy}
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
