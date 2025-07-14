import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/chart1.jpg",
  "/chart2.jpg",
  "/chart3.jpg",
  "/chart4.jpg",
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black"
  >
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black"
  >
    <FaChevronRight />
  </button>
);

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="w-full md:w-4/5 mx-auto overflow-hidden rounded-xl">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            className="h-[90vh] md:h-[70vh] flex justify-center items-center bg-black rounded-xl"
          >
            <div className="w-full h-full aspect-[16/9] rounded-xl overflow-hidden">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
