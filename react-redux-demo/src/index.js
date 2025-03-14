import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import `createRoot` from `react-dom/client`
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// ✅ Get the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Use `createRoot` to render the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
