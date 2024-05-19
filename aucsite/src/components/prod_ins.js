import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ProdIns({ user }) {
  const [saleType, setSaleType] = useState("direct");

  const carModels = [
    { brand: "Acura", models: ["ILX", "MDX", "NSX", "RDX", "RLX", "TLX"] },
    { brand: "Alfa Romeo", models: ["4C", "Giulia", "Stelvio"] },
    { brand: "Aston Martin", models: ["DB11", "DBS Superleggera", "Vantage"] },
    {
      brand: "Audi",
      models: [
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "Q3",
        "Q5",
        "Q7",
        "Q8",
        "R8",
        "RS3",
        "RS5",
        "RS6",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "SQ5",
        "TT",
      ],
    },
    { brand: "Bentley", models: ["Bentayga", "Continental GT", "Flying Spur"] },
    {
      brand: "BMW",
      models: [
        "2 Series",
        "3 Series",
        "4 Series",
        "5 Series",
        "6 Series",
        "7 Series",
        "8 Series",
        "i3",
        "i8",
        "M2",
        "M3",
        "M4",
        "M5",
        "M8",
        "X1",
        "X2",
        "X3",
        "X4",
        "X5",
        "X6",
        "X7",
        "Z4",
      ],
    },
    {
      brand: "Buick",
      models: ["Enclave", "Encore", "Envision", "LaCrosse", "Regal"],
    },
    {
      brand: "Cadillac",
      models: ["ATS", "CT4", "CT5", "CT6", "Escalade", "XT4", "XT5", "XT6"],
    },
    {
      brand: "Chevrolet",
      models: [
        "Blazer",
        "Camaro",
        "Colorado",
        "Corvette",
        "Equinox",
        "Impala",
        "Malibu",
        "Silverado 1500",
        "Silverado 2500HD",
        "Suburban",
        "Tahoe",
        "Trailblazer",
        "Traverse",
        "Trax",
        "Volt",
      ],
    },
    { brand: "Chrysler", models: ["300", "Pacifica", "Voyager"] },
    {
      brand: "Dodge",
      models: ["Challenger", "Charger", "Durango", "Grand Caravan", "Journey"],
    },
    {
      brand: "Ferrari",
      models: [
        "488",
        "812 Superfast",
        "GTC4Lusso",
        "Portofino",
        "Roma",
        "SF90 Stradale",
      ],
    },
    { brand: "Fiat", models: ["124 Spider", "500", "500L", "500X"] },
    {
      brand: "Ford",
      models: [
        "Bronco",
        "EcoSport",
        "Edge",
        "Escape",
        "Expedition",
        "Explorer",
        "F-150",
        "F-250",
        "F-350",
        "Fusion",
        "Mustang",
        "Ranger",
        "Transit Connect",
      ],
    },
    { brand: "Genesis", models: ["G70", "G80", "G90"] },
    {
      brand: "GMC",
      models: [
        "Acadia",
        "Canyon",
        "Sierra 1500",
        "Sierra 2500HD",
        "Terrain",
        "Yukon",
      ],
    },
    {
      brand: "Honda",
      models: [
        "Accord",
        "Civic",
        "Clarity",
        "CR-V",
        "Fit",
        "HR-V",
        "Insight",
        "Odyssey",
        "Passport",
        "Pilot",
        "Ridgeline",
      ],
    },
    {
      brand: "Hyundai",
      models: [
        "Accent",
        "Elantra",
        "Ioniq",
        "Kona",
        "Nexo",
        "Palisade",
        "Santa Fe",
        "Sonata",
        "Tucson",
        "Veloster",
        "Venue",
      ],
    },
    { brand: "Infiniti", models: ["Q50", "Q60", "QX50", "QX60", "QX80"] },
    {
      brand: "Jaguar",
      models: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF", "XJ"],
    },
    {
      brand: "Jeep",
      models: [
        "Cherokee",
        "Compass",
        "Gladiator",
        "Grand Cherokee",
        "Renegade",
        "Wrangler",
      ],
    },
    {
      brand: "Kia",
      models: [
        "Forte",
        "K5",
        "Niro",
        "Optima",
        "Rio",
        "Seltos",
        "Sorento",
        "Soul",
        "Sportage",
        "Stinger",
        "Telluride",
      ],
    },
    { brand: "Lamborghini", models: ["Aventador", "Huracán", "Urus"] },
    {
      brand: "Land Rover",
      models: [
        "Defender",
        "Discovery",
        "Discovery Sport",
        "Range Rover",
        "Range Rover Evoque",
        "Range Rover Sport",
        "Range Rover Velar",
      ],
    },
    {
      brand: "Lexus",
      models: ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
    },
    {
      brand: "Lincoln",
      models: [
        "Aviator",
        "Continental",
        "Corsair",
        "MKZ",
        "Nautilus",
        "Navigator",
      ],
    },
    { brand: "Lotus", models: ["Evora", "Exige"] },
    { brand: "Maserati", models: ["Ghibli", "Levante", "Quattroporte"] },
    {
      brand: "Mazda",
      models: [
        "CX-3",
        "CX-30",
        "CX-5",
        "CX-9",
        "Mazda3",
        "Mazda6",
        "MX-5 Miata",
      ],
    },
    { brand: "McLaren", models: ["540C", "570S", "600LT", "720S", "GT"] },
    {
      brand: "Mercedes-Benz",
      models: [
        "A-Class",
        "C-Class",
        "CLA-Class",
        "CLS-Class",
        "E-Class",
        "G-Class",
        "GLA-Class",
        "GLB-Class",
        "GLC-Class",
        "GLE-Class",
        "GLS-Class",
        "S-Class",
      ],
    },
    {
      brand: "MINI",
      models: ["Cooper", "Countryman", "Clubman", "Convertible", "Hardtop"],
    },
    {
      brand: "Mitsubishi",
      models: ["Eclipse Cross", "Mirage", "Outlander", "Outlander Sport"],
    },
    {
      brand: "Nissan",
      models: [
        "370Z",
        "Altima",
        "Armada",
        "Frontier",
        "GT-R",
        "Kicks",
        "Leaf",
        "Maxima",
        "Murano",
        "Pathfinder",
        "Rogue",
        "Rogue Sport",
        "Sentra",
        "Titan",
        "Versa",
      ],
    },
    {
      brand: "Porsche",
      models: [
        "718 Boxster",
        "718 Cayman",
        "911",
        "Cayenne",
        "Macan",
        "Panamera",
        "Taycan",
      ],
    },
    { brand: "Ram", models: ["1500", "2500", "3500"] },
    {
      brand: "Rolls-Royce",
      models: ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"],
    },
    {
      brand: "Subaru",
      models: [
        "Ascent",
        "BRZ",
        "Crosstrek",
        "Forester",
        "Impreza",
        "Legacy",
        "Outback",
        "WRX",
      ],
    },
    {
      brand: "Tesla",
      models: ["Model 3", "Model S", "Model X", "Model Y", "Roadster"],
    },
    {
      brand: "Toyota",
      models: [
        "4Runner",
        "Avalon",
        "C-HR",
        "Camry",
        "Corolla",
        "Highlander",
        "Land Cruiser",
        "Mirai",
        "Prius",
        "Rav4",
        "Sequoia",
        "Sienna",
        "Supra",
        "Tacoma",
        "Tundra",
        "Venza",
        "Yaris",
      ],
    },
    {
      brand: "Volkswagen",
      models: [
        "Arteon",
        "Atlas",
        "Atlas Cross Sport",
        "Golf",
        "Jetta",
        "Passat",
        "Tiguan",
      ],
    },
    {
      brand: "Volvo",
      models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
    },
  ];

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
