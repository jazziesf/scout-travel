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
      likesCount: [],
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
          details: pin.details,
          city: pin.city,
          state: pin.state,
          dish: pin.dish,
          business: pin.business,
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

   //  axios.get(boardurl, { headers: { Authorization: `Token ${document.cookie}`}})
   //    .then((response) => {
   //      const pins = response.data.pin.map((pi) => {
   //        const newPin = {
   //          ...pi,
   //          id: pi.id,
   //          image: pi.image,
   //          details: pi.details,
   //          city: pi.city,
   //          state: pi.state,
   //          business: pi.business,
   //          dish: pi.dish,
   //          user: pi.user,
   //          likes: pi.likes,
   //        };
   //      return newPin;
   //      })
   //      this.setState({
   //        addPinList: [{newPin, ...pins}],
   //      })
   //      console.log(this.state.addPinList);
   //      console.log("im at the add pin to board");
   //      this.addPintoBoard(this.state.addPinList)
   //    })
   //    .catch((error) => {
   //      console.log(error.message);
   //      this.setState({
   //        error: error.message,
   //      })
   //    })
   // }

    // addPintoBoard = (pinList) => {
    //   console.log("im in addpin to bard");
    //   console.log(pinList);
      // const patchUrl = `http://127.0.0.1:8000/api/board/board/${userId}/`
      // const newpin = {...pin}
      // console.log(pin.image.constructor.name)
      // console.log(pin.image)
      const apiPayload = {
        pin: [pin],
        user: userId,
        // pin: pinList,
        // pin: {...newPin},
        // pin

        // user: userId
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
  token: PropTypes.string
};

export default AllPinsList;
