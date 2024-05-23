import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../styles/tailwind.css";

const ProductsCombined = ({ user, setUser, seller, setSeller }) => {
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const carouselRefs = useRef([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function onView(pid) {
    navigate(`/viewProd/${pid}`);
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/direct_prods/${user}`
        );
        const filteredProducts = response.data.filter(
          (product) => product.username !== user
        );
        setAllProductDetails(filteredProducts);
        setFilteredProducts(filteredProducts);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product details of all products:", error);
        setError(error.message || "Failed to fetch all product details");
      }
    };
    fetchProductDetails();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      filteredProducts.forEach((product, index) => {
        if (carouselRefs.current[index]) {
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
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredProducts]);

  const handlePrev = (index) => {
    if (carouselRefs.current[index]) {
      const carousel = carouselRefs.current[index];
      const activeSlide = carousel.querySelector(".carousel-item.active");
      if (activeSlide.previousElementSibling) {
        activeSlide.classList.remove("active");
        activeSlide.previousElementSibling.classList.add("active");
      } else {
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

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allProductDetails.filter((product) =>
      (product.car_brand && product.car_brand.toLowerCase().includes(query)) ||
      (product.username && product.username.toLowerCase().includes(query)) ||
      (product.price && product.price.toString().includes(query)) ||
      (product.y_o_u && product.y_o_u.toString().includes(query))
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Product Details</h2>
      <input
        type="text"
        className="form-control mb-3 w-full px-4 py-2 rounded-md text-black"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {error ? (
        <div className="bg-red-500 text-white p-4 rounded-md text-center">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-xl">No Products available currently!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.prod_id}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {product.image_paths && (
                <div
                  id={`carousel-${index}`}
                  className="relative carousel slide"
                  data-bs-ride="carousel"
                  ref={(ref) => (carouselRefs.current[index] = ref)}
                >
                  <div className="carousel-inner">
                    {product.image_paths.split(",").map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                      >
                        <img
                          src={`http://localhost:3001/${image.trim()}`}
                          className="w-full h-64 object-cover"
                          alt={`Product ${imgIndex + 1}`}
                          onClick={() => openModal(`http://localhost:3001/${image.trim()}`)}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev absolute top-1/2 transform -translate-y-1/2 left-0"
                    type="button"
                    data-bs-target={`#carousel-${index}`}
                    data-bs-slide="prev"
                    onClick={() => handlePrev(index)}
                  >
                    <span className="carousel-control-prev-icon bg-black bg-opacity-50 rounded-full p-2"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next absolute top-1/2 transform -translate-y-1/2 right-0"
                    type="button"
                    data-bs-target={`#carousel-${index}`}
                    data-bs-slide="next"
                    onClick={() => handleNext(index)}
                  >
                    <span className="carousel-control-next-icon bg-black bg-opacity-50 rounded-full p-2"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              )}
              <div className="p-4">
                <h5 className="text-2xl font-bold mb-2">{product.car_brand} {product.car_model}</h5>
                <p className="text-gray-700 mb-1">Username: {product.username}</p>
                <p className="text-gray-700 mb-1">Price: Rs.{product.price}</p>
                <p className="text-gray-700 mb-1">Years of Usage: {product.y_o_u ? product.y_o_u : "Not mentioned"}</p>
                <div className="flex space-x-2">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={() => {
                      setSeller(product.username);
                      navigate(`/pay/${product.prod_id}?price=${product.price}`);
                    }}
                  >
                    Buy
                  </button>
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={() => onView(product.prod_id)}
                  >
                    View Product Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal show={modalShow} onHide={closeModal} centered size="xl">
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Full Screen"
            className="w-full h-auto"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsCombined;
