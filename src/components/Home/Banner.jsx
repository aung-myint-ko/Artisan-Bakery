import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

function Banner(props) {
  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <LazyLoadImage
            className="hidden md:block"
            src="/images/lp-banner1.jpg"
            alt=""
          />
          <LazyLoadImage
            className="block md:hidden"
            src="/images/mb-banner1.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoadImage
            className="hidden md:block"
            src="/images/lp-banner2.jpg"
            alt=""
          />
          <LazyLoadImage
            className="block md:hidden"
            src="/images/mb-banner2.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoadImage
            className="hidden md:block"
            src="/images/lp-banner3.jpg"
            alt=""
          />
          <LazyLoadImage
            className="block md:hidden"
            src="/images/mb-banner3.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoadImage
            className="hidden md:block"
            src="/images/lp-banner4.jpg"
            alt=""
          />
          <LazyLoadImage
            className="block md:hidden"
            src="/images/mb-banner4.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoadImage
            className="hidden md:block"
            src="/images/lp-banner5.jpg"
            alt=""
          />
          <LazyLoadImage
            className="block md:hidden"
            src="/images/mb-banner5.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
