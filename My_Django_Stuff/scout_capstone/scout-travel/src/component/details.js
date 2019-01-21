import React, { Component } from 'react';
import './Details.css'
import PropTypes from 'prop-types';
import axios from 'axios';

// import GoogleMaps from './GoogleMaps'
const URL = "http://127.0.0.1:8000/api/pin/pin/"

class Details extends Component {
      constructor(props) {
        super(props);

        this.state = {
          pin: null,
        }
      }
      //
      // goBack(){
      //   this.history.push('/nosher')
      // }


      componentDidMount() {
        if (this.props.selectedPin === undefined) {
          axios.get(URL + this.props.pinId, { headers: { Authorization: `Token ${document.cookie}`}})
          .then((response) => {
            this.setState({
              pin: response.data
            })
          })
        }
      }



      pinToBoard = (pin) => {
        const userId = parseInt(window.localStorage.getItem('id'));
        const URL = `http://127.0.0.1:8000/api/board/board/${userId}/pins/${pin.id}/add/`

          const apiPayload = {
            pin: [pin],
            user: userId,
          }

          axios.post(URL, apiPayload, { headers: {Authorization: `Token ${document.cookie}`}})
          .then((response) => {
            console.log(response)
            // What should we do when we know the post request worked?
          })
          .catch((error) => {
            // What should we do when we know the post request failed?
            this.setState({
              errorMessage: `Failure ${error.message}`,
            })
          });
        }



render() {
    const pin = this.state.pin || this.props.pinSelected
    if (pin) {
    return (
    <div className="details-container">
      <div className="container fixed">
        <div className="row">
          <div className="col-12 col-sm-6 img-fluid img-responsive">
            <img src={pin.image} alt="Snow" className="image-fix"/>
            <button className="top-right btn btn-danger pin-btn detail-btn" onClick={() => this.pinToBoard(pin)}>Pin</button>
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



Details.propTypes = {
  likesCountCallback: PropTypes.func,
  commentCallback: PropTypes.func,
  pinSelected: PropTypes.object,
  heartFilledSrc: PropTypes.string,
  incrementLikes: PropTypes.func,
  backButton: PropTypes.func,
}


export default Details;
