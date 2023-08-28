import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css"; // Assuming this is an Ant Design CSS reset
import "./index.css"; // Your custom CSS
import App from "./App"; // Importing your main application component
import { Provider } from "react-redux"; // Importing the Redux Provider
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>       
  </Provider>
);