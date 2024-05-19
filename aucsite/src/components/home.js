import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import LandingPage from "./landingpage";
import Loading from "./loading";
import { useEffect } from "react";
//import backgroundImage from './Photoshoot In Car Headlights.jpeg';

export default function Home({ user,loading,setLoading }) {

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    console.log(loading);
    return () => clearTimeout(timer);
  }, [setLoading,loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    // <div className="container-fluid bg-light text-center mt-5"
    // /*style={{
    //   backgroundImage:`url(${backgroundImage})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   minHeight: "100vh"
    // }}*/
    
    // >
    //   <div className="row">
    //     <div className="col-md-10 mx-auto mt-5 mb-5">
    //       <h1>Welcome to CARSEEK</h1>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-md-6 mx-auto">
    //       <a href="/login">
    //         <button className="btn btn-primary btn-block mt-2 mb-2">Login</button>
    //       </a>
    //     </div>
    //     <div className="col-md-6 mx-auto">
    //       <a href="/register">
    //         <button className="btn btn-primary btn-block mt-2 mb-2">Register</button>
    //       </a>
    //     </div>
    //     {/* <div className="col-md-4 mx-auto">
    //       <Link to="/dashboard">
    //         <button className="btn btn-primary btn-block mt-2 mb-2">My Profile</button>
    //       </Link>
    //     </div> */}
    //   </div>
    // </div>
    <LandingPage loading={loading} setLoading={setLoading}/>
  );
}
