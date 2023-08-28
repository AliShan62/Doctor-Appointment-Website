import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axios from 'axios';
export default function ProtectedRoute({ children }) {

  const dispatch =useDispatch();
  const { user } = useSelector(state =>state.user);

  const getUser = async () => {
      try {
           dispatch(showLoading());

           const res = await axios.post('http://localhost:7000/api/v1/user/getUserData',
          { token: localStorage.getItem('token') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        dispatch(hideLoading());
       if (res.data.success) {
           dispatch(setUser(res.data.data));
            }  else {
              <Navigate to="/login" />
              localStorage.clear()
        }

      } catch (error) {
       
         dispatch(hideLoading());
         localStorage.clear()
        console.log(error);
      }
 }


    useEffect(()=>{
      if(!user){
        getUser()
      }
    },[user])


  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }


}

// //import  { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import axios from 'axios';

// //import { showLoading, hideLoading } from "../redux/features/alertSlice";
// //import { useSelector, useDispatch } from "react-redux";
// //import { setUser } from "../redux/features/userSlice";

// function ProtectedRoute({ children }) {
//   //const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const { user } = useSelector(state =>state.user);

//   // useEffect(() => {
//   //   const getUser = async () => {
//   //     try {
//   //       dispatch(showLoading());
//   //       const res = await axios.post(
//   //         'http://localhost:7000/api/v1/user/getUserData',
//   //         { token: localStorage.getItem('token') },
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem('token')}`
//   //           }
//   //         }
//   //       );

//   //       dispatch(hideLoading());

//   //       if (res.data.success) {
//   //         dispatch(setUser(res.data.data));
//   //       } else {
//   //         navigate("/login");
//   //       }
//   //     } catch (error) {
//   //       dispatch(hideLoading());
//   //       console.log(error);
//   //     }
//   //   };

//   //   if (!user) {
//   //     getUser();
//   //   }
//   // }, [user, dispatch, navigate]);

//   if (localStorage.getItem("token")) {
//     return children;
//   } else {
//     navigate("/login");
//     return null;
//   }
// }

// export default ProtectedRoute;
