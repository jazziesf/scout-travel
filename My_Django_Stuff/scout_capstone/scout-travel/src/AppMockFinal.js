import React, { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Details from  './component/Details'
import AllPinsList from './component/AllPins'
import NewPinForm from './component/NewPinForm'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isOpen: false,
        isRevealed: false,
        pinList: [],
        currentPin: undefined,
      };
  }

  componentDidMount() {
      axios.get(URL)
        .then((response) => {
          const pins = response.data.map((pin) => {
            const newPin = {
              ...pin,
              images: [],
              value: pin.value,
              location: pin.location,
              company: pin.company,
              user: pin.user,
              likes: 0,
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

    onDetailsPage = (pinId) => {
      const selectedPin = this.state.pinList.find((pin) => {
        return pin.id === pinId;
      });
      if (selectedPin) {
        this.setState({
          currentPin: selectedPin,
          isRevealed: true
        });
      }
    }

    addPin = (newPin) => {
        const apiPayload = {
          ...newPin,
          image: newPin.image,
          location: newPin.location,
          company: newPin.company,
          value: newPin.value,
        }
        axios.post(URL, apiPayload, { headers: { Authorization: `Token ${document.cookie}`}})
          .then((response) => {
            const myNewPin = response.data;

            myNewPin.images = [myNewPin.img];
            newPin.id = myNewPin.id

            const { pinList, masterList } =  this.state;
            newPin.id = myNewPin.id

            masterList.push(newPin);

            if (pinList !== masterList)
              pinList.push(newPin);

            this.stateState({
              pinList,
              masterList,
            });
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
      return (
        <div className="App">

        <Navbar
          // dropdown={() => this.toggleOpen()}
         />

         { this.state.isRevealed && <Details commentCallback={()=> this.commentView} />}

         { !this.state.isRevealed &&
           <AllPinsList
            detailsPageCallback={() => this.onDetailsPage()}
            pins={this.state.pinList}
          /> }

          <NewPinForm addPinCallback={this.addPin} />


          { !this.isRevealed &&
                 <AllPinsList
                  // likesCountCallback={this.likesCountCallback}
                  selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
                  detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
                /> }


            // <Route path="/myscoutlist"
            //   render={() =>
                 //  <MyPinsList
                 //   // likesCountCallback={this.likesCountCallback}
                 //   selectPinCallback={(pinId) => this.onSelectPin(pinId)} //check APPMOCKFINAL this one should work with pin.id
                 //   detailsPageCallback={this.detailsPageCallback} //this may not work beacuse you need an id
                 // />
               // }
            // />

            // <Route path="/addscoutpin"
              // render={() =>
                // <NewPinForm addPinCallback={this.addPin} />
                // />

        </div>
      );
    }
  }

  export default App;
