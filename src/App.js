import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  const isAgent = localStorage.getItem("isAgent_current");
  const isBackOffice = localStorage.getItem("isBackOffice_current");

  return (
    <BrowserRouter>
      <Header />

      <ReactNotifications />
      <Routes>
        <Route path="/" exact element={<Login />} />

        {/* Agent or Traveler */}
        <Route
          path="/home"
          exact
          element={
            isAgent === "true" || isBackOffice === "true" ? <Home /> : <Login />
          }
        />
        <Route
          path="/travelers"
          exact
          element={
            isAgent === "true" || isBackOffice === "true" ? (
              <TravelerInquiries />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/availability"
          exact
          element={isAgent === "true" ? <AvailableTrains /> : <Login />}
        />
        <Route
          path="/confirmation"
          exact
          element={isAgent === "true" ? <Confirmation /> : <Login />}
        />
        <Route
          path="/reservation"
          exact
          element={isAgent === "true" ? <AllReservations /> : <Login />}
        />
        <Route path="/register" exact element={<Register />} />

        {/* BackOffice */}
        <Route
          path="/backoffice"
          exact
          Component={isBackOffice ? BackOffice : Login}
        />
        <Route
          path="/schedule"
          exact
          Component={isBackOffice ? Schedule : Login}
        />
        <Route
          path="/updateschedule"
          exact
          Component={isBackOffice ? UpdateSchedule : Login}
        />
        <Route
          path="/allschedules"
          exact
          Component={isBackOffice ? AllSchedules : Login}
        />

        {/* {!isAgent && !isBackOffice && <Navigate to="/login" />} */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
