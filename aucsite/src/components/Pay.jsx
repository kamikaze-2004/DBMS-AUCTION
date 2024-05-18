import React from "react";
//import generateUniqueId from 'generate-unique-id';
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//const orderId=generateUniqueId({length:10,useLetters:true,useNumbers:true});

//console.log(orderId);
export default function PayOrder({ user, setUser, seller, setSeller }) {
  //const [orderId, setOrderId] = useState('');
  const prodname = useParams().prodname;
  const navigate=useNavigate();
  const [oid,setOid]=useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const price = queryParams.get("price");

  console.log("product name:", prodname);
  console.log("price:", price);

  const handleOrderNow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/create-order/${prodname}`,
        {
          buyer: user,
          seller: seller,
          //amount:price* 100,
          currency: "INR",
          status: "pending",
        }
      );
      console.log(response.data);
      const orderDetails = response.data;
      setOid(orderDetails.order_id);
      console.log(oid);
      const endpoint = `http://localhost:3001/user/update-order/${orderDetails.order_id}`;
      console.log(endpoint);

      const razorpay = new window.Razorpay({
        key: 'rzp_test_CFpUbryUIn6bk4',
        amount: 1000,
        //amount: orderDetails.price*100,
        currency: 'INR',
        order_id: oid,
        name: 'Your order Name',
        description: 'Order Description',
        handler: async function (response) {
          console.log("Payment successful:", response);
          navigate('/');
          try {
            await axios.post(endpoint, {
              status: "paid",
            });
            toast.success("Payment successful");
          } catch (error) {
            console.error(
              "payment status updation failed due to error ",
              error
            );
            toast.warning(
              "Payment successful but updation of payment status failed"
            );
          }
        },
        prefill: {
          name: "John Doe",
          email: "dhinagar775@gmail.com",
          contact: "6381242908",
        },
        modal: {
          ondismiss: function () {
            // Handle payment failure or cancellation
            console.log("Payment dismissed by the user.");
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
    <div>
      <button onClick={handleOrderNow}>Order Now</button>
    </div>
  );
}
