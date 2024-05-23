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
        
        const response = await axios.get(`http://localhost:3001/api/products/${username}`);
        setProductDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message || 'Failed to fetch product details');
      }
    };

    fetchProductDetails();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-black py-8 px-4 overflow-y-auto">
      <div className="container mx-auto p-4 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Product Details</h2>
        {error ? (
          <div className="bg-red-600 text-black p-3 rounded-lg mb-4">
            {error}
          </div>
        ) : ( productDetails.length === 0 ? 
          <p className="text-center text-white">No Products available currently!</p> : 
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white bg-opacity-25 border border-gray-200 rounded-lg text-black">
              <thead>
                <tr className="bg-gray-800 bg-opacity-50 border-b">
                  <th className="py-2 px-4 text-left">S no.</th>
                  <th className="py-2 px-4 text-left">Car Name</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Years of Usage</th>
                  <th className="py-2 px-4 text-left">Sale status</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={product.prod_name} className="border-b bg-gray-700 bg-opacity-40">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{product.car_brand+" "+product.car_model}</td>
                    <td className="py-2 px-4">{product.price}</td>
                    <td className="py-2 px-4">{product.y_o_u ? product.y_o_u : "Not for auction"}</td>
                    <td className="py-2 px-4">{product.sold_status==="true"?"Sold":"Yet to be sold"}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
