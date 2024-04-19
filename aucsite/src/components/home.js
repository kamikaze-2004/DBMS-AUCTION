import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

//import { useState } from "react";
export default function Home()
{
 
    return(
     <div className="bg-light mx-auto text-center">
        <h1 className="col-md-10 mx-auto">This is the home page</h1>
        <a href="/login" ><button className="btn btn-primary mt-2 mb-2 px-2" >Login</button></a>
        <a href="/register" ><button className="btn btn-primary mt-2 mb-2 ml-5" >Register</button></a>
     </div>   
    )
}