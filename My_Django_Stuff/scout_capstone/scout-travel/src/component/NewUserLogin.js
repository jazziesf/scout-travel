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
      value:''
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
        const authToken = response.data.token

        this.setState({
          token: authToken
        })
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        this.setState({
          errorMessage: `Failure ${error.message}`,
        })
      })
    }

  // getUserName = (token) => {
  //   const url = "http://127.0.0.1:8000/api/user/me/"
  //   axios.get(url, token)
  //     .then((response) => {
  //       this.setState({
  //         name: response.name
  //       })
  //     })
  //     .catch((error) => {
  //       // What should we do when we know the post request failed?
  //       this.setState({
  //         errorMessage: `Failure ${error.message}`,
  //       })
  //     })
  // }

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
    const { name } = this.state;

    if ( name === '' ) return;

    this.addNewUser(this.state);

    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <div className="form-div new-user">

      <h3 className='login'>New Sc<img src="https://image.flaticon.com/icons/svg/214/214298.svg" alt="donut icon" className="donut"/>ut Ambassad<img src="https://image.flaticon.com/icons/svg/761/761952.svg" alt="donut icon" className="donut"/>r</h3>
        <form onSubmit={this.onSubmit} name="new-user-form" id="new-user-form" className="new-user-form">
          <div className="form-group">
            <label htmlFor="usr">Email</label>
            <input type="text" className="form-control" name="email" placeholder="nosh@gmail.com" onChange={this.onFormChange} />
          </div>

          <div className="form-group">
            <label htmlFor="usr">Username</label>
            <input type="text" className="form-control" name="name" placeholder="BlackNGreen" onChange={this.onFormChange} value={this.state.name} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={this.onFormChange} />
          </div>

          <button type="submit" className="btn btn-danger new-user-form--submit">Submit</button>

      </form>
      </div>
    );
  }

}

NewUserLogin.propTypes = {
  token: PropTypes.string,
  //must add is requred to this form for prop just od it when your ready
};

export default NewUserLogin;
