import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ProdIns({ user }) {
  const [saleType, setSaleType] = useState("direct");

  const [formData, SetFormData] = useState({
    prod_name: "",
    username: "",
    email: "",
    password: "",
    price: "",
    y_o_u: null,
    sale_type: "direct",
    duration: null,
  });
  const handleSaleTypeChange = (e) => {
    setSaleType(e.target.value);
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post(
        `http://localhost:3001/user/prod_ins/${user}`,
        formData
      );
      console.log("product registered successfully:", response.data);
      if (response.status === 200) {
        toast.success("Product added to sale successfully", {
          onClose: () => navigate("/dashboard"),
        }); //change path to view user products if needed
      }
    } catch (err) {
      toast.error(
        "failed to add product for sale. kindly recheck your credentials  "
      );
      console.error("Error registering product:", err);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row justify-content-center mt-5 mx-auto w-75 ">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-body">
              <h2 className="text-center mb-4">Reg_product</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputUserName">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUserName"
                    placeholder="UserName"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prod_name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="textbox"
                    className="form-control "
                    id="prod_name"
                    placeholder="car_name  "
                    autoComplete=""
                    name="prod_name"
                    onChange={handleChange}
                    value={formData.prod_name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sale Type</label>
                  <br />
                  <input
                    type="radio"
                    id="direct"
                    name="sale_type"
                    value="direct"
                    checked={saleType === "direct"}
                    onChange={handleSaleTypeChange}
                  />

                  <label htmlFor="direct">Direct</label>
                  <input
                    type="radio"
                    id="auction"
                    name="sale_type"
                    value="auction"
                    checked={saleType === "auction"}
                    onChange={handleSaleTypeChange}
                  />

                  <label htmlFor="auction">Auction</label>
                </div>

                {saleType === "direct" && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control "
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control "
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="years_of_use" className="form-label">
                        Years_of_use
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        id="years_of_use"
                        placeholder="10"
                        onChange={handleChange}
                        name="y_o_u"
                        value={formData.y_o_u}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        id="price"
                        placeholder="0"
                        min="0.00"
                        max="100000000.00"
                        step="1000"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                {saleType === "auction" && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control "
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control "
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="years_of_use" className="form-label">
                        Years_of_use
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        id="years_of_use"
                        placeholder="10"
                        onChange={handleChange}
                        name="y_o_u"
                        value={formData.y_o_u}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        id="price"
                        placeholder="0"
                        min="0.00"
                        max="100000000.00"
                        step="1000"
                        onChange={handleChange}
                        name="price"
                        value={formData.price}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="auc_period" className="form-label">
                        Auction duration(in days)
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        id="auc_period"
                        placeholder="10"
                        min="3"
                        max="14"
                        onChange={handleChange}
                        name="duration"
                        value={formData.duration}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary mr-3 pl-3 m-50"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}