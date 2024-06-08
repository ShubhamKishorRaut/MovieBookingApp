import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import './styles.css'
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function HomeSlider() {

    const[banners,setBanners] = useState([
        {
            imgUrl:'https://assets-in.bmscdn.com/promotions/cms/creatives/1717482723672_homweb.jpg'
        },
        {
            imgUrl:'https://assets-in.bmscdn.com/promotions/cms/creatives/1717507558437_kailashkher1240x300.jpg'
        },
        {
            imgUrl:'https://assets-in.bmscdn.com/promotions/cms/creatives/1717507558437_kailashkher1240x300.jpg'
        },
    ])

    const width = window.innerWidth;
    const height = window.innerHeight
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {
            banners.map((banner,index) =>{
                return(
                    <SwiperSlide key={index}>
                        <Image src={banner.imgUrl} alt="" width={width} height={height/2}
                            style={{
                                objectFit:"cover"
                            }}/>
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </>
  );
}
