import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import EXpandMoreIcon from "@mui/icons-material/ExpandMore"
import { deletData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { useParams } from "react-router-dom";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];

    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const Products = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState('');
    const [catBy, setCatBy] = useState('');
    const [checked, setChecked] = useState(false);
    const [productList, setProductList] = useState([]);
    const [In, setIn] = useState([])

    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const context = useContext(MyContext);

    const history = useNavigate();
    const { id } = useParams()




    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0, 0);

        fetchDataFromApi("/api/product").then((res) => {
            setProductList(res)
        })

    }, []);

    const deleteProduct = (id) => {
        context.setProgress(40);
        deletData(`/api/product/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                eror: true,
                msg: 'Product Deleted'
            });
            fetchDataFromApi("/api/product").then((res) => {
                setProductList(res)
                context.setProgress(100)
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

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0">Product List</h5>
                    <div className="ml-auto d-flex align-items-center">

                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Products"
                                deleteIcon={<EXpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Link to="/product/upload">
                            <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                                ADD Product
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '150px' }}>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>PRICEs</th>
                                    <th>RATING</th>
                                    <th>SEX</th>
                                    <th>features</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    productList?.products?.length !== 0 && productList?.products?.map((item, index) => {
                                        return (
                                            <>

                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center productBox">
                                                            <div className="imgWrapper pr-5 ">
                                                                <div className="img ">
                                                                    <img src={`${item?.images[0]}`} className="w-100" />
                                                                </div>
                                                            </div>
                                                            <div className="info pl-3">
                                                                <h6>{item?.name}</h6>
                                                                <p>{item?.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item?.category?.name}</td>
                                                    <td>{item?.brand?.name}</td>
                                                    <td>
                                                        <div style={{ width: '70px' }}>
                                                            <del className="old">{item?.oldPrice}</del>
                                                            <span className="new text-danger">{item?.price}</span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <Rating name="size-small" readOnly value={item?.rating} precision={0.5} size="small" /></td>




                                                    <td>{item?.sex?.map((sex) => {
                                                        return (
                                                            <span className="badge badge-primary m-1 black ">{sex}</span>
                                                        )
                                                    })}
                                                    </td>

                                                    <td>
                                                        <td>
                                                            {
                                                                item?.isFeatured && item?.isPopulair ? (
                                                                    <>
                                                                        <span className="badge badge-primary m-1 black">Featured</span>
                                                                        <span className="badge badge-primary m-1 black">Populair</span>
                                                                    </>
                                                                ) : item?.isPopulair ? (
                                                                    <span className="badge badge-primary m-1 black">Populair</span>
                                                                ) : item?.isFeatured ? (
                                                                    <span className="badge badge-primary m-1 black">Featured</span>
                                                                ) : null
                                                            }

                                                            {item?.class?.map((clas) => {
                                                                return (
                                                                    <span className="badge badge-primary m-1 black ">{clas}</span>
                                                                )
                                                            })}

                                                            {item?.New == true ? <span className="badge badge-primary m-1 black ">New</span> : <span className="badge badge-primary m-1 black ">Used</span>  }
                                                        </td>

                                                    </td>

                                                    <td>
                                                        <div className="actions d-flex align-items-center">
                                                            <Link to={`/product/edit/${item._id}`} >
                                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                                            </Link>
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
                        {
                            productList?.totalPages > 1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={productList?.totalPages}
                                    color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
