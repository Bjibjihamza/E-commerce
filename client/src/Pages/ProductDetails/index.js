import React, { useState, useContext, useEffect } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProductDetails = () => {
    const context = useContext(MyContext);
    const { id } = useParams();
    const location = useLocation();
    const quantity = location.state?.quantity || 1;
    const [cartData, setCartData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            setCartData(res);
        });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            phone1: "",
            phone2: "",
            city: "",
            adress1: "",
            adress2: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .min(3, 'Full Name must be at least 3 characters')
                .required('Full Name is required'),
            phone1: Yup.string()
                .matches(/^[0-9]+$/, "Phone number must be digits only")
                .min(10, 'Phone number must be at least 10 digits')
                .required('Phone 1 is required'),
            city: Yup.string()
                .required('City is required'),
            adress1: Yup.string()
                .required('Address is required'),
        }),
        onSubmit: (values) => {
            const user = JSON.parse(localStorage.getItem("user"));

            const payLoad = {
                fullname: values.fullname,
                phone1: values.phone1,
                phone2: values.phone2,
                city: values.city,
                adress1: values.adress1,
                adress2: values.adress2,
                products: [
                    {
                        productId: cartData._id,
                        productTitle: cartData.name,
                        quantity: quantity,
                        price: cartData.price,
                        image: cartData.images[0],
                        total: cartData.price * quantity,
                    }
                ],
                userId: user?.userId
            };

            postData('/api/order/create', payLoad).then(() => {
                navigate("/orders");
            });
        }
    });

    return (
        <section className="section">
            <div className="container">
                <form className="checkoutForm" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <h2 className="hd">BILLING DETAILS</h2>

                            <div className="form-group">
                                <input
                                    placeholder="Full Name"
                                    name="fullname"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullname}
                                />
                                {formik.touched.fullname && formik.errors.fullname ? (
                                    <div>{formik.errors.fullname}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="Phone 1"
                                    name="phone1"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone1}
                                />
                                {formik.touched.phone1 && formik.errors.phone1 ? (
                                    <div>{formik.errors.phone1}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="Phone 2"
                                    name="phone2"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone2}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="City"
                                    name="city"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <div>{formik.errors.city}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="Address"
                                    name="adress1"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.adress1}
                                />
                                {formik.touched.adress1 && formik.errors.adress1 ? (
                                    <div>{formik.errors.adress1}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="Address Supplémentaire"
                                    name="adress2"
                                    className="w-100 chekout_input"
                                    onChange={formik.handleChange}
                                    value={formik.values.adress2}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card orderInfo">
                                <h4 className="hd">YOUR ORDER</h4>
                                <div className="table-responsive mt-3">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th>Products</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartData && (
                                                <tr>
                                                    <td>{cartData?.name?.substr(0, 30)} <b>* {quantity}</b></td>
                                                    <td>{cartData?.price * quantity} MAD</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Button type="submit" className="btn-blue btn-site bg-red btn-lg btn-big">
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

export default ProductDetails;
