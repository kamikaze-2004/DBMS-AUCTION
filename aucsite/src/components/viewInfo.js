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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="border p-4">
            <h1 className="text-center">{user} Details</h1>
            <table className="table">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>{userData.username}</td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>{userData.password}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>{userData.firstname}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{userData.lastname}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{userData.address}</td>
                </tr>
                <tr>
                  <td>Secondary Address</td>
                  <td>{userData.address2}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{userData.city}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{userData.state}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <Link to="/userUpdate" className="btn btn-primary">
                Update Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInfo;
