import productDetails from "../utils/DataArray";
import {useState} from "react";

export default function Header() {

  

  return (
    <div className="header">
      <img
        className="logo"
        src="https://www.vhv.rs/dpng/d/413-4134507_myntra-logo-transparent-png-myntra-online-shopping-app.png"
      />
      <div className="section">
        <button>Men</button>
        <button>Women</button>
        <button>kids</button>
        <button>Fasion</button>
        <button>Home&Living</button>
        <button>Bueaty</button>
        <button>Studio</button>
        
      </div>
      <input placeholder="Search a product or service"></input>
      <div className="Profile">
        <button>Profile</button>
        <button>Wishlist</button>
        <button>Cart</button>
      </div>
    </div>
  );
}