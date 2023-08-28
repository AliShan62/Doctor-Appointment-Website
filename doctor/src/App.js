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
