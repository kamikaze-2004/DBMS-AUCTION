import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';

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

export default function ProdIns({ user }) {
  const [saleType, setSaleType] = useState("direct");
  const new_id = nanoid();

  const [formData, setFormData] = useState({
    //prod_name: "",
    username: "",
    email: "",
    image: null,
    password: "",
    price: "",
    prod_id: new_id,
    y_o_u: null,
    sale_type: "direct",
    duration: null,
    car_brand: "",
    car_model: "",
  });

  const handleSaleTypeChange = (e) => {
    setSaleType(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBrandChange = (e) => {
    setFormData({ ...formData, car_brand: e.target.value, car_model: "" });
  };

  const filteredModels = formData.car_brand ? carModels.find((car) => car.brand === formData.car_brand)?.models || [] : [];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
  
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'image') {
          for (let i = 0; i < formData.image.length; i++) {
            formDataToSend.append('images', formData.image[i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
  
      const response = await axios.post(
        `http://localhost:3001/user/prod_ins/${user}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log("product registered successfully:", response.data);
      if (response.status === 200) {
        toast.success("Product added to sale successfully", {
          onClose: () => navigate("/dashboard"),
        });
      }
    } catch (err) {
      toast.error(
        "Failed to add product for sale. Kindly recheck your credentials"
      );
      console.error("Error registering product:", err);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5 mx-auto w-75">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Reg_product</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                {/* <div className="mb-3">
                  <label htmlFor="prod_name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="prod_name"
                    placeholder="car_name"
                    name="prod_name"
                    onChange={handleChange}
                    value={formData.prod_name}
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="carBrand" className="form-label">Car Brand</label>
                  <select
                    className="form-select"
                    id="carBrand"
                    name="car_brand"
                    value={formData.car_brand}
                    onChange={handleBrandChange}
                  >
                    <option value="">Select Brand</option>
                    {carModels.map((car) => (
                      <option key={car.brand} value={car.brand}>
                        {car.brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="carModel" className="form-label">Car Model</label>
                  <select
                    className="form-select"
                    id="carModel"
                    name="car_model"
                    value={formData.car_model}
                    onChange={handleChange}
                    disabled={!formData.car_brand}
                  >
                    <option value="">Select Model</option>
                    {filteredModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Car official document</label>
                  <input
                    type="file"
                    name="offdoc"
                    id="offdoc"
                    accept="image/png image/jpg image/jpeg"
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Car image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sale Type</label><br/>
                  <input
                    type="radio"
                    id="direct"
                    name="sale_type"
                    value="direct"
                    checked={saleType === 'direct'}
                    onChange={handleSaleTypeChange}
                  />
                  <label htmlFor="direct">Direct</label>
                  <input
                    type="radio"
                    id="auction"
                    name="sale_type"
                    value="auction"
                    checked={saleType === 'auction'}
                    onChange={handleSaleTypeChange}
                  />
                  <label htmlFor="auction">Auction</label>
                </div>
                {saleType === "direct" && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="years_of_use" className="form-label">Years of use</label>
                      <input
                        type="number"
                        className="form-control"
                        id="years_of_use"
                        placeholder="10"
                        name="y_o_u"
                        value={formData.y_o_u}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
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
                {saleType === 'auction' && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="years_of_use" className="form-label">Years of use</label>
                      <input
                        type="number"
                        className="form-control"
                        id="years_of_use"
                        placeholder="10"
                        name="y_o_u"
                        value={formData.y_o_u}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
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
                    <div className="mb-3">
                      <label htmlFor="auc_period" className="form-label">Auction duration (in days)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="auc_period"
                        placeholder="10"
                        min="3"
                        max="14"
                        name="duration"
                        defaultValue={null}
                        value={formData.duration}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
