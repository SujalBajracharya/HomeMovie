import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginCheck from "./components/LoginCheck";
import LoginCheck2 from "./components/LoginCheck2";
import Cart from "./components/Cart";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/" element={<LoginCheck />}>
              <Route path=":id" element={<Details />}></Route>
              <Route path="cart" element={<Cart />}></Route>
            </Route>
            <Route path="/" element={<LoginCheck2 />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
