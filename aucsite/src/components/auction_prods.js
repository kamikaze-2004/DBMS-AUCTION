import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../styles/tailwind.css';
import '../styles/auction_prods.css';

const ProductsAuc = ({ user }) => {
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [raiseIndex, setRaiseIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bidAmount, setBidAmount] = useState({});
  const [remainingTime, setRemainingTime] = useState({});
  const navigate = useNavigate();
  const carouselRefs = useRef([]);

  const currUser = user;

  function onView(prod_name) {
    navigate(`/viewProd/${prod_name}`);
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/products/auction_prods/${user}`
        );
        setAllProductDetails(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message || 'Failed to fetch product details');
      }
    };
    fetchProductDetails();
  }, [user, bidAmount]);

  useEffect(() => {
    const interval = setInterval(() => {
      filteredProducts.forEach((product, index) => {
        if (carouselRefs.current[index]) {
          const carousel = carouselRefs.current[index];
          const nextSlide = carousel.querySelector(
            '.carousel-item.active + .carousel-item'
          );
          if (nextSlide) {
            carousel.querySelector('.carousel-item.active').classList.remove('active');
            nextSlide.classList.add('active');
          } else {
            carousel.querySelector('.carousel-item.active').classList.remove('active');
            carousel.querySelector('.carousel-item:first-child').classList.add('active');
          }
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredProducts]);

  useEffect(() => {
    const updateRemainingTime = () => {
      const newRemainingTime = {};
      filteredProducts.forEach((product) => {
        const endDate = new Date(product.createdAt);
        endDate.setHours(endDate.getHours() + product.duration);
        const now = new Date();
        const diff = endDate - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newRemainingTime[product.prod_id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newRemainingTime[product.prod_id] = 'Auction Ended';
        }
      });
      setRemainingTime(newRemainingTime);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000); 

    return () => clearInterval(interval);
  }, [filteredProducts]);

  const onRaise = (index) => {
    setRaiseIndex(raiseIndex === index ? null : index);
  };

  const handlePrev = (index) => {
    if (carouselRefs.current[index]) {
      const carousel = carouselRefs.current[index];
      const activeSlide = carousel.querySelector('.carousel-item.active');
      if (activeSlide.previousElementSibling) {
        activeSlide.classList.remove('active');
        activeSlide.previousElementSibling.classList.add('active');
      } else {
        const lastSlide = carousel.querySelector('.carousel-item:last-child');
        activeSlide.classList.remove('active');
        lastSlide.classList.add('active');
      }
    }
  };

  const handleNext = (index) => {
    if (carouselRefs.current[index]) {
      const carousel = carouselRefs.current[index];
      const activeSlide = carousel.querySelector('.carousel-item.active');
      if (activeSlide.nextElementSibling) {
        activeSlide.classList.remove('active');
        activeSlide.nextElementSibling.classList.add('active');
      } else {
        const firstSlide = carousel.querySelector('.carousel-item:first-child');
        activeSlide.classList.remove('active');
        firstSlide.classList.add('active');
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

  const isAuctionEnded = (product) => {
    const endDate = new Date(product.createdAt);
    endDate.setHours(endDate.getHours() + product.duration);
    return new Date() > endDate;
  };

  const isHighestBidder = (product) => {
    return product.highest_bidder === currUser;
  };

  const handleBidChange = (event, prod_id) => {
    const newBidAmount = event.target.value;
    setBidAmount({ ...bidAmount, [prod_id]: newBidAmount });
  };

  const handleBidSubmit = async (event, product) => {
    event.preventDefault();
    const newBid = bidAmount[product.prod_id];
    if (newBid && newBid >= product.curr_bid * 1.1) {
      try {
        await axios.post(`http://localhost:3001/user/products/auction_prods/curr-bid`, {
          prodID: product.prod_id,
          bid: newBid,
          user: currUser,
        });

        alert('Bid successfully placed!');
        setBidAmount({ ...bidAmount, [product.prod_id]: '' });
        setRaiseIndex(null);

        const updatedProductDetails = await axios.get(
          `http://localhost:3001/user/products/auction_prods/${user}`
        );
        setAllProductDetails(updatedProductDetails.data);
        setFilteredProducts(updatedProductDetails.data);
      } catch (error) {
        console.error('Error placing bid:', error);
        alert('Failed to place bid.');
      }
    } else {
      alert(
        `Bid must be at least 10% higher than the current bid of Rs.${product.curr_bid}`
      );
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allProductDetails.filter((product) =>
      (product.car_brand && product.car_brand.toLowerCase().includes(query)) ||
      (product.username && product.username.toLowerCase().includes(query)) ||
      (product.price && product.price.toString().includes(query)) ||
      (product.y_o_u && product.y_o_u.toString().includes(query)) ||
      (product.duration && product.duration.toString().includes(query))
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Product Details</h2>
      <input
        type="text"
        className="form-control mb-3"
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
                    {product.image_paths.split(',').map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}
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
                <h5 className="text-2xl font-bold mb-2">{product.car_brand + " " + product.car_model}</h5>
                <p className="text-gray-600 mb-2">Username: {product.username}</p>
                <p className="text-gray-600 mb-2">Price: Rs.{product.price}</p>
                <p className="text-gray-600 mb-2">Current Bid: Rs.{product.curr_bid}</p>
                <p className="text-gray-600 mb-2">Years of Usage: {product.y_o_u ? product.y_o_u : "Not mentioned"}</p>
                <p className={`mb-2 ${remainingTime[product.prod_id] === 'Auction Ended' ? 'text-red-600' : 'text-green-600'}`}>
                  Time Remaining: {remainingTime[product.prod_id]}
                </p>
                {raiseIndex === index && !isAuctionEnded(product) ? (
                  <form onSubmit={(event) => handleBidSubmit(event, product)} className="mt-2">
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="border border-gray-400 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={bidAmount[product.prod_id] || ''}
                        onChange={(event) => handleBidChange(event, product.prod_id)}
                        min={product.curr_bid * 1.1}
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-r px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        Submit Bid
                      </button>
                    </div>
                  </form>
                ) : isAuctionEnded(product) ? (
                  <p className="text-red-600">Auction has ended</p>
                ) : (
                  <>
                    <button
                      onClick={() => onRaise(index)}
                      className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                    >
                      Raise Bid
                    </button>
                  </>
                )}
                {isHighestBidder(product) && (
                  <p className="text-green-600 mt-2">You are the highest bidder!</p>
                )}
                <button
                  onClick={() => onView(product.prod_id)}
                  className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal show={modalShow} onHide={closeModal} centered>
        <Modal.Body>
          <img src={selectedImage} alt="Selected" className="w-full" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsAuc;
