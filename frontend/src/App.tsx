import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import FrontDeskPage from "./pages/FrontDesk/FrontDeskPage";
import GuestPage from "./pages/Guest/Guest";
import RoomsPage from "./pages/Rooms/RoomsPage";
import DealPage from "./pages/Deal/Deal";
import RatePage from "./pages/Rate/RatePage";


function App() {
 
  return (
    <div className="font-primary">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/dashboard" element={<Home component={Dashboard} />} />
          <Route
            path="/front-desk"
            element={<Home component={FrontDeskPage} />}
          />
          <Route path="/guest" element={<Home component={GuestPage} />} />
          <Route path="/rooms" element={<Home component={RoomsPage} />} />
          <Route path="/deal" element={<Home component={DealPage} />} />
          <Route path="/rate" element={<Home component={RatePage} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
