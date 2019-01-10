import React, { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Card from './component/card'
import Details from './component/details'
import AllPinsList from './component/AllPinsList'
import NewPinForm from './component/NewPinForm'
import MyPinsList from './component/MyBoardPins'
import LogIn from './component/LogIn'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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

  onlikesCount = () => {
    console.log("like count clicked");
    const liked = this.state.liked
    this.setState({
      likesCount: this.state.likesCount + 1,
      liked: !liked
    })
  }


  detailsPageCallback = (pin) => {
    console.log(pin);
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
            login={<Link to="/login" >Log-In</Link>}
            myScoutList={<Link to="/myscoutlist" >My Scout List</Link>}
            linkAddPin={<Link to="/addscoutpin" >Add to Scout's Community</Link>}
          />

        { !this.state.isRevealed && <Card
          // likesCount={this.onlikesCount}
          numberLikes={this.state.likes}
          heartFilledSrc={heart}
          /> }

        { this.state.isRevealed &&
          <Details
          pinSelected={this.state.currentPin}
          // likesCountCallback={this.props.likesCountCallback}
          commentCallback={()=> this.commentView}
          heartFilledSrc={heart}
          /> }


        { !this.state.isRevealed && <AllPinsList
          // likesCountCallback={this.likesCountCallback}
          selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
          detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
          /> }


        { this.state.isRevealed &&  <Route path="/myscoutlist"
        render={() =>
          <MyPinsList
          // likesCountCallback={this.likesCountCallback}
          selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
          detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
          />
        }
        /> }

        <Route path="/login"
          render={() =>
            <LogIn
            />
          }
        />

        <Route path="/addscoutpin"
        render={() =>
          <NewPinForm
          addPinCallback={this.addPin}
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
