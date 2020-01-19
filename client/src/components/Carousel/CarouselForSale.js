import React from 'react';
import images from "../../constants/images";
import './Carousel.sass';

const CarouselForSale = () => {
  return (
    <div id="CarouselForSale" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className='row'>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.exactly} alt="First slide"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.upzin} alt="quantic"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.galore} alt="First slide"/>
          </div>
        </div>
        <div className="carousel-item">
          <div className='row'>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.luckSt} alt="First slide"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.ready} alt="quantic"/>
            <img className="h-100 col-md-4 col-sm-4 col-4 img-fluid smallVersion" src={images.impurest} alt="First slide"/>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#CarouselForSale" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"/>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#CarouselForSale" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"/>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
};

export default CarouselForSale;
