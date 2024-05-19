import "./styles/index.css";
import Login from "./components/login";
import Register from "./components/register";
import UserUpdate from "./components/userupdate";
import Home from "./components/home";
import Header from "./Header";
import ProdIns from "./components/prod_ins";
import Dashboard from "./components/dashboard";
import ViewInfo from "./components/viewInfo";
import SoldProducts from "./components/saleproducts";
import PayOrder from "./components/Pay";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductsDir from "./components/direct_prods";
import ProductsAuc from "./components/auction_prods";
import ViewProduct from "./components/viewProd";
import ViewDirOrder from "./components/viewOrders";
import ViewAucOrder from "./components/viewAucOrders";

function App() {
  const [user, setUser] = useState(null);
  const [seller,setSeller]=useState(null);
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
        <Route path="/viewdirOrders" element={<ViewDirOrder user={user} />} />
        <Route path="/viewaucOrders" element={<ViewAucOrder user={user} />} />
        <Route path="/SoldProduct" element={<SoldProducts user={user} />} />
        <Route path="/products_dir" element={<ProductsDir user={user} seller={seller} setSeller={setSeller} setUser={setUser}/>} />
        <Route path="/products_auc" element={<ProductsAuc user={user} seller={seller} setSeller={setSeller} setUser={setUser}/>} />
        <Route path="/viewProd/:prodname" element={<ViewProduct user={user} />} />
        <Route path="/pay/:prodname" element={<PayOrder user={user} seller={seller} setSeller={setSeller} setUser={setUser}/>} />
      </Routes>
    </div>
  );
}
export default App;
