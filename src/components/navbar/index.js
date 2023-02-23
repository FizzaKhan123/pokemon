import React from "react";
import "./index.css";
// import Logo from "../../assets/images/pokemon-logo-image-black.jfif";
import Logo from "../../assets/images/black-logo3d.jpg";
const index = () => {
  return (
    <div className="navbar-outer-div">
      <img className="navbar-log-image" src={Logo} />
      <h1 style={{ color: "white", display: "flex", alignItems: "center" }}>
        Best
      </h1>
    </div>
  );
};

export default index;
