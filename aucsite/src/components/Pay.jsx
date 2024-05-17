import React, { useState } from 'react';
import axios from 'axios';

const orderId=99;

const PayOrder = () => {
  const [orderId, setOrderId] = useState('');


  const handleOrderNow = async () => {
    try {
      /*const response = await axios.post('http://localhost:3001/order/create-order/dhinagar775@gmail.com', {
        amount: 1000, // Amount in paise (e.g., ₹10 = 1000 paise)
        currency: 'INR',

    });
      console.log(response.data);
      const prod_name  = response.data;
     
  
      
      const endpoint = `http://localhost:3001/order/update-order/${prod_name}`; 
      console.log(endpoint);

*/
      // Create a new instance of Razorpay from the global scope
      const razorpay = new window.Razorpay({
        
        key: 'rzp_test_CFpUbryUIn6bk4',
        amount: 1000, // Amount in paise (e.g., ₹10 = 1000 paise)
        currency: 'INR',
        order_id:orderId,
        name: 'Your Store Name',
        description: 'Order Description',
        handler: async function (response) {
          // Handle successful payment
          console.log('Payment successful:', response);
          /*await axios.post(endpoint, {
        status: "paid"});*/
        },
        prefill: {
          name: 'John Doe',
          email: 'dhinagar775@gmail.com',
          contact: '6381242908',
        },
      });
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);


    }
  };

  return (
    <div>
      <button onClick={handleOrderNow}>Order Now</button>
    </div>
  );
};

export default PayOrder;
