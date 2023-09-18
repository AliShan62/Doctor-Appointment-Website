import React, { useState } from "react";
import "./Register.css";
import { Link,useNavigate } from "react-router-dom"; // Import BrowserRouter once
import {  message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false, // Add isAdmin and isDoctor fields
    isDoctor: false,
    notification: [], // Add notification and seennotification fields
    seennotification: [],
    checked: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
      
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:7000/api/v1/user/register",formData );
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully User!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="form-container ">
      <div className="box">
      <form className="Registerform animated-border-container" onSubmit={handleSubmit}>
        
        <div>
          <h1 style={{ textAlign: "center ", marginBottom: "30px", color:"white" }}>
            Register Form
          </h1>
        </div>

        <div className="mb-3 pb-3">
          <label htmlFor="name" className="form-label" style={{ color:"white" }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div className="mb-3 pb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ color:"white" }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
          />
          <div id="emailHelp" className="form-text" style={{ color:"white" }}>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3 pb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" style={{ color:"white" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-3 pb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checked"
            checked={formData.checked}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                checked: e.target.checked,
              }))
            }
          />
          <label className="form-check-label" htmlFor="checked" style={{ color:"white" }}>
            Check me out
          </label>
        </div>
        <div className="button-text">
          <button type="submit" className="btn btn-primary" style={{ color:"white" }}>
            Register
          </button>
          <Link to="/Login">
            <h6 className="mt-3" style={{ marginLeft: "50px",color:"blue" }}>
              Already User Login Here
            </h6>
          </Link>
        </div>
       
       </form>
      </div>
    </div>
  );
}

export default Register;
