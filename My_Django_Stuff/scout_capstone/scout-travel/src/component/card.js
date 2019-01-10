import React from 'react';
import './card.css'
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <div className="body">
      <div className="row">

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive" key={1}>
          <div className="container">
            <img src="http://www.thavornpalmbeach.com/news/wp-content/uploads/2017/10/coffee.jpg" alt="Snow" />
            <sub className="bottom-left">Seattle, WA</sub>
            <button className="top-right btn btn-danger">Pin</button>
          </div>
          <div className="icons">
            <img src={props.heartFilledSrc} alt="Snow" className="heart" onClick={props.likesCountCallback}/>
            <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="Snow" className="comment" />
            <img src="https://image.flaticon.com/icons/svg/684/684809.svg" alt="Snow" className="map" />
            <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="Snow" className="details" onClick={props.detailsButton}/>
          </div>
          <p className="likes">{props.numberLikes} likes</p>
          <p className="location">Storyville Coffee Roasters</p>
          <p className="user">Posted by @Wanderlust</p>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <div className="container">
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/10/f0/9b/c4/smashes-avo-freak-shakes.jpg" alt="Snow" onClick={props.likesCountCallback} />
            <sub className="bottom-left">San Francisco, CA</sub>
            <button className="top-right btn btn-danger">Pin</button>
          </div>
          <div className="icons">
          <img src="https://image.flaticon.com/icons/svg/126/126471.svg" alt="Snow" className="heart" />
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="Snow" className="comment" />
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="Snow" className="details" onClick={props.detailsButton}/>
          </div>
          <p className="likes">{props.numberLikes} likes</p>
          <p className="location">Bongo's Cuban Cafe</p>
          <p className="user">Posted by @Red</p>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <div className="container">
            <img src="https://assets3.thrillist.com/v1/image/1663334/size/tmg-article_default_mobile.jpg" alt="Snow" />
            <sub className="bottom-left">Portland, OR</sub>
            <button className="top-right btn btn-danger">Pin</button>
          </div>
          <div className="icons">
          <img src="https://image.flaticon.com/icons/svg/126/126471.svg" alt="Snow" className="heart" />
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="Snow" className="comment" />
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="Snow" className="details"/>
          </div>
          <p className="likes">15 likes</p>
          <p className="location">Tilly's Restauarnt</p>
          <p className="user">Posted by @BigSexy</p>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <div className="container">
            <img src="https://1.bp.blogspot.com/-HHa3tb5UWko/WBSj5-5TqxI/AAAAAAAAOJ4/IghQthJJEVclfB5mHuaxzMSMzDOJTMZ-ACLcB/s1600/DSC05622.JPG" alt="Snow" />
            <sub className="bottom-left">Oakland, CA</sub>
            <button className="top-right btn btn-danger">Pin</button>
          </div>
          <div className="icons">
          <img src="https://image.flaticon.com/icons/svg/126/126471.svg" alt="Snow" className="heart" />
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="Snow" className="comment" />
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="Snow" className="details"/>
          </div>
          <p className="likes">15 likes</p>
          <p className="location">Firebread</p>
          <p className="user">Posted by @BlackNGreen</p>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <div className="container">
            <img src="https://cdn-images-1.medium.com/max/1600/0*3x4g7aA6CS5wJzLq.jpg" alt="Snow" />
            <sub className="bottom-left">Portland, OR</sub>
            <button className="top-right btn btn-danger">Pin</button>
          </div>
          <div className="icons">
          <img src="https://image.flaticon.com/icons/svg/126/126471.svg" alt="Snow" className="heart" />
          <img src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="Snow" className="comment" />
          <img src="https://image.flaticon.com/icons/svg/149/149403.svg" alt="Snow" className="details"/>
          </div>
          <p className="likes">15 likes</p>
          <p className="location">Andinas</p>
          <p className="user">Posted by @Griff</p>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <img src="https://assets3.thrillist.com/v1/image/1396678/size/tmg-article_tall;jpeg_quality=20.jpg" alt="stock"/>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <img src="http://lurkingfish.com/wp-content/uploads/2018/06/modern-cafe-interior-design-concepts-for-elegant-look-unique-decoration-amazing-decor-style-taigamedh.jpg" alt="stock"/>
        </div>

        <div className="col-12 col-lg-4 col-sm-6 img-fluid img-responsive">
          <img src="https://i.pinimg.com/736x/78/3c/74/783c746373f6eb9c6e1e766d2db442c2--rooftop-bar-roof-top.jpg" alt="stock"/>
        </div>


      </div>
    </div>
      )
    }

Card.propTypes = {
  id: PropTypes.number,
  detailsButton: PropTypes.func,
  likesCount: PropTypes.number,
  numberLikes: PropTypes.number,
  heartFilledSrc: PropTypes.string,
}

export default Card;
