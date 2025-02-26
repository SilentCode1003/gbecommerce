import React from "react";
import { Carousel } from "antd";
import { HeroTextContainer, HeroContainerStyle } from "../css/GeneralInterface";

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero4.jpg";
import hero5 from "../assets/images/testhero.jpg";

const images = [hero1, hero2, hero3, hero4, hero5];

function CarouselComponent() {
  return (
    <Carousel
      arrows
      infinite
      autoplay
      autoplaySpeed={3000}
      className="bg-[#f5443e] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      {images.map((image, index) => (
        <div key={index} className="relative w-full">
          <div
            className="w-full bg-center bg-cover flex items-center justify-center aspect-[1471/471] 
              h-[180px] xs:h-[150px] sm:h-[200px] md:h-[300px] lg:h-[380px] xl:h-[550px]"
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Display text only on the last slide */}
            {index === images.length - 1 && (
              <div className={`absolute ${HeroTextContainer} text-center`} style={HeroContainerStyle}>
                <h1 className="text-white font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  UNLOCKING SOLUTIONS AT ITS BEST
                </h1>
                <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  Embark on a journey of limitless innovation and excellence with us.
                </p>
                <button className="mt-4 px-6 py-2 sm:px-8 sm:py-3 bg-white text-red-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
