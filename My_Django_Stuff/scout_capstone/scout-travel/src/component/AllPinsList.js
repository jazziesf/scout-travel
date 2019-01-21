import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinPostCard from './PinPostCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StackGrid from "react-stack-grid";

const URL = "http://127.0.0.1:8000/api/pin/pin/"

class AllPinsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      pinList: [],
      masterList: [],
      addPinList: [],
    }
  }


  componentDidMount() {
    axios.get(URL, { headers: { Authorization: `Token ${document.cookie}`}})
    .then((response) => {
      const pins = response.data.map((pin) => {
        const newPin = {
          ...pin,
          id: pin.id,
          image: pin.image,
          details: pin.details.charAt(0).toUpperCase() + pin.details.slice(1),
          city: pin.city.charAt(0).toUpperCase() + pin.city.slice(1),
          state: pin.state.toUpperCase(),
          dish: pin.dish.charAt(0).toUpperCase() + pin.dish.slice(1),
          business: pin.business.charAt(0).toUpperCase() + pin.business.slice(1),
          likes: pin.likes,
        };
        return newPin;
      })
      // .filter((pin, index) => index < 10);
      this.setState({
        pinList: pins,
        masterList: pins,
      })
    })
    .catch((error) => {
      console.log(error.message);
      this.setState({
        error: error.message,
      })
    })
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
        const selectedPin = this.state.pinList.findIndex((item) => {
             return item.id === pin.id;
         });

        this.state.pinList.splice(selectedPin, 1)

        this.setState({
          pinList: this.state.pinList,
        })
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
    // const heart = this.state.liked ? "https://image.flaticon.com/icons/svg/69/69904.svg" : "https://image.flaticon.com/icons/svg/126/126471.svg"

    const pinList = this.state.pinList.map((pin) => {
      return <PinPostCard
      key={pin.id}
      pinButton={"Pin"}
      likesCountCallback={() => this.props.incrementLikes(pin)}
      pinToBoardCallback={() => this.pinToBoard(pin)}
      buttonType={"top-right btn btn-danger"}

      detailsPageCallback={() => this.props.detailsPageCallback(pin)}
      heartFilledSrc={this.props.heartFilledSrc}

      // commentCallback: PropTypes.func,
      {...pin}
      />
    });

    return (
      <div className="body">
          <StackGrid columnWidth={400} >
              {pinList}
          </StackGrid>
      </div>
    )
  }

}

AllPinsList.propTypes = {
  onSelectPin: PropTypes.func,
  detailsPageCallback: PropTypes.func,
  incrementLikes: PropTypes.func,
  detailsLikesCountCallback: PropTypes.func,
  pinToBoardCallback: PropTypes.func,
  token: PropTypes.string,
  heartFilledSrc: PropTypes.string,
  pinList: PropTypes.array,
};

export default AllPinsList;
