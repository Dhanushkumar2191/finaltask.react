import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ShowroomProvider } from "./context/ShowroomContext";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ShowroomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShowroomProvider>
  </Provider>
);