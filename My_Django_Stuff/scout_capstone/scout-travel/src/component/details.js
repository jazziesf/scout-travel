import React, { Component } from 'react';
import './details.css'
import PropTypes from 'prop-types';
import axios from 'axios';

class Details extends Component {
      constructor(props) {
        super(props);

        this.state = {
          likesCount: [],
          liked: false,
          pinList: [],
          masterList: [],
        }
      }

    incrementLikes = (pinId) => {
      const { pinList } = this.state
      const url = `http://127.0.0.1:8000/api/pin/pin/${pinId.id}/`

        this.setState({
          pinList: pinList,
        });

      pinId.likes += 1
      const apiPayload = {
        likes: pinId.likes
      }

      axios.patch(url, apiPayload, { headers: { Authorization: `Token ${document.cookie}`}})
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
  return (
    <div className="details-container">
      <div className="container fixed">
        <div className="row">
          <div className="col-12 col-md-6 img-fluid img-responsive">
            <img src={this.props.pinSelected.image} alt="Snow" className="image-fix"/>
           <button className="top-right btn btn-danger pin">Pin</button>
          </div>
          <div className="col-12 col-md-6">
            <div className="container">
              <p className="dish-detail">{this.props.pinSelected.dish}</p>
              <p className="restuarnt">{this.props.pinSelected.business}</p>

              <p className="city">{this.props.pinSelected.city}, {this.props.pinSelected.state} </p>

              <div className="icons-details" >
                <img src={this.props.heartFilledSrc} alt="like button" className="heart" onClick={() => this.incrementLikes(this.props.pinSelected)}/>
                <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="comment box" className="comment" onClick={this.props.commentCallback} />
                <p className="user detail-user">Posted by @{this.props.pinSelected.user.name}</p>
              </div>
                <p className="likes-details">{this.props.pinSelected.likes} likes</p>
              <div className="scroll">
                <p className="description">{this.props.pinSelected.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}



Details.propTypes = {
  likesCountCallback: PropTypes.func,
  commentCallback: PropTypes.func,
  pinSelected: PropTypes.object,
  heartFilledSrc: PropTypes.string,
}


export default Details;
