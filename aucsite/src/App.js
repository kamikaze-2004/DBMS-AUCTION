import "./styles/index.css";
import Login from "./components/login";
import Register from "./components/register";
import UserUpdate from "./components/userupdate";
import Home from "./components/home";
import Header from "./Header";
import ProdIns from "./components/prod_ins";
import Dashboard from "./components/dashboard";
import ViewInfo from "./components/viewInfo";
import SoldProducts from "./components/SoldProduct";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductsDir from "./components/direct_prods";
import ProductsAuc from "./components/auction_prods";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Header user={user}/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} user={user}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/prod_ins" element={<ProdIns user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/userUpdate" element={<UserUpdate user={user} />} />
        <Route path="/viewInfo" element={<ViewInfo user={user} />} />
        <Route path="/SoldProduct" element={<SoldProducts user={user} />} />
        <Route path="/products_dir" element={<ProductsDir user={user} />} />
        <Route path="/products_auc" element={<ProductsAuc user={user} />} />
      </Routes>
    </div>
  );
}
export default App;
