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
import Footer from "./Components/Footer";
import "./CSS/App.css";
import Build from "./Components/Build";

function App() {
  const [activeCartCount, setActiveCartCount] = useState(0);

  //Called once at start of page load
  useEffect(() => {
    UpdateItemCart();
  }, []);

  const UpdateItemCart = () => {
    console.log("Updating cart number!");
    let items = JSON.parse(localStorage.getItem("cart"));
    let qty = GetCartTotalQty(items);
    setActiveCartCount(qty);

    console.log("cart items:", items);
  };

  const GetCartTotalQty = (items) => {
    if (items != null) {
      if (items.length > 0) {
        let cartTotal = 0;

        for (let i = 0; i < items.length; i++) {
          cartTotal += items[i].quantity;
          if (cartTotal >= 9) {
            cartTotal = 9;
            break;
          }
        }
        console.log("Cart Total:", cartTotal);
        return cartTotal;
      } else {
        return 0;
      }
    }
  };

  return (
    <div id="body" className="">
      <BrowserRouter>
        <div>
          <Navbar cartCount={activeCartCount} />
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route path="/products/:footerSearch" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/*<Route path="/productpage" element={<ProductPage />} /> */}
            <Route
              path="/productpage/:productID"
              element={<ProductPage updateCartIcon={UpdateItemCart} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={<Cart updateCartIcon={UpdateItemCart} />}
            />
            <Route path="/order/success" element={<Success />} />
            <Route path="/error" element={<Error />} />
            <Route path="/build" element={<Build />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
