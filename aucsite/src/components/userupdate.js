import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import '/Users/amvis/Desktop/DBMS-Auction/DBMS-AUCTION/aucsite/src/login.css'; // Assuming you have your custom styles in this file

const stateCityData = {
  "Tamil Nadu":["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam (Ooty)", "Hosur", "Nagercoil", "Kanchipuram", "Kumbakonam", "Tiruvannamalai"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Eluru", "Ongole", "Vizianagaram", "Machilipatnam", "Nandyal", "Srikakulam", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram", "Tenali"],
  "Karnataka":["Bengaluru", "Mysuru", "Mangalore", "Hubballi-Dharwad", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hosapete", "Gadag-Betageri", "Robertsonpet", "Udupi", "Kolar", "Chikkamagaluru", "Bagalkot"],
  "Maharashtra":["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Akola", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Sangli-Miraj & Kupwad", "Nanded", "Malegaon"],
  "Uttar Pradesh":["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad (Prayagraj)", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Faizabad (Ayodhya)"],
  "West Bengal":["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Kharagpur", "Jalpaiguri", "Haldia", "Baharampur", "Habra", "Krishnanagar", "Shantipur", "Dankuni", "Raniganj", "Bhatpara", "Chandannagar", "Hugli-Chinsurah", "Uttarpara Kotrung", "Balurghat"],
  "Gujarat":["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Bharuch", "Valsad", "Porbandar", "Surendranagar", "Morbi", "Nadiad", "Mehsana", "Palanpur", "Bhuj", "Veraval"],
  "Rajasthan":["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Barmer", "Tonk", "Sri Ganganagar", "Jhunjhunu", "Banswara", "Dungarpur", "Chittorgarh", "Bundi", "Nagaur"],
  "Punjab":["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot"],
  "Haryana":["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Palwal", "Rewari", "Narnaul", "Mahendragarh"],
  "Bihar":["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif", "Purnia", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Bettiah", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari"],
 "Madhya Pradesh":["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara (Katni)", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur"],
  "Odisha":["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Brahmapur", "Bhadrak", "Baripada", "Bhawanipatna", "Rayagada", "Jharsuguda", "Angul", "Dhenkanal", "Bargarh", "Kendujhar", "Paradip", "Jajpur", "Jeypore"],
  "Kerala":["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kottayam", "Kannur", "Manjeri", "Kasaragod", "Aluva", "Kollankodu", "Thalassery", "Ponnani", "Kayamkulam", "Neyyattinkara", "Kanhangad", "Adoor", "Tirur"],
  "Telangana":["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Mancherial", "Adilabad", "Suryapet", "Jagtial", "Miryalaguda", "Nalgonda", "Kamareddy", "Sangareddy", "Bodhan", "Nirmal", "Kothagudem", "Vikarabad", "Sirpur Kagaznagar"],
  "Jharkhand":["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar (Daltonganj)", "Chirkunda", "Jhumri Tilaiya", "Gumla", "Jamtara", "Garhwa", "Latehar", "Simdega", "Chaibasa", "Gobindpur", "Chatra"],
  "Assam":["Guwahati", "Silchar", "Dibrugarh", "Nagaon", "Tinsukia", "Jorhat", "Bongaigaon City", "Dhubri", "Diphu", "North Lakhimpur", "Tezpur", "Karimganj", "Sibsagar", "Goalpara", "Barpeta", "Nalbari", "Hailakandi", "Hamren", "Lanka", "Abhayapuri"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Chirmiri", "Dhamtari", "Mahasamund", "Bhatapara", "Bijapur", "Narayanpur", "Kanker", "Kawardha", "Dongargarh", "Saraipali", "Manendragarh"],
  "Haryana":["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Palwal", "Rewari", "Narnaul", "Mahendragarh"],
 "Uttarakhand":["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Manglaur", "Kichha", "Bageshwar", "Jaspur", "Vikasnagar", "Kotdwara", "Srinagar", "Bazpur", "Nainital", "Tehri", "Ranikhet"],
"Arunachal Pradesh":["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Ziro", "Tezu", "Bomdila", "Aalo", "Along", "Daporijo", "Seppa", "Roing", "Anini", "Khonsa", "Tawang", "Changlang", "Yingkiong", "Bordumsa", "Deomali", "Mechuka"],
"Nagaland":["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Chumukedima", "Medziphema", "Pfutsero", "Longleng", "Tizit", "Kiphire", "Changtongya", "Tuli", "Tamlu", "Meluri", "Alichen", "Satakha"],
 "Tripura":["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sonamura", "Kamalpur", "Bishalgarh", "Santirbazar", "Kumarghat", "Sabroom", "Amarpur", "Jogendranagar"],
"Himachal Pradesh":["Shimla", "Solan", "Dharamsala", "Palampur", "Mandi", "Kullu", "Chamba", "Nahan", "Una", "Bilaspur", "Hamirpur", "Nurpur", "Baddi", "Sundernagar", "Paonta Sahib", "Kangra", "Dalhousie", "Mandi", "Parwanoo", "Jogindernagar"],
"Goa":["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Cuncolim", "Valpoi", "Sanguem", "Sanquelim", "Canacona", "Quepem", "Dharbandora", "Cortalim", "Pernem", "Aldona", "Chaudi", "Curchorem Cacora", "Davorlim"],
"Manipur":["Imphal", "Thoubal", "Lilong", "Mayang Imphal", "Kakching", "Nambol", "Yairipok", "Wangoi", "Bishnupur", "Kangpokpi", "Kakching Khunou", "Thongkhong Laxmi Bazar", "Wangjing", "Heirok", "Sugnu", "Sikhong Sekmai", "Samurou", "Lamai", "Sugnu", "Oinam"],
"Meghalaya":["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Nongpoh", "Resubelpara", "Mairang", "Cherrapunji", "Mawkyrwat", "Mawsynram", "Amlarem", "Ranikor", "Nongpoh", "Nongstoin", "Shella Bholaganj", "Baghmara", "Mawphlang", "Mendipathar"],
"Mizoram":["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Saitual", "Thenzawl", "Khawhai", "Hnahthial", "Biate", "Bairabi", "Tlabung"],
"Sikkim":["Gangtok", "Namchi", "Mangan", "Jorethang", "Rangpo", "Gyalshing", "Singtam", "Ravangla", "Soreng", "Rhenock", "Nayabazar"]
};

function UserUpdate({ user }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    address2: "",
    contact: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value, city: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data:", formData);
      const response = await axios.post(`http://localhost:3000/user/userUpdate/${user}`,formData);
      console.log("User updated successfully:", response.data);
      if (response.status === 200) {
        toast.success("User updated successfully");
        navigate("/viewInfo");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="container-fluid bg-light text-dark">
      <h1 className="text-black text-center">Update Info {user}</h1>
      <form
        className="row justify-content-center mt-3 mx-auto w-75 text-start"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputEmail4" className="font-weight-bold font-italic">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputFirstName">FirstName</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="FirstName"
            value={formData.firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputLastName">LastName</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="LastName"
            value={formData.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputContact">Contact No</label>
          <input
            type="tel"
            className="form-control"
            id="inputContact"
            placeholder="(+91) XXXXXXXXXX"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={formData.address}
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={formData.address2}
            name="address2"
            onChange={handleChange}
          />
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputState">State</label>
            <select
              id="inputState"
              className="form-control"
              value={formData.state}
              name="state"
              onChange={handleStateChange}
            >
              <option value="" disabled>Select a state</option>
              {Object.keys(stateCityData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputCity">City</label>
            <select
              id="inputCity"
              className="form-control"
              value={formData.city}
              name="city"
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="" disabled>Select a city</option>
              {formData.state && stateCityData[formData.state].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={formData.zipcode}
              name="zipcode"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-5 w-25">
          Update
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;