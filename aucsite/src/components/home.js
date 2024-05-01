import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from "react-router-dom";
//import { useState } from "react";
export default function Home()
{
 
    return(
     <div className="bg-light mx-auto text-center align-items-center justify-content-center mt-5">
        <h1 className="col-md-10 mx-auto mt-5 mb-5 ">Welcome to CARSEEK</h1>
        <a href="/login" ><button className="btn btn-primary mt-2 mb-2 px-3" >Login</button></a>
        <a href="/register" ><button className="btn btn-primary mt-2 mb-2 mx-5" >Register</button></a>
        <Link to='/dashboard'><button className="btn btn-primary mt-2 mb-2 mx-5" >My-Profile</button></Link>
     </div>   
    )
}