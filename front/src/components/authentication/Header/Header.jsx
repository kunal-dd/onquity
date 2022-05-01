import React from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/images";

const Header = () => {
  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 ps-xl-4">
              <nav className="navbar px-xl-5">
                <Link className="navbar-brand" to="/">
                  <img src={images.OnquityLogo} alt="logo" className="header-logo" />
                </Link>
              </nav>
            </div>
            <div className="col-7 bg-dark"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
