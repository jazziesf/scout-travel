import React, { Component } from 'react';
import './Splash.css'
// import PropTypes from 'prop-types';

class Splash extends Component {

  render() {
    return (
      <div id='background'>
        <div className="children">{this.props.children}</div>
      </div>

    )
  }
}

export default Splash;
