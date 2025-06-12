import React from 'react';
import Slider from 'react-slick';

const banners = [
  {
    img: '/banner1.webp',
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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    fade: true,
    pauseOnHover: true
  };

  return (
    <div className="mb-8 rounded-xl overflow-hidden shadow-md">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx}>
            <img
              src={banner.img}
              alt={banner.alt}
              className="w-full h-[230px] object-cover rounded-xl"
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;