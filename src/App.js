import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Dashboard/Home";
import TravelerInquiries from "./components/Traveler_Inquiry/TravelerInquiry";
import AvailableTrains from "./components/Train_Availability/AvailableTrains";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/travelers" element={<TravelerInquiries />} />
        <Route path="/availability" element={<AvailableTrains />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
