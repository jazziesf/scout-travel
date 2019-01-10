import React from 'react';
import './details.css'
import PropTypes from 'prop-types';

const Details = (props) => {
  return (
    <div className="details-container">

      <div className="container fixed">
        <div className="pin">
          <button className="top-right btn btn-danger pin">Pin</button>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 img-fluid img-responsive">
            <img src={props.pinSelected.image} alt="Snow" className="image-fix"/>
          </div>
          <div className="col-12 col-md-6">
            <div className="container">
              <p className="restuarnt">{props.pinSelected.business}</p>

              <p className="city">{props.pinSelected.city}, {props.pinSelected.state} </p>

              <div className="icons-details" >
              {/* // this.props.likesCountCallback(props.pinSelected.id) */}

                <img src={props.heartFilledSrc} alt="like button" className="heart" onClick={props.likesCountCallback}/>
                <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="comment box" className="comment" onClick={props.commentCallback} />
                <img src="https://image.flaticon.com/icons/svg/684/684809.svg" alt="Snow" className="map" />
                <p className="user detail-user">Posted by @{props.pinSelected.user}</p>
              {/*  <p className="user detail-user">@{props.pinSelected.username}</p> */}

              </div>
                <p className="likes-details">{props.pinSelected.likes} likes</p>
            {/*  <p className="likes-details">{props.pinSelected.numberLikes}15 likes</p> */}
              <div className="scroll">
                <p className="description">{props.pinSelected.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

Details.propTypes = {
  // likesCountCallback: PropTypes.func,
  commentCallback: PropTypes.func,
  pinSelected: PropTypes.object,
  heartFilledSrc: PropTypes.string,
}


export default Details;
