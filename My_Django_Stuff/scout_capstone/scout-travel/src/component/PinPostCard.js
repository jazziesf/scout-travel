import React from 'react';
import './PinPostCard.css'
import PropTypes from 'prop-types';


const PostCard = (props) => {

    return (
      <div className="col-xs-12 col-md-4 col-sm-6 img-fluid img-responsive">
        <div className="container">
          <img src={props.image} alt={props.business} />
          <sub className="bottom-left">{props.city}, {props.state}</sub>
          <button className="top-right btn btn-danger" onClick={props.pinToBoardCallback}>Pin</button>
        </div>

        <div className="icons">
          <img src={props.heartFilledSrc} alt="like heart" className="heart" onClick={props.likesCountCallback}/>
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="comment" className="comment" onClick={props.commentCallback}/>
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="details icon" className="details" onClick={props.detailsPageCallback}/>
        </div>
        <p className="likes">{props.likes} likes</p>
        <p className="location">{props.business}</p>
        <p className="user">Posted by @{props.user}</p>
      </div>
    )
  }

  PostCard.propTypes = {
    id: PropTypes.number,
    pin: PropTypes.object,
    // image: PropTypes.string,
    // company: PropTypes.string,
    // name: PropTypes.string,
    // city: PropTypes.string,
    // state: PropTypes.string,
    heartFilledSrc: PropTypes.string,
    likes: PropTypes.number,
    commentCallback: PropTypes.func,
    detailsPageCallback: PropTypes.func,
    likesCountCallback: PropTypes.func,
    pinToBoardCallback: PropTypes.func,
  }

export default PostCard;
