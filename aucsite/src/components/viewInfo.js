import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewInfo({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${user}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUserData();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            {user} Details
          </h1>
          <div className="mt-4">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center border-b-2 border-gray-200 py-2">
                <p className="text-lg font-semibold text-gray-700 capitalize">{key.replace('_', ' ')}</p>
                <p className="text-lg text-gray-700">{key === 'password' ? '*'.repeat(value.length) : value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <Link to="/userUpdate" className="btn btn-primary">
            Update Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewInfo;
