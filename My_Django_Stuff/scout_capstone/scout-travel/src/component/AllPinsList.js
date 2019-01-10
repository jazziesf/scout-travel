import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinPostCard from './PinPostCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = "http://127.0.0.1:8000/api/pin/pin/"

class AllPinsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likesCount: [],
      liked: false,
      pinList: [],
      masterList: [],
    }
  }

  componentDidMount() {
    axios.get(URL)
    .then((response) => {
      console.log(response.data);
      const pins = response.data.map((pin) => {
        const newPin = {
          ...pin,
          id: pin.id,
          image: pin.image,
          details: pin.details,
          city: pin.city,
          state: pin.state,
          business: pin.business,
          user: pin.user,
          // likes: pin.likes,
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

  pinToBoard = (newPin) => {
    console.log(newPin);

    console.log("im the new pin for board");
    const apiPayload = {
      ...newPin,
      id: newPin.id,
      image: newPin.image,
      details: newPin.details,
      city: newPin.city,
      state: newPin.state,
      business: newPin.business,
      name: newPin.name
    }
    const url = "http://127.0.0.1:8000/board/"
    axios.post(url, apiPayload)
    .then((response) => {
      console.log(response);
      const myNewPin = response.data;

      myNewPin.images = [myNewPin.img];
      newPin.id = myNewPin.id

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


  incrementLikes = (pinId) => {
    console.log("In increment likes");
    //add PinId when you add backend
    // const liked = this.state.liked; when you toggle like
    const url = URL + `${pinId}/`

    const { pinList } = this.state

    console.log("Before, index of interesting pin is", pinList.findIndex(pin => pin.id === pinId));

    const selectedPin = pinList.find((pin) => {
      return pin.id === pinId;
    });

    if (selectedPin) {
      selectedPin.likes += 1;
      this.setState({
        pinList: pinList,
      });
    }

    console.log("After, index of interesting pin is", pinList.findIndex(pin => pin.id === pinId));


    const apiPayload = {
      likes: selectedPin.likes
    }

    axios.patch(url, apiPayload)
    .then((response) => {
      console.log(response);
    })
    // What should we do when we know the post request worked?

    .catch((error) => {
      // What should we do when we know the post request failed?
      this.setState({
        errorMessage: `Failure ${error.message}`,
      })
    });
  }

  render() {
    const heart = this.state.liked ? "https://image.flaticon.com/icons/svg/69/69904.svg" : "https://image.flaticon.com/icons/svg/126/126471.svg"

    const pinList = this.state.pinList.map((pin) => {
      return <PinPostCard
      key={pin.id}

      likesCountCallback={() => this.incrementLikes(pin.id)}
      pinToBoardCallback={() => this.pinToBoard(pin)}

      detailsLikeCallback={() => this.incrementLikes(pin.id)}

      detailsPageCallback={() => this.props.detailsPageCallback(pin)}
      heartFilledSrc={heart}

      // commentCallback: PropTypes.func,
      {...pin}
      />
    });

    return (
      <div className="body">
        <div className="row">
        {pinList}
        </div>
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
};

export default AllPinsList;
