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
import NavbarGuest from './component/NavbarGuest'

import Splash from './component/Splash'
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
      results: false
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
            isActive: false,
            isOpen: false,
            results: false,
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
          results: true,
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
    if (document.cookie !== '') {
    // userId = window.localStorage.setItem('id', response.data.id)
      this.setState({
        loggedIn: true,
      })
    }
  }

  logOut = () => {
    localStorage.clear()
    document.cookie = ''
    this.setState({
      loggedIn: false,
      isRevealed: false,
    })
  }

  onSuccessfulRequest = () => {
    this.setState({
      successfulRequest: true,
    })
    console.log(this.state.successfulRequest)
  }


  viewBoard = () => {
    this.setState({
      isRevealed: false,
      isActive: false,
      isOpen: false,
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
    if(event.charCode === 13 ){
    console.log('enter press here! ')
    }
    event.preventDefault();
    const { query } = this.state;

    if ( query === '') return;

    this.onSearch(query);
    this.setState({
      isRevealed: false,
    })
    this.resetState();
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
        { document.cookie !== '' ? (
          <Navbar
          hamburgerMenu={() => this.toggleHamburgerMenu()}
          collapseNavbar={show}
          dropdown={(event) => this.toggleDropdown(event)}
          dropdownClassName={dropdown1}
          dropdownShow={dropdown2}
          expandDropdown={dropdown3}
          closeNav={(event) => this.closeNavBar(event)}
          viewBoard={() => this.viewBoard()}
          logout={<Link to="/splash" onClick={this.logOut}>Log-Out</Link>}
          myScoutList={<Link to="/mynosherboard" onClick={() => this.viewBoard()}>My Nosher Board</Link>}
          linkAddPin={<Link to="/addnosherpin">Post to Nosher</Link>}
          searchQuery={this.onSubmit}
          searchQueryonChange={this.onFormChange}
          searchQueryValue={this.state.query}
          searchLink={<Link to="/searchresults" className="btn-outline-danger my-2 my-sm-0 searchBtn" onClick={() => this.viewBoard()}>Search</Link>}
          />
          ) : (
          <NavbarGuest
          dropdown={(event) => this.toggleDropdown(event)}
          hamburgerMenu={() => this.toggleHamburgerMenu()}
          collapseNavbar={show}
          signUp={<Link to="/noshernewuser">Nosh Ambassador Sign-Up</Link>}
          login={<Link to="/nosherlogin" >Log-In</Link>}
          />
        )}


          <Route path="/searchresults" render={() => (
              this.state.isRevealed ? (
                <Redirect to="/nosherdetails"/>
              ) : (
              this.state.results ? (
                <StackGrid columnWidth={400} >
                   {pinList}
                 </StackGrid>
               ) : (
                <div className='center'>
                 <p className='search-results'>Look's Like there are places to be discovered. Be the first to Scout this Area!</p>
                </div>
               )
             )
           )}/>

        <Route path="/nosherdetails"
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

         <Route path="/nosher" render={() => (
             this.state.isRevealed ? (
               <Redirect to="/nosherdetails"/>
             ) : (
               <div>
               <AllPinsList
                 // likesCountCallback={this.likesCountCallback}
                 selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
                 detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
                 incrementLikes={(pinId) => this.incrementLikes(pinId)}
                 heartFilledSrc={this.state.heart}

              />
              </div>

            )
          )}/>

         <Route path="/splash"
            render={() => (  <Splash /> ) } />



          <Route path="/mynosherboard" render={() =>
              this.state.isRevealed ? (
                <Redirect to="/nosherdetails"/>
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

          <Route path="/noshernewuser" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/nosher"/>
              ) : (
              <Splash >
              <NewUserLogin loggedInCallback={this.onLoggedIn} />
              </Splash >
             )
           )}
          />


        <Route path="/nosherlogin" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/nosher"/>
            ) : (
            <Splash >
              <ReturningUser
              loggedInCallback={this.onLoggedIn}
              nameCallback={(name) => this.nameCallback(name)}
              />
            </Splash >
           )
         )}/>


       <Route path="/addnosherpin" render={() => (
           this.state.successfulRequest ? (
             <Redirect to="/nosher"/>
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
