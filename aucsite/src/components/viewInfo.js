import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewInfo({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [userData, SetUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${user}`
        );
        SetUserData(response.data);
        setLoading(false);
      } catch (err) {
        SetError(err.message);
        setLoading(false);
      }
    };
    getUserData();
  }, [user]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if(!userData) return null;
  console.log(user);

  return(
    <div className="mx-5">
        <h1>{user}-details</h1>
        <table>
            <tbody>
                <tr>
                    <td>Username</td>
                    <td>{userData.username}</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>{userData.password}</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{userData.email}</td>
                </tr>
                <tr>
                    <td>FirstName</td>
                    <td>{userData.firstname}</td>
                </tr>
                <tr>
                    <td>Lastname</td>
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
                    <td>city</td>
                    <td>{userData.city}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>{userData.state}</td>
                </tr>

            </tbody>
        </table>
       <Link to='/userUpdate'> <button className="btn btn-primary mx-5">Update Info</button></Link>
    </div>
  )
}

export default ViewInfo;