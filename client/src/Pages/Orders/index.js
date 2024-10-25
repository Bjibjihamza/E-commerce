import { useState , useContext , useEffect } from "react"
import { fetchDataFromApi, deletData } from "../../utils/api";
import Pagination from "@mui/material/Pagination"
import Button from "@mui/material/Button"
import Dialog from '@mui/material/Dialog'
import { MdClose } from "react-icons/md"
import { MdDeleteOutline } from "react-icons/md";
import { MyContext } from "../../App";



const Orders = () => {

    const context = useContext(MyContext)

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])

    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        window.scrollTo(0, 0)

        fetchDataFromApi(`/api/order?userId=${user.userId}`).then((res) => {
            setOrders(res.orderList)
        })

    }, [])


    const handleChange = (event, value) => {
        const user = JSON.parse(localStorage.getItem('user'))

        setPage(value)
        fetchDataFromApi(`/api/order?userId=${user.userId}`).then((res) => {
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

    const removeOrder = (id) => {
        fetchDataFromApi(`/api/order/${id}`).then((res) => {

            if (res.status !== "confirm") {
                deletData(`/api/order/${id}`).then((res) => {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "item removed from cart !"
                    })
                    const user = JSON.parse(localStorage.getItem('user'))
                    fetchDataFromApi(`/api/order?userId=${user.userId}`).then((res) => {
                        setOrders(res.orderList);
                        window.scrollTo({
                            top: 200,
                            behavior: 'smooth'
                        })
            
                    })
                })

            } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "order in Shipping !"
                    })
                
            }

                })        }





    return (
            <>
                <section className="section" >
                    <div className="container" >
                        <h2 className="hd" >Orders</h2>

                        <div className="table-responsive pc" >
                            <table className="table table-striped table-orders" >
                                <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                        <th>Adress</th>
                                        <th>status</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orders?.length !== 0 && orders?.map((order, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="cursor" onClick={() => showProducts(order?._id)}>
                                                            <div className="img more_products">
                                                                {order?.products?.slice(0, 3).map((product, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={product.image}
                                                                        alt={`Product ${index}`}
                                                                        style={{ width: '45px', height: '60px', margin: '3px', borderRadius: 4 }}
                                                                    />
                                                                ))}

                                                                {order?.products?.length > 3 && (
                                                                    <span style={{ margin: '3px', fontSize: '18px' }}>...</span>
                                                                )}
                                                            </div>

                                                        </td>
                                                        <td>{order?.fullname}</td>
                                                        <td>{order?.phone1}</td>
                                                        <td>{order?.city}</td>
                                                        <td>{order?.adress1}</td>
                                                        <td>
                                                            {order?.status === "pending" ?
                                                                <span className="badge badge-danger">{order?.status}</span>
                                                                :
                                                                <span className="badge badge-success"> {order?.status} </span>
                                                            }
                                                        </td>
                                                        <td>{new Date(order?.date).toLocaleDateString('en-GB')}</td>
                                                        <td > <span className="badge badge-danger p-1 cursor" onClick={() => removeOrder(order?._id)}  >  < MdDeleteOutline />
                                                        </span></td>
                                                    </tr>
                                                </>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="table-responsive mobile" >
                            <table className="table table-striped table-orders" >
                                <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                        <th>Adress</th>
                                        <th>status</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orders?.length !== 0 && orders?.map((order, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="cursor" onClick={() => showProducts(order?._id)}>
                                                            <div className="img more_products">
                                                                {order?.products?.slice(0, 3).map((product, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={product.image}
                                                                        alt={`Product ${index}`}
                                                                        style={{ width: '45px', height: '60px', margin: '3px', borderRadius: 4 }}
                                                                    />
                                                                ))}

                                                                {order?.products?.length > 3 && (
                                                                    <span style={{ margin: '3px', fontSize: '18px' }}>...</span>
                                                                )}
                                                            </div>

                                                        </td>
                                                        <td>{order?.fullname}</td>
                                                        <td>{order?.phone1}</td>
                                                        <td>{order?.city}</td>
                                                        <td>{order?.adress1}</td>
                                                        <td>
                                                            {order?.status === "pending" ?
                                                                <span className="badge badge-danger">{order?.status}</span>
                                                                :
                                                                <span className="badge badge-success"> {order?.status} </span>
                                                            }
                                                        </td>
                                                        <td>{new Date(order?.date).toLocaleDateString('en-GB')}</td>
                                                        <td > <span className="badge badge-danger p-1 cursor" onClick={() => removeOrder(order?._id)}  >  < MdDeleteOutline />
                                                        </span></td>
                                                    </tr>
                                                </>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {
                            orders?.totalPages > 1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={orders?.totalPages}
                                    color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                            </div>
                        }

                    </div>
                </section>
                <Dialog open={isOpenModal} className="productModal" >
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
                                                <td>{(item?.price )*(item?.quantity)}</td>
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