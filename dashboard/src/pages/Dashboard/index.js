import { IoMdCart } from "react-icons/io";
import DashboardBox from "./components/dashboardBox";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import CheckBox from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
// import DashboardBox from "./components/dashboardBox";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import EXpandMoreIcon from "@mui/icons-material/ExpandMore"
import { deletData, fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { 'arial-label': 'Chekbox demo' } }


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];

    return {
        backgroundColor, // Utilisation correcte de backgroundColor
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06), // Modification légère de la couleur au hover/focus
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12), // Modification lors de l'interaction active
        },
    };
});



const Dashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setshowBy] = useState('')
    const [productList, setProductList] = useState([]);
    const [showBysetCatBy, setCatBy] = useState('')
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;


    const context = useContext(MyContext)

    useEffect(() => {
        context.setisHideSidebarAndHeader(false)
        window.scrollTo(0, 0)
        context.setProgress(40);
        fetchDataFromApi("/api/product").then((res) => {
            fetchDataFromApi(res)
            context.setProgress(100)
        })

    }, [])

    const deleteProduct = (id) => {
        context.setProgress(40);
        deletData(`/api/product/${id}`).then((res) => {
            context.setProgress(400);
            context.setAlertBox({
                open : true, 
                eror : true,
                msg : 'Product Deleted'
            });
            fetchDataFromApi("/api/product").then((res) => {

            })
        })
    };

    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/product?page=${value}`).then((res) => {
            setProductList(res);
            context.setProgress(100);

        })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            {/* <div className="right-content w-100" >
                <div className="row dashboardBoxWrapperRow  ">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex" >
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>
                    

                    <div className="col-md-4 pl-0" >
                        <div className="box graphBox" >
                            <div className="d-flex align-items-center w-100 bottonEle">
                                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                                <div className="ml-auto">
                                    <Button
                                        className="ml-auto toggleIcon"
                                        onClick={handleClick}
                                    >
                                        <HiDotsVertical />
                                    </Button>
                                    <Menu
                                        className="dropdown_menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />  Last Day
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />  Last Week
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />  Last Month
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />  Last Year
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <h3 className="text-white font-weight-bold">$ 3,787,681.00</h3>
                            <p>$3,578.90 in last month</p>
                        </div>
                    </div>

                </div>
                <div className="card shadow border-0 p-3 mt-4" >
                    <h3 className="hd">Best Selling Products</h3>
                    <div className="row cardFilters" >
                        <div className="col-md-3" >
                            <h4> SHOW BY </h4>
                            <FormControl className="w-100" size="small">
                                <Select
                                    value={showBy}
                                    onChange={(e) => setshowBy(e.target.value)}
                                    displayEmpty
                                    className="w-100"
                                    labelId="demo-select-small-label"
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3" >
                            <h4> CATEGORY BY </h4>
                            <FormControl className="w-100" size="small">
                                <Select
                                    value={showBysetCatBy}
                                    onChange={(e) => setCatBy(e.target.value)}
                                    displayEmpty
                                    className="w-100"
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-select-small-label"

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>


                    </div>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '150px' }}>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>PRICE</th>
                                    <th>RATING</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    productList?.Products?.length !== 0 && productList?.Products?.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center productBox">
                                                            <div className="imgWrapper">
                                                                <div className="img">
                                                                    <img src={`${context.baseUrl}/uploads/${item.images[0]}`} className="w-100 pl-0" />
                                                                </div>
                                                            </div>
                                                            <div className="info pl-3">
                                                                <h6>{item.name}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.category.name}</td>
                                                    <td>{item.brand}</td>
                                                    <td>
                                                        <div style={{ width: '70px' }}>
                                                            <del className="old">Rs {item.oldPrice}</del>
                                                            <span className="new text-danger">Rs {item.price}</span>
                                                        </div>
                                                    </td>

            
                                                    <td>
                                                        <div className="actions d-flex align-items-center">
                                                            <Link to="/product/details">
                                                                <Button className="secondary" color="secondary"><FaEye /></Button>
                                                            </Link>
                                                            <Button className="success" color="success"><FaPencilAlt /></Button>
                                                            <Button className="error" color="error"
                                                            onClick={() => deleteProduct(item._id)}
                                                            ><MdDelete /></Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                        <p>showing <b>12</b> of results</p>
                        <div className="d-flex tableFooter">
                            <Pagination count={productList?.totalPages}
                            color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Dashboard; 