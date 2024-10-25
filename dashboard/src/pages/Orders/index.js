import React from 'react'
import { editData, fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from "@mui/material/Pagination"
import Button from "@mui/material/Button"
import Dialog from '@mui/material/Dialog'
import { MdClose } from "react-icons/md"




const Orders = () => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [ singleOrder , setSingleOrder] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchDataFromApi("/api/order?page=1&perPage=8").then((res) => {
            setOrders(res.orderList)
        })
    }, [])

    const handleChange = (event, value) => {
        setPage(value)
        fetchDataFromApi(`/api/order?page=${value}&perPage=8`).then((res) => {
            setOrders(res.orderList);
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })

        })
    }

    const showProducts = (id) => {
        fetchDataFromApi(`/api/order/${id}`).then((res) => {
            setIsOpenModal(true)
            setProducts(res.products)
        })
    }

    const orderStatus =(orderStatus , id) => {
        fetchDataFromApi(`/api/order/${id}`).then((res) => {

            const order = {
                fullname : res.fullname,
                phone1 : res.phone1,
                phone2 : res.phone2,
                city : res.city,
                adress1 : res.adress1,
                adress2 : res.adress2,
                products:res.products,
                status : orderStatus
            }
            editData(`/api/order/${id}` , order).then((res) => {
                fetchDataFromApi(`/api/order`).then((res) => {
                    setOrders(res.orderList)
                    window.scrollTo({
                        top :200,
                        behavior : 'smooth'
                    })
                })

            // setSingleOrder(res.products)
        })
    })}



    return (
        <>
            <div className='right-content w-100' >
                <div className='card shadow border-0 w-100 flex-row p-4 align-items-center' >
                    <h5 className='mb-0'>Orders List</h5>
                    </div>

                    <div className="card  shadow border-0 p-3 mt-4">
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped v-align">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Products</th>
                                        <th>Full Name</th>
                                        <th>Phone 1</th>
                                        <th>Phone 2</th>
                                        <th>City</th>
                                        <th>adress1</th>
                                        <th>Adress2</th>
                                        <th>status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.length !== 0 && orders?.map((order, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td> <span className="text-blue font-weight-bold cursor" onClick={() => showProducts(order?._id)} >Click here to view</span>


                                                        </td>
                                                        <td>{order?.fullname}</td>
                                                        <td>{order?.phone1}</td>
                                                        <td>{order?.phone2}</td>
                                                        <td>{order?.city}</td>
                                                        <td>{order?.adress1}</td>
                                                        <td>{order?.adress2}</td>
                                                        <td>
                                                            {order?.status === "pending" ?
                                                                <span className="badge badge-danger cursor" 
                                                                onClick={() => orderStatus('confirm' , order?._id)}
                                                                >{order?.status} 
                                                                 </span>
                                                                :
                                                                <span className="badge badge-success cursor"
                                                                onClick={() => orderStatus('pending' , order?._id)}
                                                                > {order?.status} </span>
                                                            }
                                                        </td>
                                                        <td>{new Date(order?.date).toLocaleDateString('en-GB')}</td>

                                                    </tr>
                                                </>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            {/* {
                                orders?.totalPages > 1 &&
                                <div className="d-flex tableFooter">
                                    <Pagination count={orders?.totalPages}
                                        color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                                </div>
                            } */}

                        </div>
                    </div>

                </div>
            <Dialog open={isOpenModal} className="productModal">
                <Button className="close_" onClick={() => setIsOpenModal(false)} ><MdClose /></Button>
                <h4 className="mb-1 font-wight-bold pr-5">Products</h4>
                <div className="table-responsive orderTable" >
                    <table className="table table-striped table-bordered " >
                        <thead className="thead-light" >
                            <tr>
                                <th>Product Id</th>
                                <th>Product Title</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>subTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.length !== 0 && products?.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item?.productId}</td>
                                            <td style={{ whiteSpace: "inherit" }} >
                                                <span>{item?.productTitle?.substr(0, 30) + '...'}</span>
                                            </td>
                                            <td>
                                                <div className="img">
                                                    <img src={item?.image} />
                                                </div>
                                            </td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.subTotal}</td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </Dialog>
        </>
    )
}

export default Orders;