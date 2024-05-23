import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/tailwind.css"

export default function ViewDirOrder({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/getDirOrder/${user}`);
        setUserOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUserOrder();
  }, [user]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : userOrder.length === 0 ? (
        <p className="text-center text-gray-700">No previous history of orders!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Product Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Seller Name</th>
                <th className="py-2 px-4 text-left">Purchased Date</th>
                <th className="py-2 px-4 text-left">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userOrder) && userOrder.map((order) => (
                <tr key={order.prod_name} className="border-b">
                  <td className="py-2 px-4">{order.order_id}</td>
                  <td className="py-2 px-4">{order.prod_name}</td>
                  <td className="py-2 px-4">{order.price}</td>
                  <td className="py-2 px-4">{order.sellername}</td>
                  <td className="py-2 px-4">{order.purchasedate}</td>
                  <td className="py-2 px-4">{order.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
