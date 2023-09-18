import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { message, Table, Pagination } from 'antd';

function Doctors() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Display 7 items per page

  const getDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1/admin/getDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setDoctorsList(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
      message.error("Error In Getting Records Of Doctors");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

   const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("You have been Approved Successfully!",res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text, record) => (
        <span>{record.phone}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === "pending" ? (
            <button className='btn btn-success' onClick={() =>handleAccountStatus(record, 'approved')}>
              Approve
            </button>
          ) : (
            <button className='btn btn-danger'>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <h1 className='text-center p-1 p-3  'style={{ fontFamily: "sans-serif", color: 'blue',  }}>
        All  Doctors Portal
        </h1>
      <Table 
        className='text-center m-2 '
        columns={columns}
        dataSource={doctorsList.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false} // Disable default pagination
      />
      <Pagination
        className='text-center'
        pageSize={pageSize}
        total={doctorsList.length}
        current={currentPage}
        onChange={handleChangePage}
      />
    </Layout>
  );
}

export default Doctors;
