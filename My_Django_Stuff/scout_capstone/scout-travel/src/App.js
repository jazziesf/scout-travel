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
import { Route, Redirect } from 'react-router'

import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios'

const URL = "http://127.0.0.1:8000/api/pin/pin/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActive: false,
      isHidden: false,
      isRevealed: false,
      pinList: [],
      currentPin: undefined,
      // likesCount: 0,
      liked: false,
      likes: 0,
      loggedIn: false,
      successfulRequest: false,
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

  onSearch = (params) => {
    const url = `http://127.0.0.1:8000/api/pin/pin/?city=${params}`
      axios.get(url, { headers: { Authorization: `Token ${document.cookie}`}})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

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

  closeNavBar(event) {
    const stateActive  = this.state.isActive
    const stateOpen  = this.state.isOpen

    this.setState({
      isActive: !stateActive,
      isOpen: !stateOpen,
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
    axios.patch(url, apiPayload, { headers: { Authorization: `Token ${document.cookie}`}} )
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
      isRevealed: true,
    });

  }

  onLoggedIn = (token) => {
    // document.cookie = `${token}`;
    // userId = window.localStorage.setItem('id', response.data.id)
    this.setState({
      loggedIn: true,
    })
  }

  logOut = () => {
    localStorage.clear()
    document.cookie = ''
    this.setState({
      loggedIn: false,
    })
  }

  onSuccessfulRequest = () => {
    this.setState({
      successfulRequest: true,
    })
    console.log(this.state.successfulRequest)
  }

  userInfo = () => {
    if (document.cookie !== '') {
      return <li onClick={this.logOut} className="logout">Log-Out</li>
    } else {
      return <Link to="/scoutlogin" >Log-In</Link>
    }
  }

  scoutAmbassadorInfo = (name) => {
    if (document.cookie !== '') {
      return "Scout Ambassador"
    } else {
      return 'Ambassador Log-In '
    }
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
            closeNav={(event) => this.closeNavBar(event)}
            login={this.userInfo()}
            signUp={<Link to="/newuser">Sign Up</Link>}
            myScoutList={<Link to="/myscoutboard" >My Scout Board</Link>}
            linkAddPin={<Link to="/addscoutpin" >Post to Scout</Link>}
            scoutAmbassador={this.scoutAmbassadorInfo()}
            searchQuery={this.onSearch}
          />

        <Route path="/scoutdetails"
          render={() =>
            <Details
              pinSelected={this.state.currentPin}
              likesCountCallback={(pinId) => this.incrementLikes(pinId)}
              commentCallback={()=> this.commentView}
              heartFilledSrc={heart}
            />
           }
         />

        {/*  <Route path="/scout"
          render={() =>
            <AllPinsList
              // likesCountCallback={this.likesCountCallback}
              selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
              detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
           /> }
         />  */}

         <Route exact path="/scout" render={() => (
             this.state.isRevealed ? (
               <Redirect to="/scoutdetails"/>
             ) : (
               <AllPinsList
                 // likesCountCallback={this.likesCountCallback}
                 selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
                 detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
              />
            )
          )}/>


          <Route exact path="/myscoutboard" render={() =>
              this.state.isRevealed ? (
                <Redirect to="/scoutdetails"/>
              ) : (
              <MyPinsList
              // likesCountCallback={this.likesCountCallback}
              selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
              detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
              />
            )}
          />

        <Route exact path="/newuser" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/scout"/>
            ) : (
           <NewUserLogin loggedInCallback={this.onLoggedIn} />
           )
         )}
        />


        <Route exact path="/scoutlogin" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/scout"/>
            ) : (
            <ReturningUser
            loggedInCallback={this.onLoggedIn}
            nameCallback={this.scoutAmbassadorInfo}
            />
           )
         )}/>


       <Route exact path="/addscoutpin" render={() => (
           this.state.successfulRequest ? (
             <Redirect to="/scout"/>
           ) : (
             <NewPinForm successfullRequestCallback={this.onSuccessfulRequest}/>
          )
        )}/>


      {/*  <Route path="/addscoutpin"
          render={() =>
            <NewPinForm
              addPinCallback={this.addPin}
              token={this.state.token}
            />
          }
        /> */}


        </div>
      </Router>
    </div>
    );
  }
}

    export default App;
