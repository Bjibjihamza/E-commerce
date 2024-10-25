import HomeBanner from "../../Components/HomeBanner";
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useState, useEffect, useContext } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import CategorieItem from "../../Components/CategorieItem";
import PopularProduct from "../../Components/PopularProduct"
import PopularModels from "../../Components/PopularModels";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductItem from "../../Components/ProductItem";







const Home = () => {

    const context = useContext(MyContext);


    const [featuredProducts, setFeaturedProducts] = useState([])
    const [PopulairProducts, setPopulairProducts] = useState([])
    const [productsData, setProductsData] = useState([])
    const [AllCategories, setAllCategories] = useState([])
    const [selectedCat, setSelectedCat] = useState(context.activeCat)
    const [filterData, setFilterData] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [brand, setbrand] = useState([])
    const [homeSlides, setHomeSlides] = useState([])

    useEffect(() => {
        context.setisHeaderFooterShow(true);

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token !== null && token !== undefined && token !== null) {
          context.setisLogin(true);
        } else {
          context.setisLogin(false)
        }
      }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selectCat = (cat) => {
        setSelectedCat(cat)
    }


    useEffect(() => {
        window.scrollTo(0, 0);

        fetchDataFromApi(`/api/product/featured`).then((res) => {
            setFeaturedProducts(res)
        })

        fetchDataFromApi(`/api/product/populair`).then((res) => {
            setPopulairProducts(res)
        })

        fetchDataFromApi(`/api/product`).then((res) => {
            setProductsData(res)
        })

        fetchDataFromApi(`/api/product/latest`).then((res) => {
            setNewProducts(res)
        })

        fetchDataFromApi(`/api/brand`).then((res) => {
            setbrand(res.brandList)
        })

        fetchDataFromApi(`/api/category`).then((res) => {
            setAllCategories(res.categoryList)

        })

        fetchDataFromApi(`/api/homeBanner`).then((res) => {
            setHomeSlides(res)
        })

    }, [])


    useEffect(() => {

        fetchDataFromApi(`/api/product?catName=${selectedCat}`).then((res) => {
            setFilterData(res.products)
        })

    }, [selectedCat])


    return (

        <>
            {
                homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />
            }
            <section className="homeProducts pt-4" >
                <div className="">
                    <div className="productRow w-100">
                        <div className="d-flex align-items-center justify-content-between m-2 mt-5">
                            <div className="info w-100">
                                <h3 className="mb-0 hd">Popular Product</h3>
                                <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                            </div>
                            <a href="/cat">  <p> <Button className="viewAllBtn w-100 text-end" >
                                View All<IoIosArrowRoundForward /></Button> </p>
                            </a>
                        </div>

                        {
                            PopulairProducts?.length !== 0 && <PopularProduct ChosenProducts={PopulairProducts} />
                        }



                        <div className="d-flex align-items-start flex-column m-2 mt-5">
                            <div className="info w-100">
                                <h3 className="mb-0 hd">Decouvert Categories</h3>
                            </div>

                            <div className="ml-auto" >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    className="filterTabs"
                                >

                                    {
                                        context.categoryData?.map((item, index) => {
                                            return (
                                                <Tab className="item" label={item.name}
                                                    onClick={() => selectCat(item._id)}
                                                />
                                            )
                                        })
                                    }

                                </Tabs>


                            </div>

                        </div>

                        {
                            filterData?.length !== 0 &&

                            <section className="product_Listing_Page">
                            <div className="container">
                                <div className="productListing d-flex">
                                    <Swiper
                                        modules={[Autoplay, Navigation]}
                                        spaceBetween={20} 
                                        slidesPerView={4}  
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
                                                slidesPerView: Math.min(filterData?.length || 0, 4), 
                                                spaceBetween: 20, 
                                            },
                                        }}
                                    >
                                        {filterData?.map((item, index) => (
                                            <SwiperSlide  className="productSlide" key={index} style={{ maxWidth: '250px'}}>
                                                <ProductItem itemView={""} item={item} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </section>
                            
                            
                        }




                        <div className="d-flex align-items-center m-2 mt-5">
                            <div className="info w-100">
                                <h3 className="mb-0 hd" >LATEST PRODUC</h3>
                                <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                            </div>

                            <a href="/cat">  <Button className="viewAllBtn ml-auto" >View All<IoIosArrowRoundForward /></Button>    </a>
                        </div>


                        {
                            newProducts?.length !== 0 && <PopularProduct ChosenProducts={newProducts} />
                        }

                        <div className="d-flex align-items-center m-2 mt-5">
                            <div className="info w-100">
                                <h3 className="mb-0 hd" >Brands</h3>
                                <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                            </div>
                        </div>

                        {
                            brand?.length !== 0 && <PopularModels ChosenProducts={brand} />
                        }

                    </div>
                </div>
            </section>


            <section className="Categoriesec m-b2 mt-5" >
                <div className="container pt-5" >
                    <div className="d-flex align-items-center">
                        <div className="info w-100">
                            <h3 className="mb-0 hd" >ALL CATEGORIES</h3>
                            <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                        </div>
                    </div>

                    <div className="row CategoriesRow justify-content-center mt-4" >
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={20}
                            slidesPerView={Math.min(AllCategories?.length || 0, 2)}
                            centeredSlides={false}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="pt-3 pb-3"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 20,
                                },
                                601: {
                                    slidesPerView: Math.min(AllCategories?.length || 0, 2),
                                    spaceBetween: 20,
                                },
                            }}
                        >

                            {
                                AllCategories?.length &&
                                AllCategories?.map((item, index) => {
                                    return (
                                        <>
                                            <SwiperSlide key={index}>
                                                <a href="/cat">
                                                    <CategorieItem CatData={item} />
                                                </a>
                                            </SwiperSlide>

                                        </>)
                                })}
                        </Swiper>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;