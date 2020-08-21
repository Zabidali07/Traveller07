import React from "react";
import Routes from "./routes/Routes";
import axios from "axios";
import { getCookie, signout } from "./utils/helper";
import { Provider } from "react-redux";
import store from "./store/index";
import "./App.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

axios.interceptors.request.use((config) => {
  const token = getCookie("token");
  config.headers.Authorization = token;

  return config;
});

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    signout(() => {
      window.location.href = "/";
    });
  }

  return Promise.reject(error);
});

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
