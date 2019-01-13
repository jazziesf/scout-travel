import React, { Component } from 'react';
import './NewUserLogin.css'
import PropTypes from 'prop-types';
import axios from 'axios'

const URL = "http://127.0.0.1:8000/api/user/token/"

class ReturningUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      token:''
    };
  }

  resetState = () => {
    this.setState({
      password: '',
    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  getUserName = (token) => {
    const url = "http://127.0.0.1:8000/api/user/me/"
    axios.get(url, token)
    .then((response) => {
      this.setState({
        name: response.name
      })
    })
    .catch((error) => {
      this.setState({
        errorMessage: `Failure ${error.message}`,
      })
    })
  }

  loginUser = (user) => {
    const apiPayload = {
      // name: newUser.name,
      password: user.password,
      email: user.email,
    }
    axios.post(URL, apiPayload)
    .then((response) => {
      this.setState({
        token: response.data.token
      })
      this.getUserName(this.state.token)
      // What should we do when we know the post request worked?
    })
    .catch((error) => {
      // What should we do when we know the post request failed?
      this.setState({
        errorMessage: `Failure ${error.message}`,
      })
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if ( email === '' || password === '' ) return;

    this.loginUser(this.state);
  }

  render() {
    return (
      <div className="form-div new-user">
      <h3 className='login'>Sc<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut"/>ut Ambassad<img src="https://image.flaticon.com/icons/svg/761/761952.svg" alt="donut icon" className="donut"/>r</h3>
        <form onSubmit={this.onSubmit} name="new-user-form" id="new-user-form" className="new-user-form">
          <div className="form-group">
            <label htmlFor="usr">Email</label>
            <input type="text" className="form-control"name="email" placeholder="nosh@gmail.com" onChange={this.onFormChange} value={this.state.email} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={this.onFormChange} value={this.state.password}/>
          </div>

          <button type="submit" className="btn btn-danger new-user-form--submit">Submit</button>
      </form>
      </div>
    );
  }


}

ReturningUser.propTypes = {
  token: PropTypes.string,
};

export default ReturningUser;
