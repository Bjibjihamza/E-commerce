import React, { useContext, useRef, useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import QuantityBox from '../QuantityBox';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MyContext } from '../../App';
import ProductZoom from '../ProductZoom';
import { postData_v2, deletData, fetchDataFromApi } from '../../utils/api';
import { BsCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";











const ProductModal = (props) => {

    const context = useContext(MyContext)

    let [productQuantity, setProductQuantity] = useState(1);
    const [changeQuantity, setChangeQuantity] = useState(0)
    let [cartFields, setCartFields] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [isAddedToMyList, setAddedToMyList] = useState(false)

    const [expanded, setExpanded] = useState('');
    const history = useNavigate();



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [openBuy, setOpenBuy] = React.useState(false);
    const handleOpenBuy = () => setOpenBuy(true);
    const handleCloseBuy = () => {
        setOpenBuy(false);
    }



    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };





    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        fetchDataFromApi(`/api/my-list?productId=${props?.data?._id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setAddedToMyList(true)
            }
        })
    }, [isAddedToMyList])





    const quantity = (val) => {
        setProductQuantity(val)
        setChangeQuantity(val)
    }

    const addtoCart = (quantity) => {
        if (!quantity) {
            alert("Please select a valid quantity.");
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        if (user !== undefined && user !== null && user !== "") {

            const data = props?.data;

            cartFields = {
                productTitle: data?.name,
                image: data?.images[0],
                rating: data?.rating,
                price: data?.price,
                quantity,
                subTotal: parseInt(data?.price * quantity),
                productId: data?._id,
                userId: user?.userId,
            };

            context.addToCart(cartFields);
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "please Login first"
            });
            context.setisOpenProductModal(true)
            history("/signIn")

        }
    };





    const BuyNow = (id) => {

        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== undefined && user !== null && user !== "") {
            history(`/product/${id}`, { state: { quantity: productQuantity } });
            context.setisOpenProductModal(false)
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "please Login first"
            });

        }
    }


        const selectedItem = () => {

        }



        return (
            <>
                <Dialog open={true} className="productModal" onClose={() => context.setisOpenProductModal(false)}
                    scroll="paper">
                    <Button onClick={() => context.setisOpenProductModal(false)} className='close_'><MdCloseFullscreen /></Button>

                    <div>
                        <div className="row mt-2 productDetailModam pt-3" >
                            <div className="col-md-5" >
                                <div className='zoom-div' >
                                    <ProductZoom images={props?.data?.images} discount={props?.data?.discount} />
                                </div>
                            </div>

                            <div className="col-md-7 p-2" >
                                <div className="d-flex  align-items-center justify-content-between">
                                    <div className='d-flex info align-items-baseline mb-2 mt-2'>
                                        <span className="mr-3 savePrice" >-{((props?.data?.price / props?.data?.oldPrice) * 100).toFixed(0)}%</span>
                                        <span className="netPrice fs-2">  {props?.data?.price}<span className='fs-6 ml-1' >MAD</span></span>
                                        <span className="oldPrice  ml-2"> {props?.data?.oldPrice} MAD </span>
                                    </div>

                                    <div className='d-flex align-items-center actions abs' >
                                        <span className='' variant='outlined'
                                        >
                                            {
                                                isAddedToMyList === true ?
                                                    <>
                                                        <FaHeart className="text-danger" />
                                                    </>
                                                    :
                                                    <>
                                                       
                                                    </>

                                            }

                                        </span>
                                    </div>
                                </div>


                                <p className="mb-2 fs-3 fw-bold">{props?.data?.name}</p>


                                <div className='d-flex align-items-baseline mt-2 mb-4 infos'>
                                    <h6 className='d-flex align-items-baseline mr-1' ><span className='fs-7' >Brand:</span> <span className=' fs-6 ml-1' >{props?.data?.brand?.name}</span></h6>
                                    |
                                    <h6 className='d-flex align-items-baseline ml-1 '> <span className='fs-7'>Condition:


                                    </span><span className=' fs-6 ml-1 mr-1' >{props?.data?.isNew === true ? "New" : "Used"}</span></h6>
                                    |
                                    <h6 className='d-flex align-items-baseline ml-1'> <span className='fs-7'> sex:</span>
                                        {
                                            props?.data?.sex === "MEN" ? (
                                                <span className='fs-6 ml-1 men'>Men</span>
                                            ) : props?.data?.sex?.length === 2 ? (
                                                <span className='fs-6 ml-1'>Unisex</span>
                                            ) : (
                                                <span className='fs-6 ml-1 women '>Women</span>
                                            )
                                        }

                                    </h6>
                                </div>

                                <h6 className='font-weight-bold fs-5 m-2' >{
                                    props?.data?.isFeatured === true ?
                                        <span className='badge bg-success'>IN Stock</span>
                                        :
                                        <span className='badge bg-error'>Out Stock</span>

                                }</h6>

                                <p className='mt-3 text-anywhere'> &nbsp; &nbsp; &nbsp;  {props?.data?.description}</p>
                                <div className='d-flex align-items-center buy-class' >
                                    <div className='row d-flex align-items-center justify-content-between w-100 m-auto' >
                                        <div className='col-md-3' >
                                            <QuantityBox
                                                quantity={quantity}
                                                selectedItem={selectedItem}
                                            />
                                        </div>

                                        <div className='col-md-8 mt-2 w-100 align-items-center row m-0' >

                                            <Button
                                                className="btn-blue btn-lg btn-big btn-site btn-round col-md-6 p-1 m-1"
                                                onClick={() => addtoCart(productQuantity)}
                                            >
                                                <BsCartFill /> &nbsp;
                                                {context.addingInCart === true ? "adding ..." : "Add To Cart"}
                                            </Button>
                                            <Button onClick={() => BuyNow(props?.data?._id)} class="button-42 btn-blue btn-lg btn-big btn-site btn-round ml-2 col-md-5 w-100 m-1" role="button"><Link></Link> Buy Now</Button>
                                        </div>
                                    </div>
                                </div>

                                <div  >
                                    <div className='accordiantion' >
                                        <Accordion className='mb-0' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className='p-0 m-0' >
                                                <Typography className='d-flex align-items-center justify-content-between w-100' >
                                                    <div className='ship-part1 ml-1' >
                                                        <FaShippingFast />
                                                        Shipping
                                                    </div>
                                                    <div className='ship-part2 mr-1' >
                                                        <FaArrowsUpDown />
                                                    </div>

                                                </Typography>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                                    sit amet blandit leo lobortis eget.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>




                </Dialog>
            </>
        );
    }

    export default ProductModal;









