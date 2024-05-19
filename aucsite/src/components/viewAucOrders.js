import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewAucOrder({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/getAucOrder/${user}`
        );
        setUserOrder(response.data);
        setLoading(false);
        console.log(userOrder);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUserOrder();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid">
      <h2>Order Details</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : userOrder.length === 0 ? (
        <p>No previous history of orders!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Seller Name</th>
              <th>Purchased Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userOrder) &&
              userOrder.map((order) => (
                <tr key={order.prod_name}>
                  <td>{order.order_id}</td>
                  <td>{order.prod_name}</td>
                  <td>{order.price}</td>
                  <td>{order.sellername}</td>
                  <td>{order.purchasedate}</td>
                  <td>{order.payment_status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
