import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            WillClaim
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add Will
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/AddPayee"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add Payee
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Deceased"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Deceased
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ClaimWill "
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Claim Will 
              </NavLink>
              
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;