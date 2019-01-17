import React, { Component } from 'react';
import './Splash.css'
import logo from "../images/splash.png"
// import PropTypes from 'prop-types';

class Splash extends Component {

  render() {
    return (
      <div >
        <img src={logo} alt="scout cover page" className="splash" />
      </div>


    )
  }
}

export default Splash;
