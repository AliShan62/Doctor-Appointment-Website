import { configureStore } from "@reduxjs/toolkit"; // Corrected import path
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
     user:userSlice.reducer
  },
});
