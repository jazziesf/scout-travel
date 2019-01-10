import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinPostCard from './PinPostCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = "http://127.0.0.1:8000/board/"

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
        axios.get(URL)
          .then((response) => {
            const pins = response.data.objects.map((pin) => {
              const newPin = {
                ...pin,
                id: pin.id,
                images: pin.images,
                details: pin.details,
                location: pin.location,
                company: pin.company,
                likes: pin.likes,
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

      // pinToBoard = (newPin) => {
      //   console.log(newPin);
      //     const apiPayload = {
      //       ...newPin,
      //       image: newPin.image,
      //       location: newPin.location,
      //       company: newPin.company,
      //       details: newPin.details,
      //     }
      //     axios.post(URL, apiPayload)
      //       .then((response) => {
      //         console.log(response);
      //         const myNewPin = response.data;
      //
      //         myNewPin.images = [myNewPin.img];
      //         newPin.id = myNewPin.id
      //
      //         const { myPinList, masterList } =  this.state;
      //         newPin.id = myNewPin.id
      //
      //         masterList.push(newPin);
      //
      //         if (myPinList !== masterList)
      //           myPinList.push(newPin);
      //
      //         this.stateState({
      //           myPinList,
      //           masterList,
      //         });
      //         // What should we do when we know the post request worked?
      //       })
      //       .catch((error) => {
      //         // What should we do when we know the post request failed?
      //         this.setState({
      //           errorMessage: `Failure ${error.message}`,
      //         })
      //       });
      //   }


    incrementLikes = (pinId) => {
      //add PinId when you add backend
      // const liked = this.state.liked; when you toggle like
      const { myPinList } = this.state

      const selectedPin = myPinList.find((pin) => {
          return pin.id === pinId;
      });

          if (selectedPin) {
            selectedPin.likes += 1;
            this.setState({
              myPinList: myPinList,
            });
          }
       }

    render() {
      const heart = this.state.liked ? "https://image.flaticon.com/icons/svg/69/69904.svg" : "https://image.flaticon.com/icons/svg/126/126471.svg"

        const myPinList = this.state.myPinList.map((pin) => {
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
  // pinToBoardCallback: PropTypes.func,
};

export default MyPinsList;
