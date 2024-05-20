// src/components/LandingPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading.js";
import "../styles/landingpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage({ loading, setLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", reveal);
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  useEffect(() => {
    const ctaBtn = document.querySelector(".cta-btn");
    const handleClick = () => {
      //alert("visvesswar will add the necessary stuff here!");
      navigate('/register');
    };

    if (ctaBtn) {
      ctaBtn.addEventListener("click", handleClick);
    }

    return () => {
      if (ctaBtn) {
        ctaBtn.removeEventListener("click", handleClick);
      }
    };
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div id="loading"></div>
      <header>
        <nav>
          <div className="container">
            <a href="#home">
              <img
                src="./images/carseek.jpg" // Adjust the path as needed
                width="130"
                height="50"
                className="item"
                alt="Car Seek Logo"
              />
            </a>
          </div>
          <div className="nav-links">
            <div className="item">
              <a href="#home">Home</a>
            </div>
            <div className="item">
              <a href="#about">About</a>
            </div>
            <div className="item">
              <a href="#services">Services</a>
            </div>
            <div className="item">
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="nav-links">
            <div className="logo">
              {/* <img
                src="./images/loginlogo.jpg" // Adjust the path as needed
                width="70"
                height="50"
                alt="Login Logo"
              /> */}
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
            </div>
            <div className="item">
              <button className="login-btn">Login</button>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Car Seek</h1>
          <p>Discover our services and solutions designed just for you.</p>
          <button className="cta-btn">Get Started</button>
        </div>
        {Array.from({ length: 16 }).map((_, index) => (
          <iframe
            key={index}
            width="0"
            height="0"
            src="https://www.youtube.com/embed/Yf5d_Zx3AaI?si=rBAIoaHjW3iw0H6Q"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ))}
      </section>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>"Your necessity and demand is our priority."</p>
      </section>

      <section id="services" className="services-section reveal">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-item">
            <p>Trustworthy and verified sellers.</p>
          </div>
          <div className="service-item">
            <p>Great assistance for you in finding the right value for your car.</p>
          </div>
          <div className="service-item">
            <p>Provide you with real-time info about the available cars in the market.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section reveal">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>&copy; CAR SEEK. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
