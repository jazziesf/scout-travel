import React from 'react';
import './Navbar.css'
import PropTypes from 'prop-types';

const Navbar = (props) => {

return (
  <div className="nav-body">
    <nav className="navbar navbar-default fixed-top navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="scout">Sc<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut-nav"/>ut</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={props.hamburgerMenu} >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={props.collapseNavbar} id="navbarSupportedContent" >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" id="home" href="scout">Home</a>
            </li>
            <li className={props.dropdownClassName} >
              <p className="nav-link dropdown-toggle" href="scout" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={props.expandDropdown} onClick={props.dropdown}>
                {props.scoutAmbassador}
              </p>
              <div className={props.dropdownShow} aria-labelledby="navbarDropdown">
                <p className="dropdown-item" onClick={props.closeNav}>{props.login}</p>
                <p className="dropdown-item" onClick={props.closeNav}>{props.myScoutList}</p>
                <p className="dropdown-item" onClick={props.closeNav}>{props.linkAddPin}</p>
                <p className="dropdown-item" onClick={props.closeNav}>{props.signUp}</p>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" id="local" href="https://www.thestranger.com/events/food" target="_blank" rel='noreferrer noopener' onClick={props.closeNav}>Local Food & Drink Events</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 searchInput">
            <input className="form-control mr-sm-2" name="query" type="search" placeholder="Search" aria-label="Search" value={props.searchQueryValue} onChange={props.searchQueryonChange}/>
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
  // linkAddPin: PropTypes.link,
  // searchBar: PropTypes.object,
  // customers: PropTypes.object,
  // errors: PropTypes.string,
  // search: PropTypes.object,
}

export default Navbar;
