import { Carousel } from "react-responsive-carousel";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        dynamicHeight={true}
      >
        <div>
          <img
            src="../travel-lady-home-bg.jpg"
            style={{ height: "100vh" }}
            alt="Adventure"
          />
          <p className="legend" style={{ fontSize: "15px" }}>
            THE ADVENTURE YOU HAVE
          </p>
        </div>
        <div>
          <img
            src="../home-bg.jpg"
            style={{ height: "100vh" }}
            alt="Adventure"
          />
          <h1 className="legend" style={{ fontSize: "15px" }}>
            It is better to travel well than to arrive.
          </h1>
        </div>
        <div>
          <img
            src="../travel-landscape-home-bg.jpg"
            style={{ height: "100vh" }}
            alt="Adventure"
          />
          <h1 className="legend" style={{ fontSize: "15px" }}>
            A mind that is stretched by a new experience can never go back to
            its old dimensions.
          </h1>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
