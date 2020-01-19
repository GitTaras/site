import React from 'react';
import images from '../../constants/images';
import './Carousel.sass';

const CarouselCustomers = () => (
  <div id="CarouselCustomers" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">

      <div className="carousel-item active">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar1} alt="avatar1" className="row avatarCustomer"/>
            <span className="row textCustomer">
                This was a great way to get a name nailed down. I will definitely be using
               this service again and recommend! I'm so overwhelmed with the amazing entries and the
               step-by-step process made things so go very smoothly
            </span>
            <span className="row signature">remad24</span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar2} alt="avatar2" className="row avatarCustomer"/>
            <span className="row textCustomer">
              This has been an awesome experience. I like how Squadhelp kept me engaged and offered assistance and hints throughout
              the entire competition. The names submitted were very inventive and creative... I've been very impressed,
              from start to finish. Thanks so much.
            </span>
            <span className="row signature">James Lunny</span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar3} alt="avatar3" className="row avatarCustomer"/>
            <span className="row textCustomer">
              It was great to run the contest. I achieved  by far more than I expected. The platform is easy to use.
              A lot of starting entrepreneurs believe that the know more than anyone else about their business. Those ones have
              noclue how higher they can reach using brainstorming.
              I would definitely recommend Squadhelp to anyone starting a business.
            </span>
            <span className="row signature">Ely Marcio</span>
          </div>
        </div>
      </div>

      <div className="carousel-item">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar1} alt="avatar1" className="row avatarCustomer"/>
            <span className="row textCustomer">
                This was a great way to get a name nailed down. I will definitely be using
               this service again and recommend! I'm so overwhelmed with the amazing entries and the
               step-by-step process made things so go very smoothly
            </span>
            <span className="row signature">remad24</span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar2} alt="avatar2" className="row avatarCustomer"/>
            <span className="row textCustomer">
              This has been an awesome experience. I like how Squadhelp kept me engaged and offered assistance and hints throughout
              the entire competition. The names submitted were very inventive and creative... I've been very impressed,
              from start to finish. Thanks so much.
            </span>
            <span className="row signature">James Lunny</span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 cardCustomer">
            <img src={images.avatar3} alt="avatar3" className="row avatarCustomer"/>
            <span className="row textCustomer">
              It was great to run the contest. I achieved  by far more than I expected. The platform is easy to use.
              A lot of starting entrepreneurs believe that the know more than anyone else about their business. Those ones have
              noclue how higher they can reach using brainstorming.
              I would definitely recommend Squadhelp to anyone starting a business.
            </span>
            <span className="row signature">Ely Marcio</span>
          </div>
        </div>
      </div>
    </div>
    <a className="carousel-control-prev" href="#CarouselCustomers" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"/>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#CarouselCustomers" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default CarouselCustomers;
