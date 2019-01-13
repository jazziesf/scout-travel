import React, { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar'
// import Card from './component/card'
import Details from './component/details'
import AllPinsList from './component/AllPinsList'
import NewPinForm from './component/NewPinForm'
import MyPinsList from './component/MyBoardPins'
import NewUserLogin from './component/NewUserLogin'
import ReturningUser from './component/ReturningUser'


import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'

const URL = "http://127.0.0.1:8000/api/pin/pin/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActive: false,
      isRevealed: false,
      pinList: [],
      currentPin: undefined,
      likesCount: 0,
      liked: false,
      token: this.props.token,
      likes: 0,
    };
  }

  // incrementLikes = (pinId) => { //add PinId when you add backend
  //   // const liked = this.state.liked;
  //   console.log(pinId);
  //   const selectedPin = this.state.pinList.find((pin) => {
  //     console.log(pin);
  //       return pin.id === pinId;
  //   });
  //       if (selectedPin) {
  //         this.setState({
  //           likesCount: this.state.likesCount + 1,
  //           liked: true
  //         });
  //       }
  //    }


  // decreaseLikes = () => {
  //     this.setState({
  //       likesCount: this.state.likesCount - 1
  //     });
  //   }

  // componentDidMount() {
  //     axios.get(URL)
  //       .then((response) => {
  //         console.log(response.data.objects);
  //         const pins = response.data.objects.map((pin) => {
  //           const newPin = {
  //             ...pin,
  //             images: pin.images,
  //             details: pin.details,
  //             location: pin.location,
  //             company: pin.company,
  //             user: pin.user,
  //             likes: 0,
  //           };
  //         return newPin;
  //         })
  //         // .filter((pin, index) => index < 10);
  //
  //         this.setState({
  //           pinList: pins,
  //           masterList: pins,
  //         })
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //         this.setState({
  //           error: error.message,
  //         })
  //       })
  //   }


  toggleHamburgerMenu() {
    const currentState = this.state.isOpen
    this.setState({
      isOpen: !currentState
    });
  };

  toggleDropdown(event) {
    event.preventDefault()
    const newState = this.state.isActive
    this.setState({
      isActive: !newState
    });
  };


  incrementLikes = (pinId) => {

    const { pinList } = this.state
    const selectedPin = pinList.find((pin) => {
      console.log(pin);
      return pin.id === pinId;
    });

    if (selectedPin) {
      selectedPin.likes += 1;
      console.log(selectedPin);
      this.setState({
        pinList: pinList,
      });
    }
    const apiPayload = {
      likes: selectedPin.likes
    }
    const url = URL + `${pinId}/`
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


  detailsPageCallback = (pin) => {
    this.setState({
      currentPin: pin,
      isRevealed: true
    });
  }


  render() {
    const heart = this.state.liked ? "https://image.flaticon.com/icons/svg/69/69904.svg" : "https://image.flaticon.com/icons/svg/126/126471.svg"
    const show = this.state.isOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"
    const dropdown1 = this.state.isActive ? "nav-item dropdown show" : "nav-item dropdown"
    const dropdown2 = this.state.isActive ? "dropdown-menu show" : "dropdown-menu"
    const dropdown3 = this.state.isActive ? "true" : "false"

    return (
      <div className="App">
      <Router>
        <div>
          <Navbar
            hamburgerMenu={() => this.toggleHamburgerMenu()}
            collapseNavbar={show}
            dropdown={(event) => this.toggleDropdown(event)}
            dropdownClassName={dropdown1}
            dropdownShow={dropdown2}
            expandDropdown={dropdown3}
            login={<Link to="/scoutlogin" >Log-In</Link>}
            signUp={<Link to="/newuser">Become an Ambassador</Link>}
            myScoutList={<Link to="/myscoutboard" >My Scout Board</Link>}
            linkAddPin={<Link to="/addscoutpin" >Post to Scout</Link>}
          />

        { this.state.isRevealed &&
          <Details
          pinSelected={this.state.currentPin}
          likesCountCallback={(pinId) => this.incrementLikes(pinId)}
          commentCallback={()=> this.commentView}
          heartFilledSrc={heart}
          token={this.state.token}
          /> }


        { !this.state.isRevealed && <AllPinsList
          // likesCountCallback={this.likesCountCallback}
          selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
          detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
          /> }


          <Route path="/myscoutboard"
          render={() =>
          <MyPinsList
          // likesCountCallback={this.likesCountCallback}
          selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
          detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
          token={this.state.token}
          />
        }
        />

        <Route path="/newuser"
          render={() =>
            <NewUserLogin token={this.props.token}
            />
          }
        />

        <Route path="/scoutlogin"
         render={() =>
           <ReturningUser token={this.props.token}
           />
         }
         />


        <Route path="/addscoutpin"
        render={() =>
          <NewPinForm
          addPinCallback={this.addPin}
          token={this.state.token}
          />
        }
        />


            </div>
            </Router>
            </div>
          );
        }
      }

      export default App;
