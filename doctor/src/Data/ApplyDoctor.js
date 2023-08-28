// import React from 'react';
// import Layout from '../components/Layout';
// import { Input, Form, Row, Col, TimePicker } from 'antd'; // Import Form, Row, Col from antd
// import FormItem from 'antd/es/form/FormItem';

// function ApplyDoctor() {
//   const onFinish =(values) => {
//     console.log(values);
//   };

//   return (
//     <Layout>
//       <h1 className='text-center p-3 ' id='doctor'>Apply Doctor</h1>
//       <Form layout='vertical' onFinish={onFinish} className='m-3'> {/* It should be 'layout' instead of 'Layout' */}
//          <h4 className='mb-3'>Personal Information :</h4>
//         <Row gutter={20}>
         
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='First Name' name='firstName' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your First Name' />
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Last Name' name='lastName' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Last Name' />
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Phone Number' name='phone' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Phone Number' />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Email Address' name='email' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Email Address' />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Website' name='website'> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Website Name' />
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Address' name='address' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Current' />
//             </Form.Item>
//           </Col>
//         </Row>

//         <h4 className='mt-3 mb-4'>Professional Record :</h4>
//         <Row gutter={20}>
         
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Sepecialization' name='sepecializatio' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Sepecialization Field' />
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Experience' name='experience' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your Experience' />
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='FeePerConsultation' name='feePerConsultation' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//               <Input type='text' placeholder='Enter Your FeePerConsultation' />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label='Timings' name='timing' required rules={{ required: true }}> {/* It should be 'Form.Item' */}
//                  <TimePicker.RangePicker/>
//             </Form.Item>
//           </Col>

         
        
//         </Row>
//           <div className='d-flex justify-content-end '>
//             <button className='btn btn-primary' type='submit'>Submit</button>
//           </div>
         
//       </Form>
//     </Layout>
//   );
// }

// export default ApplyDoctor;


import React from 'react';
import Layout from '../components/Layout';
import { Input, Form, Row, Col, TimePicker, message } from 'antd';
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 import axios from 'axios'
function ApplyDoctor() {
     const {user} =useSelector(state=>state.user)
          const dispatch=useDispatch()
          const navigate= useNavigate()

 const onFinish = async (values) => {
  console.log(values);
  try {
    dispatch(showLoading());
    const res = await axios.post('http://localhost:7000/api/v1/user/apply-doctor', { ...values, userId: user._id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Remove the '+' sign
      }
    });

    dispatch(hideLoading());

    if (res && res.data && res.data.success) {
      message.success(res.data.success);
      navigate('/');
    } else if (res && res.data && res.data.error) {
      console.error(res.data.error);
    } else {
      console.error('Unexpected response:', res);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.error(error);
    message.error('Something Went Wrong!');
  }
};


  return (
    <Layout>
      <h1 className='text-center p-3 ' id='doctor'>Apply Doctor</h1>
      <Form layout='vertical' onFinish={onFinish} className='m-3'>
        <h4 className='mb-3'>Personal Information :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='First Name' name='firstName' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your First Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Last Name' name='lastName' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Last Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Phone Number' name='phone' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Phone Number' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Email Address' name='email' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Email Address' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Website' name='website'>
              <Input type='text' placeholder='Enter Your Website Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Address' name='address' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Current' />
            </Form.Item>
          </Col>
        </Row>

        <h4 className='mt-3 mb-4'>Professional Record :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Specialization' name='specialization' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Specialization Field' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Experience' name='experience' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your Experience' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='FeePerConsultation' name='feePerConsultation' required rules={{ required: true }}>
              <Input type='text' placeholder='Enter Your FeePerConsultation' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Timings' name='timing' >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <div className='d-flex justify-content-end '>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
