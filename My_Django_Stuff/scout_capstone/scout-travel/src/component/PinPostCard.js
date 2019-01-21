import React from 'react';
import './PinPostCard.css'
import PropTypes from 'prop-types';


const PostCard = (props) => {
    return (
      // <div className="col-xs-12 col-md-4 col-sm-6 img-fluid img-responsive">
      <div >

        <div className="container">
          <img src={props.image} alt={props.business} />
          <sub className="bottom-left">{props.city}, {props.state}</sub>
          <button className={props.buttonType} onClick={props.pinToBoardCallback}>{props.pinButton}</button>
        </div>

        <div className="icons">
          <img src='https://image.flaticon.com/icons/svg/126/126471.svg' alt="like heart" className="heart" onClick={props.likesCountCallback}/>
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="comment" className="comment" onClick={props.commentCallback}/>
          <a href={`https://www.google.com/maps/search/?api=1&query=${props.business}+${props.city}+${props.state}`} target='_blank' rel='noreferrer noopener'><img src="https://image.flaticon.com/icons/svg/684/684809.svg" alt="comment" className="map"/></a>
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="details icon" className="details" onClick={props.detailsPageCallback}/>
        </div>
        <p className="likes">{props.likes} likes</p>
        <p className="dish">{props.dish}</p>
        <p className="location">{props.business}</p>

      </div>
    )
  }

  PostCard.propTypes = {
    id: PropTypes.number,
    pin: PropTypes.object,
    pinButton: PropTypes.string,
    heartFilledSrc: PropTypes.string,
    likes: PropTypes.number,
    commentCallback: PropTypes.func,
    detailsPageCallback: PropTypes.func,
    likesCountCallback: PropTypes.func,
    pinToBoardCallback: PropTypes.func,
    buttonType: PropTypes.string,
  }

export default PostCard;
