import "./styles/index.css";
import Login from "./components/login";
import Register from "./components/register";
import UserUpdate from "./components/userupdate";
import Home from "./components/home";
import Header from "./Header";
import prod_ins from "./components/prod_ins";
import Dashboard from "./components/dashboard";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/prod_ins" Component={prod_ins}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/userUpdate" Component={UserUpdate}/>
      </Routes>
    </div>
  );
}

export default App;
