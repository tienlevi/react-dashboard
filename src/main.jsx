import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
