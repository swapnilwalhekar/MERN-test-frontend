import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainHome from "./components/MainHome";
import SignUp from "./SignUp";
import PrivateComp from "./components/PrivateComp";
import SignIn from "./SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<MainHome />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
