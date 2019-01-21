import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinPostCard from './PinPostCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StackGrid from "react-stack-grid";



class MyPinsList extends Component {
      constructor(props) {
        super(props);

        this.state = {
          myPinList: [],
          masterList: [],
        }
      }

    componentDidMount() {
      const userId = window.localStorage.getItem('id')
      const URL = `http://127.0.0.1:8000/api/board/board/${userId}/`

        axios.get(URL, { headers: { Authorization: `Token ${document.cookie}`}})
          .then((response) => {
            const pins = response.data.pin.map((pin) => {
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
                user: pin.user,
              };
            return newPin;
            })

            this.setState({
              myPinList: pins,
            })
          })
          .catch((error) => {
            console.log(error.message);
            this.setState({
              error: error.message,
            })
          })
      }


      removePinFromBoard = (pin) => {
        const userId = parseInt(window.localStorage.getItem('id'));
        const URL = `http://127.0.0.1:8000/api/board/board/${userId}/pins/${pin.id}/remove/`

          const apiPayload = {
            pin: [pin],
            user: userId,
          }

          axios.delete(URL, { data: apiPayload }, {headers: {Authorization: `Token ${document.cookie}`}})
          .then((response) => {
            console.log(response)
            const selectedPin = this.state.myPinList.findIndex((item) => {
                 return item.id === pin.id;
             });

            this.state.myPinList.splice(selectedPin, 1)

            this.setState({
              myPinList: this.state.myPinList,
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

        const myPinList = this.state.myPinList.map((pin, i) => {
        return <PinPostCard
              key={i}
              likesCountCallback={() => this.props.incrementLikes(pin)}
              pinToBoardCallback={() => this.removePinFromBoard(pin)}
              pinButton={'Remove'}
              detailsPageCallback={() => this.props.detailsPageCallback(pin)}
              buttonType={"top-right btn btn-warning"}
              {...pin}
             />
        });

  return (
      <div className="body">
          <StackGrid columnWidth={400} >
            {myPinList}
          </StackGrid>
      </div>
    )
  }

}

MyPinsList.propTypes = {
  onSelectPin: PropTypes.func,
  detailsPageCallback: PropTypes.func,
  incrementLikes: PropTypes.func,
  detailsLikesCountCallback: PropTypes.func,
  token: PropTypes.string,
  pinToBoardCallback: PropTypes.func,
  pinButton: PropTypes.string
};

export default MyPinsList;
