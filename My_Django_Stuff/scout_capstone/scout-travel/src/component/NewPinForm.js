import React, { Component } from 'react';
import './NewPinForm.css'
import PropTypes from 'prop-types';
import axios from 'axios'

const URL = "http://127.0.0.1:8000/api/pin/pin/"

class NewPinForm extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

    this.state = {
      usaStates: [ "AK",
                          "AL",
                          "AR",
                          "AS",
                          "AZ",
                          "CA",
                          "CO",
                          "CT",
                          "DC",
                          "DE",
                          "FL",
                          "GA",
                          "GU",
                          "HI",
                          "IA",
                          "ID",
                          "IL",
                          "IN",
                          "KS",
                          "KY",
                          "LA",
                          "MA",
                          "MD",
                          "ME",
                          "MI",
                          "MN",
                          "MO",
                          "MS",
                          "MT",
                          "NC",
                          "ND",
                          "NE",
                          "NH",
                          "NJ",
                          "NM",
                          "NV",
                          "NY",
                          "OH",
                          "OK",
                          "OR",
                          "PA",
                          "PR",
                          "RI",
                          "SC",
                          "SD",
                          "TN",
                          "TX",
                          "UT",
                          "VA",
                          "VI",
                          "VT",
                          "WA",
                          "WI",
                          "WV",
                          "WY",
                          "Europe", "Asia", "South America", "Antarctica", "Africa", "Australia"],
      details: '',
      business: '',
      city: '',
      state: '',
      image: null,
      loaded: 0,
      tags: [1],
      categories: ["1"],
      user: 2
    };
  }

  resetState = () => {
    this.setState({
      details: '',
      business: '',
      city: '',
      state: '',
      image: null,
      tags: [1],
      categories: [1],
      dish: ''
      // user: 2
    });
  }


  renderStates = () => {
      return this.state.usaStates.map((state, i) => {
        return <option value={state} key={i}>{state}</option>
      })
    }


  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value.charAt(0).toUpperCase()+ value.slice(1);

    this.setState(updatedState);
  }


  addPin = (newPin) => {
    const form = this.form.current

    const data = new FormData(form)

      axios.post(URL, data, { headers: { Authorization: `Token ${document.cookie}`}})
        .then((response) => {
          this.props.successfullRequestCallback()
          const myNewPin = response.data;
          const { pinList, masterList } =  this.state;

          newPin.id = myNewPin.id

          masterList.push(newPin);

          if (pinList !== masterList)
            pinList.push(newPin);

          this.stateState({
            pinList,
            masterList,
          });
          // What should we do when we know the post request worked?
        })
        .catch((error) => {
          // What should we do when we know the post request failed?
          this.setState({
            errorMessage: `Failure ${error.message}`,
          })
        });
    }

  handleselectedFile = (event) => {
    console.log(event.target.files[0]);
      this.setState({
        image: event.target.files[0],
        loaded: 0,
      })
    }

  onSubmit = (event) => {
    event.preventDefault();
    const { business, city, details, state, image, dish } = this.state;

    if ( business === '' || city === '' || details === '' || state === ''|| image === '' || dish === '') return;

    this.addPin(this.state);
    this.resetState();
  }

  render() {
    return (
      <div className="form-div pin-form">
      <h3 className='login'>N<img src="https://image.flaticon.com/icons/svg/761/761952.svg" alt="donut icon" className="donut"/>sher Pin</h3>
        <form onSubmit={this.onSubmit} ref={this.form} name="new-pin-form" id="new-pin-form" className="new-pin-form" encType='multipart/form-data' >
          <div className="form-group new">
            <label htmlFor="usr">What the Dish?</label>
            <input type="text" className="form-control" id="usr" name="dish" placeholder="Homemade Sweet Chipotle Sauce" onChange={this.onFormChange} value={this.state.dish} />
          </div>

          <div className="form-group new">
            <label htmlFor="usr">Restaurant's Name</label>
            <input type="text" className="form-control" id="usr" name="business" placeholder="Bongo's Cuban Cafe" onChange={this.onFormChange} value={this.state.business} />
          </div>

          <div className="form-row">
            <div className="form-group new col-7">
              <label htmlFor="usr">City</label>
              <input type="text" className="form-control" id="usr" name="city" placeholder="Seattle" onChange={this.onFormChange} value={this.state.city} />
            </div>

            <div className="form-group new col">
              <label htmlFor="exampleFormControlSelect1">State</label>
                <select className="form-control state" size={2} name="state"  onChange={this.onFormChange} id="exampleFormControlSelect1">
                  {this.renderStates()}
                </select>
            </div>
          </div>

          <div className="form-group new">
            <label htmlFor="exampleInputFile">Upload Image</label>
            <input type="file" name="image" className="form-control-file btn btn-danger" id="exampleInputFile" aria-describedby="fileHelp"  accept="image/*" onChange={this.handleselectedFile}/>
          </div>

          <div className="form-group new">
            <label htmlFor="exampleTextarea">We're lookin for positive vibes. Tell us what you enjoyed about your expereince?</label>
            <textarea name="details" className="form-control" id="exampleTextarea" rows="3" value={this.state.details} onChange={this.onFormChange}></textarea>
          </div>

          <input name="user" type="hidden" value={this.state.user} />

          <input className="btn btn-danger new-pin-form--submit" type="submit" name="submit" value="Submit" />
        </form>
      </div>
    );
  }


}

NewPinForm.propTypes = {
  successfullRequestCallback: PropTypes.func,
  //must add is requred to this form for prop just od it when your ready
};

export default NewPinForm;
