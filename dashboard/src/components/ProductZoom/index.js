import React, { useContext, useRef } from 'react';
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import modal2 from '../../assets/images/modal_2.jpeg';
import vid from '../../assets/vid/vid.mp4'; // Ton fichier vidéo

const ProductZoom = (props) => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  var setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: true
  };

  var setting2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  return (
    <>
      <div className="productZomm">
        <div className="position-relative productZoom">
          <div className='badge badge-primary'>
            {props?.discount}
          </div>

          <Slider
            {...setting2}
            className='zoomSliderBig'
            ref={zoomSliderBig}
          >

            {
              props?.images?.map((img, index) => {
                return (
                  <swiperSlide key={index} >
                    <div className="item_item">
                      <InnerImageZoom
                        zoomType='hover' zoomScale={1.5}
                        src={img}
                      />
                    </div>
                  </swiperSlide>
                )
              })
            }

            <swiperSlide>
              <div className="img_item">
                <video autoPlay muted className="w-100 p-1 rounded-simple" style={{ maxHeight: '350px' }}>
                  <source src={vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </swiperSlide>


            {/* <>
            <div className="item_item">
                            <InnerImageZoom
                              zoomType='hover' zoomScale={1.5}
                              src={modal1}
                            />
                          </div>
                          <div className="item_item">
                            <InnerImageZoom
                              zoomType='hover' zoomScale={1.5}
                              src={modal1}
                            />
                          </div>
                          <div className="img_item">
                            <video autoPlay muted className="w-100 p-1 rounded-simple" style={{ maxHeight: '350px' }}>
                              <source src={vid} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
            </> */}


          </Slider>
        </div>

        <Slider {...setting} className='zoomSlider' ref={zoomSlider}>
        {
              props?.images?.map((img, index) => {
                return (
                  <div className='item' key={index} >
                  <img src={img} className='w-100' onClick={() => goto(index)} />
                </div>
                )
              })
            }

          <div className='item HoverVid'>
            <img src={modal2} className='w-100' onClick={() => goto(2)} />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default ProductZoom;
