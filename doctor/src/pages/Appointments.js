import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';


function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        console.error("API request failed:", res.data.message);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {moment(record.date).format('MM-DD-YY')} &nbsp;
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  return (
    <Layout >
      <h1 className='text-center p-3' style={{ fontFamily: "sans-serif", color: 'blue',  }}>Appointments Page</h1>
      <div className="table-container">
        <Table columns={columns} dataSource={appointments} pagination={{ pageSize: 8 }} />
      </div>
    </Layout>
  );
}

export default Appointments;
