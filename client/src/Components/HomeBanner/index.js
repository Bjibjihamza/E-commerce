
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination ,Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


SwiperCore.use([Navigation, Pagination]);

const HomeBanner = (props) => {

  const [isOpenSidebarVal, setisopenSidebarVal] = useState(true);

  return (
    <>
    <section>

      <div className="HomeBannerSection">
    

          <div className=" container banner-section w-100">
            <Swiper
                     modules={[Autoplay, Pagination, Navigation]}
                     spaceBetween={40}
                     slidesPerView={1}
                     centeredSlides={true}
                    //  navigation={true}
                     autoplay={{
                         delay: 10000,
                         disableOnInteraction: false,
                     }}
                     pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        type: 'bullets',  
                        bulletClass: 'custom-bullet', 
                        bulletActiveClass: 'custom-bullet-active',
                      }}
                        loop={true}
            >
              {
              props?.data?.length !== 0 &&
              props?.data?.map((banner, index) => (
                <SwiperSlide key={index}>
                <div className='banner-bg pt-3 pr-2 pl-2' >
                    <img src={banner.images} className='w-100' />
                </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
            </section>

    </>
  );
};

export default HomeBanner;

