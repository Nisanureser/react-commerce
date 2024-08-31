import React, { useState } from "react";
import "../css/Header.css";
import "../App.css";
import { SlBasket } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";
import { setStarDrawer } from "../redux/slices/starSlice";

function Header() {
  const [theme, SetTheme] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);
  const changeTheme = () => {
    const root = document.getElementById("root");
    SetTheme(!theme);
    if (!theme) {
      root.style.backgroundColor = "black";
      root.style.color = "white";
    } else {
      root.style.backgroundColor = "white";
      root.style.color = "black";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="flex-row" onClick={() => navigate("/")}>
        <img className="logo" src="./src/images/logo-gs.png" alt="" />
        <p className="logo-text">GALATASARAY STORE </p>
      </div>
      <div className="flex-row">
        <input type="text" className="search-input" placeholder="ARA" />
        <div>
          {theme ? (
            <FaMoon className="icon" onClick={changeTheme} />
          ) : (
            <MdLightMode className="icon" onClick={changeTheme} />
          )}
          <FaStar onClick={() => dispatch(setStarDrawer())} className="icon" />
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={products.length}
            color="error"
            style={{ marginTop: "-10px" }}
          >
            <SlBasket className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
