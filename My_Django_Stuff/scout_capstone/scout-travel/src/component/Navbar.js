import React from 'react';
import './Navbar.css'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Navbar = (props) => {

  let userName = window.localStorage.getItem('name')

  if (userName != null) {
     userName = userName.charAt(0).toUpperCase() + userName.slice(1)
  } else {
    userName = 'Nosher'
  }

return (
  <div className="nav-body">
    <nav className="navbar navbar-default fixed-top navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/nosher" onClick={props.viewBoard}>N<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut-nav"/>sher</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={props.hamburgerMenu} >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={props.collapseNavbar} id="navbarSupportedContent" >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link className="nav-link pins" to="/nosher" onClick={props.viewBoard}>All Pins</Link>
            </li>
            <li className={props.dropdownClassName} >
              <p className="nav-link dropdown-toggle" href="/nosher" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={props.expandDropdown} onClick={props.dropdown}>
                {userName} Nosher Profile
              </p>
              <div className={props.dropdownShow} aria-labelledby="navbarDropdown">
                <p className="dropdown-item" onClick={props.closeNav}>{props.logout}</p>
                <p className="dropdown-item" onClick={props.closeNav}>{userName} {props.myScoutList}</p>
                <p className="dropdown-item" onClick={props.closeNav}>{props.linkAddPin}</p>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" id="local" href="https://www.thestranger.com/events/food" target="_blank" rel='noreferrer noopener' onClick={props.closeNav}>Local Food & Drink Events</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 searchInput">
            <input className="form-control mr-sm-2" name="query" type="search" placeholder="Search by City" aria-label="Search" value={props.searchQueryValue} onChange={props.searchQueryonChange}/>
            <button className="btn btn-outline-danger text-white my-2 my-sm-0 search" onClick={props.searchQuery} type="submit">{props.searchLink}</button>
          </form>
        </div>
      </nav>
  </div>
  )
}

Navbar.propTypes = {
  dropdown: PropTypes.func,
  hamburgerMenu: PropTypes.func,
  collapseNavbar: PropTypes.string,
  dropdownClassName: PropTypes.string,
  dropdownShow: PropTypes.string,
  expandDropdown: PropTypes.string,
  closeNav: PropTypes.func,
  searchQuery: PropTypes.func,
  searchQueryonChange: PropTypes.func,
  searchQueryValue: PropTypes.string
}

export default Navbar;
