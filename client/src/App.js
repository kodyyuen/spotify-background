import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GradientBackground from "./background/gradient-background";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Callback from "./login/callback";
import appReducer from "./spotify/app-reducer";

const store = configureStore({
  reducer: {
    app: appReducer
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/currently-playing" element={<GradientBackground />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
