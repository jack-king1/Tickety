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
            <Route path="/productpage" element={<ProductPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
