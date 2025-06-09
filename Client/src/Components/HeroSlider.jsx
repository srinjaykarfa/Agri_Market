import React from 'react';
import Slider from 'react-slick';

// Put your banner images in the public folder or import them
const banners = [
  {
    img: '/banner1.webp', // You can replace with your own images
    alt: 'Banner 1',
  },
  {
    img: '/banner2.webp',
    alt: 'Banner 2',
  },
  {
    img: '/banner3.webp',
    alt: 'Banner 3',
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx}>
            <img
              src={banner.img}
              alt={banner.alt}
              className="w-full h-[240px] object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;