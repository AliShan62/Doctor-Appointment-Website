import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row, Pagination } from "antd";
import DoctorList from "../components/DoctorList";
import "./Home.css"; // Import the CSS file

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const doctorsPerPage = 3; // Number of doctors to display per page

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Calculate the index of the first and last doctor to display on the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="center-content">
        <h1 className="text-center pt-3">Welcome to Home Portal</h1>
        <Row>
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p>No doctors available.</p>
          )}
        </Row>
        <Pagination
          className="pagination" style={{"marginLeft":"500px"}} // Add a class for Pagination styles
          current={currentPage}
          pageSize={doctorsPerPage}
          total={doctors.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
