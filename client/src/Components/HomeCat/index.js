import React, { useState } from 'react';
import {Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import breiting from '../../assets/images/breiting.png'
import Blancpain from '../../assets/images/Blancpain.png'



const homeCat = () => {

    // const [ItemBg , setItemBg] = useState([
    //     '#ffceb',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',
    //     '#fffceb',
    //     '#ecffec',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',
    //     '#fffceb',
    //     '#ecffec',
    // ]);

    return(
        <>
            <section className="cs m-auto" >
                <div className="container" >
                    <h3 className='mb-4 hd'>Featured Marques</h3>
                <Swiper 
                                slidesPerView={10}
                                spaceBetween={8}
                                navigation ={true}
                                slidesPerGroup = {3}
                                modules={[Navigation]}
                                className="mySwiper">
                    
                    {/* {
                        ItemBg?.map((item,index) => {
                            return(

                            )
                        })
                    } */}

                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#FEEFEA'}}>
                                    <img src={breiting} />
                                    <h6>breiting</h6>   
                                </div>    
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#ebfeea'}}>
                                    <img src={cartier} />
                                    <h6>cartier</h6>   
                                </div>    
                            </SwiperSlide> 
                            <SwiperSlide>
                                <div className="item text-center cursor" style={{background:'#F4F6FA'}}>
                                    <img src={Blancpain}/>
                                    <h6>Blancpain</h6>   
                                </div>    
                            </SwiperSlide>


                </Swiper>
                </div>
            </section>
        </>
    )
}

export default homeCat;