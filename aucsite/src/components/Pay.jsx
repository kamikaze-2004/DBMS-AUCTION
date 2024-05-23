import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PayOrder({ user, seller }) {
  const prodid = useParams().prodname;
  console.log(prodid);
  const navigate = useNavigate();
  const [oid, setOid] = useState(null);
  const [carBrand, setCarBrand] = useState(null);
  const [carModel, setCarModel] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const price = queryParams.get("price");

  const handleOrderNow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/create-order/${prodid}`,
        {
          buyer: user,
          seller: seller,
          currency: "INR",
          status: "pending",
        }
      );
      const { newOrder, saletype } = response.data;

      setOid(newOrder.order_id);
      setCarBrand(newOrder.car_brand);
      setCarModel(newOrder.car_model);

      console.log(carBrand);

      let endpoint;
      if (saletype === 'direct') {
        endpoint = `http://localhost:3001/user/update-order/${newOrder.order_id}`;
      } else {
        endpoint = `http://localhost:3001/user/updateauc-order/${newOrder.order_id}`;
      }

      const razorpay = new window.Razorpay({
        key: "rzp_test_CFpUbryUIn6bk4",
        amount: 1000,
        //amount:newOrder.price,
        currency: "INR",
        order_id: oid,
        name: "Your Order Name",
        description: "Order Description",
        handler: async function (response) {
          navigate("/");
          try {
            await axios.post(endpoint, {
              status: "paid",
            });
            toast.success("Payment successful");
          } catch (error) {
            toast.warning("Payment successful but updation of payment status failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "dhinagar775@gmail.com",
          contact: "6381242908",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled or failed. Please try again.");
          },
        },
      });
      razorpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-700 shadow-md rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Order Summary</h2>
          {carBrand && carModel ? (
            <p className="text-gray-700 mb-4">
              <strong>Car:</strong> {carBrand} {carModel}
            </p>
          ) : null}
          <p className="text-white font-bold mb-4">
            <strong>Price:</strong> Rs. {price}
          </p>
          <button
            onClick={handleOrderNow}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
