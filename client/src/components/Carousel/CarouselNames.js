import React from 'react';
import images from "../../constants/images";

const CarouselNames = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className='row '>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.avanti} alt="avanti"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.onpoint} alt="onpoint"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.analytIQ} alt="analytIQ"/>
          </div>
        </div>
        <div className="carousel-item">
          <div className='row'>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.redWind} alt="redWind"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.quantic} alt="quantic"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.forwardFocused} alt="forwardFocused"/>
          </div>
        </div>
        <div className="carousel-item">
          <div className='row'>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.pawxie} alt="pawxie"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.infamiss} alt="infamiss"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 " src={images.styleRevolver} alt="styleRevolver"/>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
};

export default CarouselNames;

