import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stateCityData = {
  "Tamil Nadu":["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam (Ooty)", "Hosur", "Nagercoil", "Kanchipuram", "Kumbakonam", "Tiruvannamalai"],
  "Kerala":["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kottayam", "Kannur", "Manjeri", "Kasaragod", "Aluva", "Kollankodu", "Thalassery", "Ponnani", "Kayamkulam", "Neyyattinkara", "Kanhangad", "Adoor", "Tirur"],
  "Karnataka":["Bengaluru", "Mysuru", "Mangalore", "Hubballi-Dharwad", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hosapete", "Gadag-Betageri", "Robertsonpet", "Udupi", "Kolar", "Chikkamagaluru", "Bagalkot"],
  "Andhra Pradesh":["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Eluru", "Ongole", "Vizianagaram", "Machilipatnam", "Nandyal", "Srikakulam", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram", "Tenali"],
"Arunachal Pradesh":["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Ziro", "Tezu", "Bomdila", "Aalo", "Along", "Daporijo", "Seppa", "Roing", "Anini", "Khonsa", "Tawang", "Changlang", "Yingkiong", "Bordumsa", "Deomali", "Mechuka"],
"Nagaland":["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Chumukedima", "Medziphema", "Pfutsero", "Longleng", "Tizit", "Kiphire", "Changtongya", "Tuli", "Tamlu", "Meluri", "Alichen", "Satakha"],
"Tripura":["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sonamura", "Kamalpur", "Bishalgarh", "Santirbazar", "Kumarghat", "Sabroom", "Amarpur", "Jogendranagar"],
"Gujarat":["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Bharuch", "Valsad", "Porbandar", "Surendranagar", "Morbi", "Nadiad", "Mehsana", "Palanpur", "Bhuj", "Veraval"],
"Rajasthan":["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Barmer", "Tonk", "Sri Ganganagar", "Jhunjhunu", "Banswara", "Dungarpur", "Chittorgarh", "Bundi", "Nagaur"],
"Punjab":["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot"],
"Haryana":["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Palwal", "Rewari", "Narnaul", "Mahendragarh"],
"Bihar":["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif", "Purnia", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Bettiah", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari"],
"Jharkhand":["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar (Daltonganj)", "Chirkunda", "Jhumri Tilaiya", "Gumla", "Jamtara", "Garhwa", "Latehar", "Simdega", "Chaibasa", "Gobindpur", "Chatra"],
"Assam":["Guwahati", "Silchar", "Dibrugarh", "Nagaon", "Tinsukia", "Jorhat", "Bongaigaon City", "Dhubri", "Diphu", "North Lakhimpur", "Tezpur", "Karimganj", "Sibsagar", "Goalpara", "Barpeta", "Nalbari", "Hailakandi", "Hamren", "Lanka", "Abhayapuri"],
"Chhattisgarh":["Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Chirmiri", "Dhamtari", "Mahasamund", "Bhatapara", "Bijapur", "Narayanpur", "Kanker", "Kawardha", "Dongargarh", "Saraipali", "Manendragarh"],
"Uttarakhand":["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Manglaur", "Kichha", "Bageshwar", "Jaspur", "Vikasnagar", "Kotdwara", "Srinagar", "Bazpur", "Nainital", "Tehri", "Ranikhet"],
"Himachal Pradesh":["Shimla", "Solan", "Dharamsala", "Palampur", "Mandi", "Kullu", "Chamba", "Nahan", "Una", "Bilaspur", "Hamirpur", "Nurpur", "Baddi", "Sundernagar", "Paonta Sahib", "Kangra", "Dalhousie", "Mandi", "Parwanoo", "Jogindernagar"],
"Goa":["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Cuncolim", "Valpoi", "Sanguem", "Sanquelim", "Canacona", "Quepem", "Dharbandora", "Cortalim", "Pernem", "Aldona", "Chaudi", "Curchorem Cacora", "Davorlim"],
"Manipur":["Imphal", "Thoubal", "Lilong", "Mayang Imphal", "Kakching", "Nambol", "Yairipok", "Wangoi", "Bishnupur", "Kangpokpi", "Kakching Khunou", "Thongkhong Laxmi Bazar", "Wangjing", "Heirok", "Sugnu", "Sikhong Sekmai", "Samurou", "Lamai", "Sugnu", "Oinam"],
"Meghalaya":["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Nongpoh", "Resubelpara", "Mairang", "Cherrapunji", "Mawkyrwat", "Mawsynram", "Amlarem", "Ranikor", "Nongpoh", "Nongstoin", "Shella Bholaganj", "Baghmara", "Mawphlang", "Mendipathar"],
"Mizoram":["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Saitual", "Thenzawl", "Khawhai", "Hnahthial", "Biate", "Bairabi", "Tlabung"],
"Madhya Pradesh":["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara (Katni)", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur"],
"Odisha":["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Brahmapur", "Bhadrak", "Baripada", "Bhawanipatna", "Rayagada", "Jharsuguda", "Angul", "Dhenkanal", "Bargarh", "Kendujhar", "Paradip", "Jajpur", "Jeypore"],
"Telangana":["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Mancherial", "Adilabad", "Suryapet", "Jagtial", "Miryalaguda", "Nalgonda", "Kamareddy", "Sangareddy", "Bodhan", "Nirmal", "Kothagudem", "Vikarabad", "Sirpur Kagaznagar"],
"Uttar Pradesh":["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad (Prayagraj)", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Faizabad (Ayodhya)"],
"Maharashtra":["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Akola", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Sangli-Miraj & Kupwad", "Nanded", "Malegaon"],
"West Bengal":["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Kharagpur", "Jalpaiguri", "Haldia", "Baharampur", "Habra", "Krishnanagar", "Shantipur", "Dankuni", "Raniganj", "Bhatpara", "Chandannagar", "Hugli-Chinsurah", "Uttarpara Kotrung", "Balurghat"],
"Sikkim":["Gangtok", "Namchi", "Mangan", "Jorethang", "Rangpo", "Gyalshing", "Singtam", "Ravangla", "Soreng", "Rhenock", "Nayabazar"]
}
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
      const response = await axios.post(
        `http://localhost:3001/user/userUpdate/${user}`,
        formData
      );
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white py-8 px-4 overflow-y-auto">
      <h1 className="text-center text-3xl font-bold mb-8">Update Info {user}</h1>
      <form
        className="bg-white text-black rounded-lg shadow-lg p-8 max-w-2xl mx-auto transition-all duration-300 transform hover:scale-105"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="inputEmail4" className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="inputEmail4"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="inputPassword4" className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="inputPassword4"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="inputFirstName" className="block font-semibold mb-2">First Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputFirstName"
            placeholder="First Name"
            value={formData.firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inputLastName" className="block font-semibold mb-2">Last Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputLastName"
            placeholder="Last Name"
            value={formData.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inputContact" className="block font-semibold mb-2">Contact No</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputContact"
            placeholder="(+91) XXXXXXXXXX"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inputAddress" className="block font-semibold mb-2">Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputAddress"
            placeholder="1234 Main St"
            value={formData.address}
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inputAddress2" className="block font-semibold mb-2">Address 2</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={formData.address2}
            name="address2"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="inputState" className="block font-semibold mb-2">State</label>
            <select
              id="inputState"
              className="w-full p-2 border border-gray-300 rounded-md"
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
          <div className="mb-4">
            <label htmlFor="inputCity" className="block font-semibold mb-2">City</label>
            <select
              id="inputCity"
              className="w-full p-2 border border-gray-300 rounded-md"
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
        <div className="mb-4">
          <label htmlFor="inputZip" className="block font-semibold mb-2">Zip</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="inputZip"
            value={formData.zipcode}
            name="zipcode"
            onChange={handleChange}
          />
        </div>
       
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
