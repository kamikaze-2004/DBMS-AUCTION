import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
 import "../styles/tailwind.css";


function Dashboard({ user }) {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-black to-blue-800 overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      <div className="relative w-full max-w-md bg-white bg-opacity-90 text-center p-8 rounded-lg shadow-lg mx-auto my-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/viewInfo">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              My Bio
            </button>
          </Link>
          <Link to="/prod_ins">
            <button className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Sell Product
            </button>
          </Link>
          <Link to="/viewdirOrders">
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Previous Direct Orders
            </button>
          </Link>
          <Link to="/viewaucOrders">
            <button className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Previous Auction Orders
            </button>
          </Link>
          <Link to="/SoldProduct">
            <button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              My sales
            </button>
          </Link>
        </div>
      </div>
      {console.log("user", user)}
    </div>
  );
}

export default Dashboard;