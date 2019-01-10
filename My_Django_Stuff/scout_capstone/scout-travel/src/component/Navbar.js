import React from 'react';
import './Navbar.css'
import PropTypes from 'prop-types';

const Navbar = (props) => {

return (
  <div className="nav-body">
    <nav className="navbar navbar-default fixed-top navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="scout">Scout</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={props.hamburgerMenu} >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={props.collapseNavbar} id="navbarSupportedContent" >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <p className="nav-link" href="scout">Home <span className="sr-only">(current)</span></p>
            </li>
            <li className="nav-item">
              <p className="nav-link" href="log-In">{props.login}</p>
            </li>
            <li className={props.dropdownClassName} >
              <p className="nav-link dropdown-toggle" href="scout" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={props.expandDropdown} onClick={props.dropdown}>
                Dropdown
              </p>
              <div className={props.dropdownShow} aria-labelledby="navbarDropdown">
                <p className="dropdown-item">{props.myScoutList}</p>
                <p className="dropdown-item">{props.linkAddPin}</p>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" id="local" href="https://www.thestranger.com/events/food" target="_blank" rel='noreferrer noopener' >Local Food & Drink Events</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-danger my-2 my-sm-0 search" type="submit">Search</button>
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
  // linkAddPin: PropTypes.link,
  // searchBar: PropTypes.object,
  // customers: PropTypes.object,
  // errors: PropTypes.string,
  // search: PropTypes.object,
}

export default Navbar;
