import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Dashboard/Home";
import TravelerInquiries from "./components/Traveler_Profile/TravelerInquiry";

import AvailableTrains from "./components/Train_Availability/AvailableTrains";
import Header from "./components/Header/Header";
import Confirmation from "./components/Confirmation/Confirmation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AllReservations from "./components/AllReservations/AllReservations";
import { ReactNotifications } from "react-notifications-component";
import Schedule from "./components/Train_Schedule/TrainSchedule";
import UpdateSchedule from "./components/Train_Schedule/TrainScheduleUpdate";
import AllSchedules from "./components/All_Train_Schedules/AllTrainSchedules";
import BackOffice from "./components/BackOffice/BackOffice";

function App() {
  //   const isAgent = localStorage.getItem("isAgent") === "true";
  //   const isBackOffice = localStorage.getItem("isBackOffice") === "true";
  //   const isTraveler = localStorage.getItem("isTraveler") === "true";

  return (
    <BrowserRouter>
      <Header />

      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Login />} />

        {/* {isAgent && isTraveler && (
          <> */}
        <Route path="/home" element={<Home />} />
        <Route path="/travelers" element={<TravelerInquiries />} />
        <Route path="/availability" element={<AvailableTrains />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<AllReservations />} />

        {/* </>
        )} */}

        {/* {isBackOffice && (
          <> */}

        <Route path="/backoffice" exact element={<BackOffice />} />

        <Route path="/schedule" exact element={<Schedule />} />
        <Route path="/updateschedule" exact element={<UpdateSchedule />} />
        <Route path="/allschedules" exact element={<AllSchedules />} />
        {/* </>
        )} */}

        {/* {!isAgent && !isBackOffice && <Navigate to="/login" />} */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
