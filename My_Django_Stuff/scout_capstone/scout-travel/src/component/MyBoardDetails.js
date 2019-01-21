import React, { Component } from 'react';
import './Details.css'
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

// import GoogleMaps from './GoogleMaps'

class MyBoardDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: null,
    }
  }


  componentDidMount() {
    const URL = "http://127.0.0.1:8000/api/pin/pin/"

    if (this.props.selectedPin === undefined) {
      axios.get(URL + this.props.pinId, { headers: { Authorization: `Token ${document.cookie}`}})
      .then((response) => {

        console.log(response);
        this.setState({
          pin: response.data
        })
      })
    }

    // if (this.props.selectedPin === undefined) {
    //   axios.get(URL + this.props.pinId + '/details/', { data: { user : userId} }, { headers: { Authorization: `Token ${document.cookie}`}})
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       pin: response.data
    //     })
    //   })
    // }
  }


render() {
    const pin = this.state.pin || this.props.pinSelected
    if (pin) {
    return (
    <div className="details-container">
      <div className="container fixed">
        <div className="row">
          <div className="col-12 col-sm-6 img-fluid img-responsive">
            <img src={pin.image} alt={pin.dish} className="image-fix"/>
            <Link to="/mynosherboard" className="top-right btn btn-warning" onClick={() => this.props.goBack()}>Back</Link>
          </div>
          <div className="col-12 col-sm-6">
            <div className="container">
              <p className="dish-detail">{pin.dish.charAt(0).toUpperCase() + pin.dish.slice(1)}</p>
              <p className="restuarnt">{pin.business}</p>

              <p className="city">{pin.city.charAt(0).toUpperCase() + pin.dish.slice(1)}, {pin.state.toUpperCase()} </p>

              <div className="icons-details" >
                <img src='https://image.flaticon.com/icons/svg/126/126471.svg' alt="like button" className="heart" onClick={() => this.props.incrementLikes(pin)}/>
                <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="comment box" className="comment" onClick={this.props.commentCallback} />
                <a href={`https://www.google.com/maps/search/?api=1&query=${pin.business}+${pin.city}+${pin.state}`} target='_blank' rel='noreferrer noopener'><img src="https://image.flaticon.com/icons/svg/684/684809.svg" alt="comment" className="map"/></a>
              </div>
                <p className="likes-details">{pin.likes} likes</p>
              <div className="scroll">
                <p className="description">{pin.details}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  } else {
    return <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
            </div>
          }
  }
}



MyBoardDetails.propTypes = {
  likesCountCallback: PropTypes.func,
  commentCallback: PropTypes.func,
  pinSelected: PropTypes.object,
  incrementLikes: PropTypes.func,
  backButton: PropTypes.func,
}


export default MyBoardDetails;
