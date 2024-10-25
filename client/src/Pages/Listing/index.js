import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from 'react-icons/tfi';
import { FaAngleDown } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import ProductItem from "../../Components/ProductItem";
import Sidebar from "../../Components/Sidebar";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';
import OutOfStock from '../../assets/images/out-of-stock.png'
import SidebarM from '../../Components/SidebarM'



const Listing = (props) => {


    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setproductView] = useState('one')
    const openDropdown = Boolean(anchorEl);
    const [allProduct, setAllProduct] = useState([]);


    const context = useContext(MyContext);

    const { id } = useParams()


    useEffect(() => {
        window.scrollTo(0, 0);

        const apiUrl = buildApiUrl();

        fetchDataFromApi(apiUrl)
            .then((res) => {
                if (res && res.products) {
                    setAllProduct(res.products);
                } else {
                    setAllProduct([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setAllProduct([]);
            });
    }, [props.sexfiltrage, props.classfiltrage]);

    const buildApiUrl = (catId = '', brandId = '') => {
        let apiUrl = `/api/product`;

        const queryParams = [];

        if (catId) queryParams.push(`catName=${catId}`);
        if (brandId) queryParams.push(`brandName=${brandId}`);
        if (props.sexfiltrage) queryParams.push(`sex=${props.sexfiltrage}`);

        // Handle multiple classes in the 'classfiltrage' array
        if (Array.isArray(props.classfiltrage) && props.classfiltrage.length > 0) {
            props.classfiltrage.forEach((classItem) => {
                queryParams.push(`class=${classItem}`);
            });
        } else if (props.classfiltrage) {
            queryParams.push(`class=${props.classfiltrage}`);
        }

        if (queryParams.length > 0) {
            apiUrl += `?${queryParams.join('&')}`;
        }

        return apiUrl;
    };

    const filterData = (catId, brandId) => {
        const apiUrl = buildApiUrl(catId, brandId);

        fetchDataFromApi(apiUrl)
            .then((res) => {
                if (res && res.products) {
                    setAllProduct(res.products);
                } else {
                    setAllProduct([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setAllProduct([]);
            });
    };








    return (
        <>
            <section className="product_Listing_Page mt-5 mb-4">
                <div className='container container_mx' >
                    <div className="row m-0" >
                        <div className="col-md-3" >



                            <Sidebar   filterData={filterData} catData={context.categoryData} brandData={context.brandData} />


                        </div>
                        
                        <div className="col-md-9 p-1" >
                            <div className="info d-flex align-items-center flex-column w-100 text-center mt-5 mb-3">
                                <h3 className="mb-0 hd" >{props.title ? props.title : "All products"}</h3>
                                <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                            </div>


                                    <div className="container" >
                                        <div className="productListing">
                                            <div className="showBy d-flex align-items-center row" >

                                                <div className='pc' >
                                                <div className="d-flex align-items-center btnWrapper" >
                                                    <Button className={productView === 'one' && 'act'} onClick={() => setproductView('one')}  ><IoIosMenu /></Button>
                                                    <Button className={productView === 'two' && 'act'} onClick={() => setproductView('two')}  ><HiViewGrid /></Button>
                                                    <Button className={productView === 'three' && 'act'} onClick={() => setproductView('three')}  ><TfiLayoutGrid4Alt /></Button>
                                                    <Button className={productView === 'four' && 'act'} onClick={() => setproductView('four')}  ><CgMenuGridR /></Button>
                                                </div>
                                                </div>

                                                <div className='mobile' >
                                                <div className="d-flex align-items-center btnWrapper" >
                                                <Button className={productView === 'one' && 'act'} onClick={() => setproductView('one')}  ><IoIosMenu /></Button>
                                                <Button className={productView === 'two' && 'act'} onClick={() => setproductView('two')}  ><HiViewGrid /></Button>
                                                </div>

                                                </div>


                                                <div className="showByFilter" >
                                                    <SidebarM  filterData={filterData} catData={context.categoryData} brandData={context.brandData} />
                                                </div>

                                            </div>

                                            <div className="productListing w-100" >
                                                {
                                                    allProduct.length !== 0 ? allProduct?.map((item, index) => {
                                                        return (
                                                            <ProductItem key={index} itemView={productView} item={item} />
                                                        )

                                                    }) :                                     
                                                    <img src={OutOfStock} className='w-100 OutImg' />
                                                }

                                            </div>
                                        </div>
                                    </div>


                            

                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default Listing;









