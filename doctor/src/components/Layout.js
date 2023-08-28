import React from 'react';
import '../components/Layout.css';
import { adminMenue, userMenue } from '../Data/data';
import { Link, useLocation} from 'react-router-dom'; // Import Outlet for nested routes
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
//import HomePage from '../pages/Home';


function Layout({children}) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // Check if user is available and has the isAdmin property defined
  const isAdminUser = user && user.isAdmin;

  // Determine the appropriate sidebar menu based on the user's role
  const sidebarMenu = isAdminUser ? adminMenue : userMenue;

  const handleLogout = () => {
    localStorage.clear();
    message.success('User Logout Successfully!');
  };

  return (
    <>
      <div className='main'>
        <div className='Layout'>
          <div className='sidebar'>
            <div className='logo'>
              <h6>DOC APP</h6>
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
              <div className='header-content'>
                  <Badge count={user && user.notifcation}>
                   <i className='fa-solid fa-bell'></i>
                  </Badge>
                
                <Link to='/profile'>{user?.name}</Link>
              </div>
            </div>
            <div className='body'>
              {/* Use Outlet to render nested routes */}
               {children}  
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
