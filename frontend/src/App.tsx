import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="font-serif">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/dashboard" element={<Home component={Dashboard} />} />
          <Route path="/contact" element={<Home component={Contact} />} />
          <Route path="/about" element={<Home component={About} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
