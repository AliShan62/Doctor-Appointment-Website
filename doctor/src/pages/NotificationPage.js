import React, { useState } from 'react'; // Import useState hook
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function NotificationPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define state variables for unread and read notifications
  const [unreadNotifications, setUnreadNotifications] = useState(user?.notifcation || []);
  const [readNotifications, setReadNotifications] = useState(user?.seennotification || []);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:7000/api/v1/user/get-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        // Move notifications from unread to read
        setReadNotifications([...readNotifications, ...unreadNotifications]);
        setUnreadNotifications([]); // Clear unread notifications

        message.success("Read All the Notifications");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error In Reading the Notifications");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:7000/api/v1/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Delete All the Notifications");
        window.location.reload();
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error in Delete The Notifications");
    }
  };

  return (
    <Layout>
      <h1 className="p-3 text-center" style={{ fontFamily: "sans-serif", color: 'blue' }}>Notification Page</h1>

      <Tabs style={{ fontFamily: "sans-serif" }}>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end" style={{ cursor: 'pointer' }}>
            <h4 className="p-2 text-primary" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {unreadNotifications.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }} key={notificationMgs._id}>
              <div
                className="card-text" style={{ cursor: "pointer" }}
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {readNotifications.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }} key={notificationMgs._id}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default NotificationPage;
