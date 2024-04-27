import "./styles/index.css";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Header from "./Header";
import prod_ins from "./components/prod_ins";
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
      </Routes>
    </div>
  );
}

export default App;
