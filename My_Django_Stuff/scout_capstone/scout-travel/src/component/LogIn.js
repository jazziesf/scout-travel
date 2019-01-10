import React, { Component } from 'react';
import './NewPinForm.css'
// import PropTypes from 'prop-types';
import axios from 'axios'

// import './NewPinForm.css'
const URL = 'http://127.0.0.1:8000/user/'

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  resetState = () => {
    this.setState({
      username: '',
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

  addUser = (newUser) => {
      const apiPayload = {
        ...newUser,
        username: newUser.username,
        password: newUser.password,
      }
      axios.post(URL, apiPayload)
        .then((response) => {
          console.log(response);
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
    const { username, password } = this.state;

    if ( username === '' || password === '' ) return;

    this.addUser(this.state);
    this.resetState();
  }

  render() {
    return (
      <div className="form-div">
        <form onSubmit={this.onSubmit} name="new-user-form" id="new-user-form" className="new-user-form">
          <div class="form-group">
            <label htmlFor="usr">Username</label>
            <input type="text" className="form-control" id="usr" name="username" placeholder="BlackNGreen" onChange={this.onFormChange} value={this.state.username} />
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={this.onFormChange} value={this.state.password}/>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    );
  }


}

LogIn.propTypes = {
  //must add is requred to this form for prop just od it when your ready
};

export default LogIn;
