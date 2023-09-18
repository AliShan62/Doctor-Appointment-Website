import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import "./Login.css";
function Login() {
  const navigate = useNavigate();
 const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checked: false,
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form Data:", formData);

    try {
      dispatch(showLoading())

      const res = await axios.post(
        "http://localhost:7000/api/v1/user/login",
        formData
      );
        window.location.reload()
      dispatch(hideLoading())

      if (res.data.success) {
        localStorage.setItem("token", res.data.token); // Store the token in localStorage
        console.log(res.data.token);
        message.success("Login User Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="form-container  ">
      <div className="box">
          <form className="Registerform animated-border-container" onSubmit={handleSubmit}>
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "30px" ,color:"white"}}>
            Login Form
          </h1>
        </div>

        <div className="mb-3 pb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ color:"white"}}>
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
          <div id="emailHelp" className="form-text" style={{ color:"white"}}>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3 pb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" style={{ color:"white"}}>
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
          <label className="form-check-label" htmlFor="checked" style={{ color:"white"}}>
            Check me out
          </label>
        </div>
        <div className="button-text">
          <button type="submit" className="btn btn-primary" style={{ color:"white"}}>
            Login
          </button>
          <Link to="/register">
            <h6 className="mt-3" style={{ marginLeft: "50px",color:"blue" }} >
              Not a User? Register Here
            </h6>
          </Link>
        </div>
      </form>
      </div>
    
    </div>
  );
}

export default Login;
