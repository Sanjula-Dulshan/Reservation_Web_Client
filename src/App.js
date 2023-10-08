import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Dashboard/Home";
import TravelerInquiries from "./components/Traveler_Inquiry/TravelerInquiry";
import AvailableTrains from "./components/Train_Availability/AvailableTrains";
import Header from "./components/Header/Header";
import Confirmation from "./components/Confirmation/Confirmation";
import Register from "./components/Register/Register";
import { ReactNotifications } from "react-notifications-component";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ReactNotifications />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/travelers" element={<TravelerInquiries />} />
        <Route path="/availability" element={<AvailableTrains />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
