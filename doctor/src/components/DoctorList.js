import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import the array of image URLs

function DoctorList({ doctor, index }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // You can navigate to the appointments route here
    navigate(`/doctor/book-appointment/${doctor._id}`);
  };

  // Use the image URL from the array based on the index
  const imageUrl = 'https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'

  return (
    <div>
      <div className="card m-5 text-start" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleCardClick}>
        <img className="card-img-top" src={imageUrl} alt={`Avatar for Dr. ${doctor.firstName} ${doctor.lastName}`} />
        <div className="card-body">
          <h5 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h5>
          <p className="card-text">
            <p><b>Specialization</b>: {doctor.specialization}</p>
            <p><b>Experience</b>: {doctor.experience}</p>
            <p><b>Fee Per Consultation</b>: {doctor.feesPerCunsaltation}</p>
            <p><b>Timings</b>: {doctor.timings}</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
