import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useState } from "react"
import { useEffect } from "react"



const PopularModels = (props) => {


    const Colors = ['#ecec', '#d963', '#ffffff'];
    const [Data, setData] = useState([]);

    useEffect(() => {
        const updatedData = props.ChosenProducts.map((item, index) => ({
            ...item,
            color: Colors[index % Colors.length],
        }));

        setData(updatedData);
    }, [props.ChosenProducts]);




    return (
        <>
            <div className="product_row w-100 mt-4" >


                <Swiper
                    modules={[Autoplay ]}
                    spaceBetween={20}
                    slidesPerView={Math.min(Data?.length || 0, 2)}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 1.4, 
                            spaceBetween: 10,  
                        },
                        601: {
                            slidesPerView: Math.min(Data?.length || 0, 2), 
                            spaceBetween: 20, 
                        },
                    }}
                >
                    {
                        Data?.length &&
                        Data?.map((model, index) => {
                            return (
                                <>

                                        <SwiperSlide key={index} > 
                                        <a href="/cat">

                                            <div className='ModelItem d-flex align-items-stretch  ' style={{ backgroundColor: model.color }} >
                                                <div className="ModelImg">
                                                    <img className='w-100' src={model.images[0]} />
                                                </div>
                                                <div className="brandname" >
                                                    <span>{model.name}</span>
                                                </div>
                                            </div>
                                            </a>

                                        </SwiperSlide>

                                </>
                            )
                        })}
                </Swiper>
            </div>
        </>
    );
}

export default PopularModels;
