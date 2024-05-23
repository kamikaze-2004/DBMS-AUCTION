import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/tailwind.css";

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

  if (loading) return <p className="text-center text-gray-200">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Order Details</h2>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : userOrder.length === 0 ? (
          <p className="text-center text-gray-200">No previous history of orders!</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white text-black border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-100 border-b">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Product Name</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Seller Name</th>
                  <th className="py-3 px-6 text-left">Purchased Date</th>
                  <th className="py-3 px-6 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(userOrder) && userOrder.map((order) => (
                  <tr key={order.prod_name} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">{order.order_id}</td>
                    <td className="py-4 px-6">{order.car_brand+" "+order.car_model}</td>
                    <td className="py-4 px-6">{order.price}</td>
                    <td className="py-4 px-6">{order.sellername}</td>
                    <td className="py-4 px-6">{order.purchasedate}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        order.payment_status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
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
