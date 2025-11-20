import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import Register from "./pages/Register";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/:id" element={<Details/>}/>

          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
