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
    axios.get(URL, { headers: {Authorization: 'Token 77aa860f8e821f138992f0d64f70ef9086778be3' }})
    // axios.get(URL, { headers: {Authorization: this.props.token }})
    .then((response) => {
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

  pinToBoard = (newPin) => {
    console.log(newPin);
    const apiPayload = {
      pin: newPin
    }
    const url = `http://127.0.0.1:8000/api/board/board/1/`
    axios.patch(url, apiPayload, { headers: {Authorization: 'Token 77aa860f8e821f138992f0d64f70ef9086778be3' }})
    // axios.patch(url, apiPayload, { headers: {authorization: this.props.token }})
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


  incrementLikes = (pinId) => {
    const url = URL + `${pinId}/`
    const { pinList } = this.state

    const selectedPin = pinList.find((pin) => {
      return pin.id === pinId;
    });

    if (selectedPin) {
      selectedPin.likes += 1;
      this.setState({
        pinList: pinList,
      });
    }
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
  token: PropTypes.string
};

export default AllPinsList;
