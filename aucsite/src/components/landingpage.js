import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading.js";
import "../styles/landingpage.css";

export default function LandingPage({
  loading,
  setLoading
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
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

  // useEffect(() => {
  //   const ctaBtn = document.querySelector(".cta-btn");
  //   const handleClick = () => {
  //     setIsLandingpageOpen(false);
  //     console.log(isLandingpageOpen,"clicked");
  //     navigate("/register");
  //   };

  //   if (ctaBtn) {
  //     ctaBtn.addEventListener("click", handleClick);
  //   }

  //   return () => {
  //     if (ctaBtn) {
  //       ctaBtn.removeEventListener("click", handleClick);
  //     }
  //   };
  // }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  function nav() {
    navigate("/register");
  }

  return (
    <div>
     

      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Car Seek</h1>
          <p>Discover our services and solutions designed just for you.</p>
          <button className="cta-btn" onClick={nav}>
            Get Started
          </button>
        </div>
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/Yf5d_Zx3AaI?si=rBAIoaHjW3iw0H6Q"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>

      <section id="about" className="about-section mt-5">
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
            <p>
              Great assistance for you in finding the right value for your car.
            </p>
          </div>
          <div className="service-item">
            <p>
              Provide you with real-time info about the available cars in the
              market.
            </p>
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
