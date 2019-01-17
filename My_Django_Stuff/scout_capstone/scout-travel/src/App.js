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
import PinPostCard from './component/PinPostCard'
import StackGrid from "react-stack-grid";

// import Splash from './component/Splash'
// import PinPostCard from './component/ReturningUser'

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
      heart: 'https://image.flaticon.com/icons/svg/126/126471.svg',
      updated: false,
      likes: 0,
      loggedIn: false,
      successfulRequest: false,
      isRevealedScoutBoard: false,
      query: '',
      search: true,
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
  nameCallback = (name) => {
    this.setState({
      name: name
    })
  }

  onSearch = (params) => {
    params.toLowerCase()

    const url = `http://127.0.0.1:8000/api/pin/pin/?city=${params}`
      axios.get(url, { headers: { Authorization: `Token ${document.cookie}`}})
      .then((response) => {
        if (response.data.length === 0) {
          this.setState({
            results: false,
            isActive: false,
            isOpen: false,
          })
        } else {
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
          isActive: false,
          isOpen: false,
          isRevealed: false,
        })
      }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          error: error.message,
        })
      })

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

    if(!this.state.updated) {
      this.setState({
          likes: pinId.likes += 1,
          pinList: pinList,
          // heart: "https://image.flaticon.com/icons/svg/69/69904.svg"
      });
    } else {
      this.setState({
          likes: pinId.likes -= 1,
          pinList: pinList,
          // heart: "https://image.flaticon.com/icons/svg/126/126471.svg"
        });
      }

    const apiPayload = {
      likes: pinId.likes
    }
    const url = URL + `${pinId.id}/`
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
      isActive: false,
      isOpen: false,
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
      return <span onClick={this.logOut} className="logout">Log-Out</span>
    } else {
      return <Link to="/scoutlogin" >Log-In</Link>
    }
  }

  userInfoSignIn = () => {
    if (document.cookie !== '') {
      return `Welcome Back`
    } else {
      return <Link to="/newuser">Sign Up</Link>
    }
  }

  scoutAmbassadorInfo = (name) => {
    if (document.cookie !== '') {
      return "Scout Ambassador"
    } else {
      return 'Scout Log-In & Sign-Up'
    }
  }

  viewBoard = () => {
    this.setState({
      isRevealed: false,
    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  resetState = () => {
    this.setState({
      query: '',
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;

    if ( query === '') return;

    this.onSearch(query);
    this.resetState();
    this.setState({
      isRevealed: false,
    })
  }


  render() {
    const show = this.state.isOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"
    const dropdown1 = this.state.isActive ? "nav-item dropdown show" : "nav-item dropdown"
    const dropdown2 = this.state.isActive ? "dropdown-menu show" : "dropdown-menu"
    const dropdown3 = this.state.isActive ? "true" : "false"

    const pinList = this.state.pinList.map((pin) => {
      return <PinPostCard
      key={pin.id}
      pinButton={"Pin"}
      likesCountCallback={() => this.incrementLikes(pin)}

      pinToBoardCallback={() => this.pinToBoard(pin)}

      detailsPageCallback={() => this.detailsPageCallback(pin)}
      heartFilledSrc={this.state.heart}

      // commentCallback: PropTypes.func,
      {...pin}
      />
    })

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
            signUp={this.userInfoSignIn()}
            myScoutList={<Link to="/myscoutboard" onClick={() => this.viewBoard()}>My Scout Board</Link>}
            linkAddPin={<Link to="/addscoutpin" >Post to Scout</Link>}
            scoutAmbassador={this.scoutAmbassadorInfo()}
            searchQuery={this.onSubmit}
            searchQueryonChange={this.onFormChange}
            searchQueryValue={this.state.query}
            searchLink={<Link to="/searchresults" className="btn-outline-danger my-2 my-sm-0 searchBtn" onClick={() => this.viewBoard()}>Search</Link>}
          />


          <Route path="/searchresults" render={() => (
              this.state.isRevealed ? (
                <Redirect to="/scoutdetails"/>
              ) : (
              this.state.results ? (
                <StackGrid columnWidth={400} >
                   {pinList}
                 </StackGrid>
               ) : (
                 <p>Looks like you have no search results</p>
               )
             )
           )}/>

        <Route path="/scoutdetails"
          render={() =>
            <Details
              pinSelected={this.state.currentPin}
              likesCountCallback={(pinId) => this.incrementLikes(pinId)}
              commentCallback={()=> this.commentView}
              incrementLikes={(pinId) => this.incrementLikes(pinId)}
              heartFilledSrc={this.state.heart}
              pinButton={"Pin"}
              backButton={() => this.backButton()}
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

         <Route path="/scout" render={() => (
             this.state.isRevealed ? (
               <Redirect to="/scoutdetails"/>
             ) : (
               <AllPinsList
                 // likesCountCallback={this.likesCountCallback}
                 selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
                 detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
                 incrementLikes={(pinId) => this.incrementLikes(pinId)}
                 heartFilledSrc={this.state.heart}

              />
            )
          )}/>


          <Route path="/myscoutboard" render={() =>
              this.state.isRevealed ? (
                <Redirect to="/scoutdetails"/>
              ) : (
              <MyPinsList
              // likesCountCallback={this.likesCountCallback}
              selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
              detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
              incrementLikes={(pinId) => this.incrementLikes(pinId)}
              heartFilledSrc={this.state.heart}
              />
            )}
          />

        <Route path="/newuser" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/scout"/>
            ) : (
           <NewUserLogin loggedInCallback={this.onLoggedIn} />
           )
         )}
        />


        <Route path="/scoutlogin" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/scout"/>
            ) : (
            <ReturningUser
            loggedInCallback={this.onLoggedIn}
            nameCallback={(name) => this.nameCallback(name)}
            />
           )
         )}/>


       <Route path="/addscoutpin" render={() => (
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
