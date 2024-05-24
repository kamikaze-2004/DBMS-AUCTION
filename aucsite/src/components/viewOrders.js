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
        const response = await axios.get(
          `http://localhost:3001/user/getDirOrder/${user}`
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        ) : userOrder.length === 0 ? (
          <p className="text-center text-gray-500">No previous history of orders!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Car Brand</th>
                  <th className="py-3 px-6 text-left">Car Model</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Seller Name</th>
                  <th className="py-3 px-6 text-left">Purchased Date</th>
                  <th className="py-3 px-6 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {Array.isArray(userOrder) &&
                  userOrder.map((order) => (
                    <tr key={order.order_id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{order.order_id}</td>
                      <td className="py-3 px-6 text-left">{order.car_brand ? order.car_brand : "-"}</td>
                      <td className="py-3 px-6 text-left">{order.car_model ? order.car_model : "-"}</td>
                      <td className="py-3 px-6 text-left">{order.price}</td>
                      <td className="py-3 px-6 text-left">{order.sellername}</td>
                      <td className="py-3 px-6 text-left">{order.purchasedate}</td>
                      <td className="py-3 px-6 text-left">{order.payment_status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
