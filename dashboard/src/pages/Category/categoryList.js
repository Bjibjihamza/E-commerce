import React, { useState, useEffect, useContext } from "react";
import { Button, Pagination, Breadcrumbs, Grid, Typography, Chip } from '@mui/material';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import EXpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deletData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { emphasize, styled } from "@mui/material/styles";

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

const Category = () => {

    const [catData, setCatData] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res);
            context.setProgress(100);
        });
    }, []);

    const deleteCat = (id) => {
        context.setProgress(20);
        deletData(`/api/category/${id}`).then(() => {
            fetchDataFromApi('/api/category').then((res) => {
                setCatData(res);
                context.setProgress(100);
            });
        });
    };

    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/category?page=${value}`).then((res) => {
            setCatData(res);
            context.setProgress(100);
        });
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0">Category List</h5>

                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Category"
                                deleteIcon={<EXpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Link to="/category/Add">
                            <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                                ADD Category
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    {/* Grid system for categories */}
                    <Grid container spacing={4} className="products_card_grid mt-3">
                        {catData?.categoryList?.length !== 0 &&
                            catData?.categoryList?.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={item._id}>
                                    <div className="category-card">
                                        <div className="category-image-wrapper">
                                            <img src={`${item?.images[0]}`} alt={item.name} className="category-image" />
                                        </div>
                                        <Typography variant="h6" className="category-title">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" className="category-subtitle">
                                            {item.description || 'Category'} {/* Assuming there's a description */}
                                        </Typography>
                                        <div className="category-actions">
                                            <Link to={`/category/edit/${item._id}`}>
                                                <Button variant="outlined" color="secondary" startIcon={<FaPencilAlt />}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => deleteCat(item._id)}
                                                variant="outlined"
                                                color="error"
                                                startIcon={<MdDelete />}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>

                    {/* Pagination */}
                    {catData?.totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                count={catData?.totalPages}
                                color="primary"
                                className="pagination"
                                showFirstButton
                                showLastButton
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Category;
