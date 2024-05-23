import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewInfo({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [visible,setVisible] =useState(false);

  const onvisible=()=>{
    setVisible(!visible);
    console.log(visible);
  }

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

  const checkNull = (value) => (value === null || value === undefined ? 'NAN' : value);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">{user} - Details</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300">
            <tbody>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Username</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.username)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Password</td>
                <td className="py-2 px-4 border border-gray-300">{!visible?'*'.repeat(userData.password.length):checkNull(userData.password)}<button className="px-2 bg-blue-500 text-white mb-2 mx-5" onClick={onvisible}>view</button></td>
                <td></td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Email</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.email)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">First Name</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.firstname)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Last Name</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.lastname)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Address</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.address)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">Secondary Address</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.address2)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">City</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.city)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 font-semibold">State</td>
                <td className="py-2 px-4 border border-gray-300">{checkNull(userData.state)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/userUpdate">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Update Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewInfo;
