import React, { useState, useContext } from "react";

import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { fetchDataFromApi, postData } from "../../utils/api";
import  {useNavigate}  from 'react-router-dom';




const Checkout = () => {


    const context = useContext(MyContext)
    const [formFields, setFormFields] = useState({
        fullname: "",
        phone1: "",
        phone2: "",
        city: "",
        adress1: "",
        adress2: "",
    })
    const [cartData, setCartData] = useState([])

    const history = useNavigate(); 


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
            setCartData(res);
        })
    }, [])

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const checkout = (e) => {
        e.preventDefault()
        
        if(formFields.fullname === "" ) {
            context.setAlertBox({
                open :true,
                error :true,
                msg : "Please fill full name"
            })
            return false
        }

        if(formFields.adress1 === "" ) {
            context.setAlertBox({
                open :true,
                error :true,
                msg : "Please fill addres"
            })
            return false
        }
        if(formFields.phone1 === "" ) {
            context.setAlertBox({
                open :true,
                error :true,
                msg : "Please fill phone "
            })
            return false
        }
        if(formFields.city === "" ) {
            context.setAlertBox({
                open :true,
                error :true,
                msg : "Please fill full name"
            })
            return false
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const payLoad ={
            fullname : formFields.fullname,
            phone1 : formFields.phone1,
            phone2 : formFields.phone2,
            city : formFields.city,
            adress1 : formFields.adress1,
            adress2 : formFields.adress2,
            products:cartData, 
            userId : user?.userId
        }

        postData('/api/order/create' , payLoad).then(res => {
            history("/orders")
        })



    }


    return (
        <section className="section">
            <div className="container">
                <form className="checkoutForm" onSubmit={checkout} >
                    <div className="row ">
                        <div className="col-md-8">
                            <h2 className="hd">BILLING DETAILS</h2>
                            <div className="row mt-3">

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input placeholder="Full Name" variant="outlined" name="fullname" className="w-100 chekout_input" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input  placeholder="Phone 1" variant="outlined" name="phone1" className="w-100 chekout_input" size="small" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input placeholder="Phone 2" variant="outlined" name="phone2" className="w-100 chekout_input" size="small" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h5>City</h5>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input placeholder="City"
                                            variant="outlined" className="w-100 chekout_input" name="city" size="small" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h5>Address</h5>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input placeholder="Address"
                                            variant="outlined" className="w-100 chekout_input" name="adress1" size="small" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input placeholder="Address Supplumentaire"
                                            variant="outlined" className="w-100 chekout_input" name="adress2" size="small" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card orderInfo" >
                                <h4 className="hd">YOUR ORDER</h4>
                                <div className="table-responsive mt-3" >
                                    <table className="table table-borderless" >
                                        <thead>
                                            <tr>
                                                <th>Products</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                cartData?.length !== 0 &&
                                                cartData?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{item?.productTitle?.substr(0,30)+'...'}<b>* {item?.quantity}</b> </td>
                                                            <td>{item?.subTotal}</td>
                                                        </tr>
                                                    )
                                                })

                                            }

                                            <tr>
                                                <td>Subtotal</td>
                                                <td>

                                                {
                                                    cartData.length !== 0 &&
                                                    cartData.reduce((total, item) => {
                                                        return total + (parseInt(item?.price) * item?.quantity);
                                                    }, 0)
                                                }
                                                </td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </div>
                                <Button type="submit" className="btn-blue btn-site bg-red btn-lg btn-big"

                                >
                                    <IoBagCheckOutline className="mr-1" /> &nbsp; Checkout

                                </Button>
                            </div>
                        </div>



                    </div>

                </form>
            </div>
        </section>

    );
};

export default Checkout;
