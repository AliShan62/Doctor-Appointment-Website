import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter once
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"; // Make sure the path is correct
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from "./Data/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/Admin/Doctors";
import User from "./pages/Admin/User";
import Profile from "./pages/doctor.js/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "../src/pages/doctor.js/DoctorAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
    
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <User/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <NotificationPage/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/doctor"
            element={
              <ProtectedRoute>
                <Doctors/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
           <Route
            path="doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments/>
              </ProtectedRoute>
            }
          />
          <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          
            </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
