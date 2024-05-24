import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import LandingPage from "./landingpage";
import "../styles/landingpage.css";

export default function Home({ user,loading,setLoading }) {
  return (
    <div>
        <LandingPage loading={loading} setLoading={setLoading}/>
    </div>
  );
}

