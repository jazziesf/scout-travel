import React, { Component } from 'react';
import './NewUserLogin.css'
import PropTypes from 'prop-types';
import axios from 'axios'

// import './NewPinForm.css'
const URL = 'http://127.0.0.1:8000/api/user/create/'

class NewUserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      token:'',
      value:'',
      email: '',
      password: '',
    };
  }

  // resetState = () => {
  //   this.setState({
  //     password: '',
  //   });
  // }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  getToken = (newUser) => {
    const apiPayload = {
      password: newUser.password,
      email: newUser.email,
    }
    const url = "http://127.0.0.1:8000/api/user/token/"
    axios.post(url, apiPayload)
      .then((response) => {

        this.setState({
          token: response.data.token
        })
        document.cookie = `${response.data.token}`;

        this.props.loggedInCallback(response.data.token)
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        this.setState({
          errorMessage: `Failure ${error.message}`,
        })
      })
    }

  addNewUser = (newUser) => {
      const apiPayload = {
        name: newUser.name,
        password: newUser.password,
        email: newUser.email,
      }

      this.setState({
        name: newUser.name
      })

      axios.post(URL, apiPayload)
        .then((response) => {
          this.getToken(newUser)
          window.localStorage.setItem('id', response.data.id)
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
    const { name, password, username } = this.state;

    if ( name === '' || password === '' || username === '' ) return;

    this.addNewUser(this.state);

    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <div className="form-div new-user">

      <h3 className='login'>N<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut"/>sher Sign-In</h3>
      <p className="login-p"> This is just the beginning to discovering great eats!</p>
        <form onSubmit={this.onSubmit} name="new-user-form" id="new-user-form" className="new-user-form">
          <div className="form-group">
            <label htmlFor="usr">Email</label>
            <input type="text" required className="form-control" name="email" placeholder="nosh@gmail.com" onChange={this.onFormChange} value={this.state.email}/>
          </div>

          <div className="form-group">
            <label htmlFor="usr">Username</label>
            <input type="text" className="form-control" name="name" placeholder="BlackNGreen" onChange={this.onFormChange} value={this.state.name} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" required className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={this.onFormChange} value={this.state.password}/>
          </div>

          <button type="submit" className="btn btn-danger new-user-form--submit">Submit</button>

      </form>
      </div>
    );
  }

}

NewUserLogin.propTypes = {
  loggedInCallback: PropTypes.func,
  //must add is requred to this form for prop just od it when your ready
};

export default NewUserLogin;
