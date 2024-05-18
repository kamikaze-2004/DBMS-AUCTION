import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const ProductsAuc = ({ user }) => {
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const currUser = user;
  const [raiseIndex, setRaiseIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const carouselRefs = useRef([]);

  function onView(pname) {
    navigate(`/viewProd/${pname}`);
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/auction_prods`
        );
        setAllProductDetails(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to fetch product details");
      }
    };
    fetchProductDetails();
  }, []);

  useEffect(() => {
    // Start the carousel auto-slide
    const interval = setInterval(() => {
      allProductDetails.forEach((product, index) => {
        if (carouselRefs.current[index]) {
          // Use Bootstrap's carousel methods
          const carousel = carouselRefs.current[index];
          const nextSlide = carousel.querySelector(".carousel-item.active + .carousel-item");
          if (nextSlide) {
            carousel.querySelector(".carousel-item.active").classList.remove("active");
            nextSlide.classList.add("active");
          } else {
            carousel.querySelector(".carousel-item.active").classList.remove("active");
            carousel.querySelector(".carousel-item:first-child").classList.add("active");
          }
        }
      });
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [allProductDetails]);

  const onRaise = (index) => {
    setRaiseIndex(raiseIndex === index ? null : index);
  };

  const handlePrev = (index) => {
    if (carouselRefs.current[index]) {
      const carousel = carouselRefs.current[index];
      const activeSlide = carousel.querySelector(".carousel-item.active");
      if (activeSlide.previousElementSibling) {
       
        activeSlide.classList.remove("active");
        activeSlide.previousElementSibling.classList.add("active");
      }
      else{
        const lastSlide = carousel.querySelector(".carousel-item:last-child");
        activeSlide.classList.remove("active");
        lastSlide.classList.add("active");
      }
    }
  };

  const handleNext = (index) => {
    if (carouselRefs.current[index]) {
      const carousel = carouselRefs.current[index];
      const activeSlide = carousel.querySelector(".carousel-item.active");
      if (activeSlide.nextElementSibling) {
        activeSlide.classList.remove("active");
        activeSlide.nextElementSibling.classList.add("active");
      } else {
        const firstSlide = carousel.querySelector(".carousel-item:first-child");
        activeSlide.classList.remove("active");
        firstSlide.classList.add("active");
      }
    }
  };
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalShow(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalShow(false);
  };

  return (
    <div className="container-fluid">
      {console.log("auc_page:user:" + currUser)}
      <h2>Product Details</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : allProductDetails.length === 0 ? (
        <p>No Products available currently!</p>
      ) : (
        <div className="row">
          {allProductDetails.map((product, index) => (
            <div className="col-md-3 mb-3" key={product.prod_name}>
              <div className="card text-dark bg-light h-100">
                {/* Display multiple images if image_paths is present */}
                {product.image_paths && (
                  <div
                    id={`carousel-${index}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                    ref={(ref) => (carouselRefs.current[index] = ref)}
                  >
                    <div className="carousel-inner">
                      {product.image_paths.split(",").map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`carousel-item ${
                            imgIndex === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={`http://localhost:3001/${image.trim()}`}
                            className="d-block w-100 card-img-top"
                            alt={`Product ${imgIndex + 1}`}
                            onClick={() =>
                              openModal(`http://localhost:3001/${image.trim()}`)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel-${index}`}
                      data-bs-slide="prev"
                      onClick={() => handlePrev(index)}
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel-${index}`}
                      data-bs-slide="next"
                      onClick={() => handleNext(index)}
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.prod_name}</h5>
                  <p className="card-text">Username: {product.username}</p>
                  <p className="card-text">Price: Rs.{product.price}</p>
                  <p className="card-text">
                    Years of Usage:{" "}
                    {product.y_o_u ? product.y_o_u : "Not mentioned"}
                  </p>
                  <p className="card-text">
                    Auction End Time: Ends in {product.duration} days
                  </p>
                  <div>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => onRaise(index)}
                    >
                      Raise Bid
                    </button>
                    {raiseIndex === index && (
                      <div>
                        <label htmlFor="raise">
                          Enter your bid (new bid must be at least 10% higher than
                          the current bid):
                        </label>
                        <input type="number" className="bg-light"></input>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary "
                    onClick={() => onView(product.prod_name)}
                  >
                    View Product Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for full-screen image view */}
      <Modal show={modalShow} onHide={closeModal} centered size="xl">
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Full Screen"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsAuc;
