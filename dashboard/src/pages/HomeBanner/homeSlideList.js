import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs, colors } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import EXpandMoreIcon from "@mui/icons-material/ExpandMore"
import { deletData, editData, fetchDataFromApi } from "../../utils/api";





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

const HomeSlidesList = () => {

    const [ slideList , setSlideList ] = useState([])

    const context = useContext(MyContext);


    useEffect(() => {
        window.scrollTo(0, 0);

        context.setisHideSidebarAndHeader(false);
        context.setProgress(20)
        fetchDataFromApi('/api/homeBanner').then((res) => {
            setSlideList(res)
            context.setProgress(100)
        })
    }, []);

    const deleteSlide = (id) => {
        context.setProgress(20)
        deletData(`/api/homeBanner/${id}`).then(res => {
            fetchDataFromApi('/api/homeBanner').then((res) => {
                setSlideList(res)
                context.setProgress(100)
                context.setAlertBox({
                    open :true,
                    error:false,
                    msg :"Category Deleted!"
                })

            })
        })
    }


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0">Home Banner Slide List</h5>

                    <div className="ml-auto d-flex align-items-center" >
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Home Banner Slide"
                                deleteIcon={<EXpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Link to="/homeBannerSlide/add"><Button className="btn-blue mr-3 pr-3 pl-3" >ADD Home Slide</Button></Link>

                    </div>

                </div>


                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '100px' }}>IMAGES</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>

                                {slideList?.length !== 0 && slideList?.map((item, index) => (
                                    <tr key={item._id}>

                                        <td>
                                            <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                    <div className="img">
                                                        <img src={`${item?.images[0]}`} className="w-100 pl-0" />
                                                    </div>
                                            </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to={`/homeBannerSlide/edit/${item._id}`} >
                                                    <Button className="success" color="success" >
                                                        <FaPencilAlt />
                                                    </Button>
                                                </Link>

                                                <Button onClick={() => deleteSlide(item._id)} className="error" color="error">
                                                    <MdDelete />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSlidesList;
