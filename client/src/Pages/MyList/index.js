
import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from "../../App";

import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { IoIosClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { IoCartSharp } from "react-icons/io5";
import { fetchDataFromApi, deletData } from "../../utils/api";
import empty from '../../assets/images/panier.png';
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';





const MyList = () => {

    const [myListData, setmyListData] = useState([])
    let [cartFields, setCartFields] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(false)


    const context = useContext(MyContext)
    const history = useNavigate()



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true)
        } else {
            history("/signIn")
        }

        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
            setmyListData(res);
        })
    }, [])


    const removeItem = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        deletData(`/api/my-list/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "item removed from cart !"
            })

            fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
                setmyListData(res)
                setIsLoading(false)
            })
        })
    }


    return (
        <>
            <section className="section cartPage" >
                <div className="container" >



                    <div className='myListTableWrapper' >
                        <h2 className="hd mb-1">My Favorite</h2>
                        <p> There are <b className="text-red" >{myListData?.length}</b> products in My favorite  </p>
                        {
                            myListData?.length !== 0 ?


                                <div className="table-responsive" >
                                    <table className="table table-striped" >
                                        <thead>
                                            <tr>
                                                <th width="35%" >product</th>
                                                <th width="15%" >Unit Price</th>
                                                <th width="10%" >Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                myListData?.length !== 0 &&
                                                myListData?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td width="35%" >
                                                                <Link to={`/product/${item?.productId}`} className="d-flex align-items-center" >
                                                                    <div className="d-flex align-items-center cartItemimgWrapper" >
                                                                        <div className="imgWrapper" >
                                                                            <img src={item?.image} className="w-100" style={{
                                                                                maxWidth: '90px',
                                                                            }} alt={item?.productTitle?.substr(0, 30) + '...'} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="info px-3" >
                                                                        <h6>{item?.productTitle}</h6>
                                                                        <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td width="15%">{item?.price} MAD </td>
                                                            <td width="10%" > <span className="remove" onClick={() => removeItem(item?._id)} > <IoIosClose /></span></td>

                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>


                                :
                                <div className='empty d-flex align-items-center justify-content-center flex-column' >
                                    <img src={empty} width="150" />
                                    <h3>My List is currently empty</h3>
                                    <br />
                                    <Link to="/" ><Button className='btn-blue btn-site bg-red btn-lg btn-big btn-round'><FaHome /> continue Shopping </Button>  </Link>
                                </div>
                        }

                    </div>


                </div>
            </section>
            {
                isLoading === true &&
                <div className='loading' ></div>
            }
        </>
    )
}

export default MyList;