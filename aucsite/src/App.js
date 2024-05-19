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
import PayOrder from "./components/Pay";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductsDir from "./components/direct_prods";
import ProductsAuc from "./components/auction_prods";
import ViewProduct from "./components/viewProd";
//import LandingPage from "./components/landingpage";

function App() {
  const [user, setUser] = useState(null);
  const [seller,setSeller]=useState(null);
  const [loading, setLoading] = useState(true);
    return (
    <div className="App">
      <Header user={user} loading={loading} setLoading={setLoading}/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/login" element={<Login setUser={setUser} user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/register" element={<Register loading={loading} setLoading={setLoading}/>} />
        <Route path="/prod_ins" element={<ProdIns user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/dashboard" element={<Dashboard user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/userUpdate" element={<UserUpdate user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/viewInfo" element={<ViewInfo user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/SoldProduct" element={<SoldProducts user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/products_dir" element={<ProductsDir user={user} seller={seller} setSeller={setSeller} setUser={setUser} loading={loading} setLoading={setLoading}/>} />
        <Route path="/products_auc" element={<ProductsAuc user={user} seller={seller} setSeller={setSeller} setUser={setUser} loading={loading} setLoading={setLoading}/>} />
        <Route path="/viewProd/:prodname" element={<ViewProduct user={user} loading={loading} setLoading={setLoading}/>} />
        <Route path="/pay/:prodname" element={<PayOrder user={user} seller={seller} setSeller={setSeller} setUser={setUser} loading={loading} setLoading={setLoading}/>} />
      </Routes>
    </div>
  );
}
export default App;
