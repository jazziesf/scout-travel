import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinPostCard from './PinPostCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = "http://127.0.0.1:8000/api/board/board/1/"
// const URL = `http://127.0.0.1:8000/api/board/board/${this.state.user}/`

class MyPinsList extends Component {
      constructor(props) {
        super(props);

        this.state = {
          likesCount: [],
          liked: false,
          myPinList: [],
          masterList: [],
        }
      }

    componentDidMount() {
        axios.get(URL, { headers: {Authorization: 'Token 77aa860f8e821f138992f0d64f70ef9086778be3' }})
        // axios.get(URL, { headers: {Authorization: this.props.token }})
          .then((response) => {
            const pins = response.data.pin.map((pi) => {
              console.log(pi);
              const newPin = {
                ...pi,
                id: pi.id,
                image: pi.image,
                details: pi.details,
                city: pi.city,
                state: pi.state,
                business: pi.business,
                user: pi.user,
                likes: pi.likes,
              };
            return newPin;
            })
            // .filter((pin, index) => index < 10);

            this.setState({
              myPinList: pins,
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


      incrementLikes = (pinId) => {
        const url = `http://127.0.0.1:8000/api/pin/pin/${pinId}/`
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

        const myPinList = this.state.myPinList.map((pin, i) => {
        return <PinPostCard
              key={i}

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
          {myPinList}
        </div>
      </div>
    )
  }

}

MyPinsList.propTypes = {
  onSelectPin: PropTypes.func,
  detailsPageCallback: PropTypes.func,
  incrementLikes: PropTypes.func,
  detailsLikesCountCallback: PropTypes.func,
  token: PropTypes.string
  // pinToBoardCallback: PropTypes.func,
};

export default MyPinsList;
