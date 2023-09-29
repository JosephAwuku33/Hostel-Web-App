import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import RoomsList from "./pages/Home/RoomsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SubmitPayment from "./pages/Home/SubmitPayment";


function App() {
  return (
    <div className="font-primary">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home component={RoomsList}/>} />
          <Route path="/contact" element={<Home component={Contact}/>} />
          <Route path="/about" element={<Home component={About}/>}/>
          <Route path="/submit_payment" element={<Home component={SubmitPayment} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
