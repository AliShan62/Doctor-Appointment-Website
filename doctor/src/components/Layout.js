import React from 'react';
import '../components/Layout.css';
import { adminMenue, userMenue } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Check if the user is available and has the isAdmin property defined
  const isAdminUser = user && user.isAdmin;

  // Determine the appropriate sidebar menu based on the user's role
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointment',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
  ];

  const sidebarMenu = isAdminUser
    ? adminMenue
    : user?.isDoctor
    ? doctorMenu
    : userMenue;

  const handleLogout = () => {
    localStorage.clear();
    message.success('User Logout Successfully!');
  };

  return (
    <>
      <div className='main' style={{ fontFamily: 'sans-serif' }}>
        <div className='Layout'>
          <div className='sidebar'>
            <div className='logo'>
              <h6>DoctorAppointment</h6>
              <hr />
            </div>
            <div className='menu'>
              {sidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;

                return (
                  <div
                    key={index}
                    className={`menu-items ${isActive ? 'active' : ''}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className='menu-items' onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <Link to='/login'>Logout</Link>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              <div
                className='header-content'
                style={{ cursor: 'pointer' }}
              >
                <Badge
                  count={
                    user && user.notification ? user.notification.length : 0
                  }
                  onClick={() => {
                    navigate('/notification');
                  }}
                >
                  <i className='fa-solid fa-bell'></i>
                </Badge>
                <Link to='/profile'>{user?.name}</Link>
              </div>
            </div>
            <div className='body'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
