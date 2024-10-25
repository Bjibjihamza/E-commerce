
import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from "../../App";

import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import QuantityBox from '../../Components/QuantityBox';
import { IoIosClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { IoCartSharp } from "react-icons/io5";
import { editData, fetchDataFromApi, deletData } from "../../utils/api";
import empty from '../../assets/images/panier.png';
import { FaHome } from "react-icons/fa";
import QBox from '../../Components/QBox/QBox';





const Cart = () => {
    const context = useContext(MyContext)
    const [cartData, setCartData] = useState([])
    let [cartFields, setCartFields] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [selectedQuantity, setselectedQuantity] = useState()
    const [changeQuantity, setChangeQuantity] = useState(0)




    const [productQuantity, setProductQuantity] = useState()


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
            setCartData(res);
            setselectedQuantity(res?.quantity)
        })
    }, [])


    const quantity = (val) => {
        setProductQuantity(val)
        setChangeQuantity(val)
    }


    const selectedItem = (item, quantityVal) => {
        setIsLoading(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const updatedFields = {
            ...item,
            quantity: quantityVal,
            subTotal: parseInt(item.price) * quantityVal,
            userId: user?.userId,
        };

        editData(`/api/cart/${item?._id}`, updatedFields).then(() => {
            fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
                setCartData(res);
                setIsLoading(false);
            });
        });
    };



    const removeItem = (id) => {
        deletData(`/api/cart/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "item removed from cart !"
            })
            const user = JSON.parse(localStorage.getItem('user'))
            fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
                setCartData(res)
                setIsLoading(false)
            })
        })
        context.getCartData();
    }

    return (
        <>
            <section className="section cartPage" >
                <div className="container" >

                    <h2 className="hd mb-1">My  Cart</h2>
                    <p> There are <b className="text-red" >{cartData?.length}</b> products in your cart  </p>

                    {
                        cartData?.length !== 0 ?

                            <div className="row" >
                                <div className="col-md-9" >
                                    <div className="table-responsive pc" >
                                        <table className="table table-striped table-orders" >
                                            <thead>
                                                <tr>
                                                    <th width="35%" >product</th>
                                                    <th width="15%" >Unit Price</th>
                                                    <th width="25%" >Quantity</th>
                                                    <th width="15%" >Subtotal</th>
                                                    <th width="10%" >Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    cartData?.length !== 0 &&
                                                    cartData?.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td width="35%" >
                                                                    <div className="d-flex align-items-center" >
                                                                        <div className="d-flex align-items-center cartItemimgWrapper" >
                                                                            <div className="imgWrapper" >
                                                                                <img src={item?.image} className="w-100" alt={item?.productTitle?.substr(0, 30) + '...'} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="info px-3" >
                                                                            <h6>{item?.productTitle}</h6>
                                                                            <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td width="15%">{item?.price}  MAD</td>
                                                                <td width="25%" ><QBox quantity={quantity} item={item} selectedItem={selectedItem} value={item?.quantity} /></td>
                                                                <td width="15%" >{item?.subTotal} MAD</td>
                                                                <td width="10%" > <span className="remove" onClick={() => removeItem(item?._id)} > <IoIosClose /></span></td>

                                                            </tr>
                                                        )

                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="table-responsive mobile" >
                                        <table className="table table-striped table-orders " >
                                            <thead>
                                                <tr>
                                                    <th width="100%" >products</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    cartData?.length !== 0 &&
                                                    cartData?.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td width="100% row " >
                                                                    <div className="d-flex align-items-stretch " >
                                                                        <div className="d-flex align-items-center cartItemimgWrapper p-0  col-4" >
                                                                            <div className="imgWrapper w-100" >
                                                                                <img src={item?.image} className="w-100 rounded" alt={item?.productTitle?.substr(0, 30) + '...'} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="info px-3 d-flex flex-column justify-content-around col-8 " >
                                                                            <div className='d-flex align-items-center justify-content-between' >
                                                                            <h6 className='p-1 m-0' style={{ textAlign: 'left' }}>Product_3</h6>

                                                                            <span className="remove" onClick={() => removeItem(item?._id)} > <IoIosClose /></span>
                                                                            </div>
                                                                        <div className='d-flex align-items-center justify-content-between' >
                                                                                <QBox quantity={quantity} item={item} selectedItem={selectedItem} value={item?.quantity} />
                                                                                <p className='m-0' > {item?.subTotal} MAD </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                               
                                                            </tr>
                                                        )

                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                                <div className="col-md-3" >
                                    <div className="card shadow p-3 cartDetails" >
                                        <h4>CART TOTALS</h4>

                                        <div className="d-flex align-items-center mb-3" >
                                            <span> Subtotal </span>
                                            <span className="ml-auto text-red font-weight-bold">

                                                {
                                                    cartData.length !== 0 &&
                                                    cartData.reduce((total, item) => {
                                                        return total + (parseInt(item?.price) * item?.quantity);
                                                    }, 0)
                                                }
                                                &nbsp; MAD

                                            </span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3" >
                                            <span> Shipping </span>
                                            <span className="ml-auto"><b>Free</b></span>
                                        </div>


                                        <div className="d-flex align-items-center mb-3" >
                                            <span> Total </span>
                                            <span className="ml-auto text-red font-weight-bold">
                                                {
                                                    cartData.length !== 0 &&
                                                    cartData.reduce((total, item) => {
                                                        return total + (parseInt(item?.price) * item?.quantity);
                                                    }, 0)
                                                }
                                                &nbsp; MAD

                                            </span>
                                        </div>
                                        <br />
                                        <Link to="/checkout" >
                                            <Button className="btn-blue btn-site w-100 bg-red btn-lg btn-big font-weight-bold" >
                                                <IoCartSharp className='mr-2' /> Buy Now
                                            </Button>
                                        </Link>


                                    </div>
                                </div>
                            </div>

                            :

                            <div className='empty d-flex align-items-center justify-content-center flex-column' >
                                <img src={empty} width="150" />
                                <h5 className='m-2' >Your Cart is currently empty</h5>
                                <br />
                                <Link to="/" ><Button className='btn-blue btn-site bg-red btn-lg btn-big btn-round'><FaHome className='mr-2' /> continue Shopping </Button>  </Link>
                            </div>
                    }
                </div>
            </section>
            {
                isLoading === true &&
                <div className='loading' ></div>
            }
        </>
    )
}

export default Cart;