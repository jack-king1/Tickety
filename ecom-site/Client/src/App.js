import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import ProductPage from "./Components/ProductPage";
import Login from "./Auth/Login";
import Cart from "./Components/Cart";
import Success from "./Components/Success";
import Error from "./Components/Error";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/*<Route path="/productpage" element={<ProductPage />} /> */}
            <Route path="/productpage/:productID" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/success" element={<Success />} />
            <Route path="/order/error" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
