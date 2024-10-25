import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const PopularModels = (props) => {
    const [Data, setData] = useState(props.ChosenProducts);

    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setproductView] = useState("");
    const openDropdown = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={20} 
                            slidesPerView={Math.min(props.ChosenProducts?.length || 0, 4)}  
                            // navigation={true}
                            centeredSlides={false}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="pt-2 pb-3 w-100"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.5, 
                                    spaceBetween: 10,  
                                },
                                601: {
                                    slidesPerView: Math.min(props.ChosenProducts?.length || 0, 4), 
                                    spaceBetween: 20, 
                                },
                            }}
                        >
                            {props.ChosenProducts?.map((item, index) => (
                                <SwiperSlide  className="productSlide" key={index} style={{ maxWidth: '250px'}}>
                                    <ProductItem itemView={productView} item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PopularModels;
