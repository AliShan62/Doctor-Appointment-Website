import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { message, Table, Pagination } from 'antd';

function User() {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Display 8 items per page

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1/admin/getUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setUsersList(response.data.data);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error(error);
      message.error("Facing Error In Getting the Users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Function to handle notification received
  const handleNotificationReceived = () => {
    // Reload the page to show the new notification
    window.location.reload();
  };

  // Simulate receiving a notification
  const simulateNotificationReceived = () => {
    // You can call this function when a new notification is received
    handleNotificationReceived();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className='d-flex'>
          <button className='btn btn-danger' onClick={simulateNotificationReceived}>
            Block
          </button>
        </div>
      ),
    },
  ];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <h1 className='text-center p-3' style={{ fontFamily: "sans-serif", color: 'blue',  }}>All Users Portal</h1>
      <Table
        className='text-center m-2'
        
        columns={columns}
        dataSource={usersList.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false} // Disable default pagination
      />
      <Pagination
        className='text-center m-2'
        pageSize={pageSize}
        total={usersList.length}
        current={currentPage}
        onChange={handleChangePage}
      />
    </Layout>
  );
}

export default User;
