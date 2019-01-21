import React from 'react';
import './Navbar.css'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const NavbarGuest = (props) => {

return (
  <div className="nav-body">
    <nav className="navbar navbar-default fixed-top navbar-expand-md navbar-light bg-light">
      <Link className="navbar-brand" to="/splash" onClick={props.viewBoard}>N<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut-nav"/>sher</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={props.hamburgerMenu} >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={props.collapseNavbar} id="navbarSupportedContent" >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <p className="nav-link guest" onClick={props.closeNav}>{props.login}</p>
            </li>
            <li className="nav-item active">
              <p className="nav-link guest" onClick={props.closeNav}>{props.signUp}</p>
            </li>
          </ul>
        </div>
      </nav>
  </div>
  )
}

NavbarGuest.propTypes = {
  dropdown: PropTypes.func,
  hamburgerMenu: PropTypes.func,
  collapseNavbar: PropTypes.string,
}

export default NavbarGuest;
