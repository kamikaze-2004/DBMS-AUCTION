import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const usernameCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('username='));
        if (!usernameCookie) {
          throw new Error('Username cookie not found');
        }
        const username = usernameCookie.split('=')[1];
        console.log("Extracted username:", username);
        
        const response = await axios.get(`http://localhost:3000/api/products/${username}`);
        setProductDetails(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message || 'Failed to fetch product details');
      }
    };

    fetchProductDetails();
  }, []); 

  return (
    <div className="container-fluid">
      <h2>Product Details</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : ( productDetails.length === 0 ? <p>No Products available currently!</p> :
        <table className="table">
          <thead>
            <tr>
              <th>S no.</th>
              <th>Car Brand</th>
              <th>Car Model</th>
              <th>Price</th>
              <th>Years of Usage</th>
              <th>Sale-Status</th>
            </tr>
          </thead>
          <tbody>
          {
            productDetails.map((product,index) => (<tr key={product.prod_id}>
              <td>{index+1}</td>
              <td>{product.car_brand}</td>
              <td>{product.car_model}</td>
              <td>{product.price}</td>
              <td>{product.y_o_u ? product.y_o_u : "Not for auction"}</td>
              <td>{product.sold_status? "Sold" : "Yet to be Sold"}</td>
            </tr>))
          }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductDetails;
