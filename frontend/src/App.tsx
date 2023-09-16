import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RoomsList from "./pages/RoomsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <div className="font-primary">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home component={RoomsList}/>} />
          <Route path="/contact" element={<Home component={Contact}/>} />
          <Route path="/about" element={<Home component={About}/>}/>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
