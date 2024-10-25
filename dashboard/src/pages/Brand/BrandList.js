import React, { useState, useEffect, useContext } from "react";
import { Button, Pagination, Breadcrumbs, Chip, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
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

const Brand = () => {
    const [catData, setCatData] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/brand').then((res) => {
            setCatData(res);
            context.setProgress(100);
        });
    }, []);

    const deleteCat = (id) => {
        deletData(`/api/brand/${id}`).then(() => {
            fetchDataFromApi('/api/brand').then((res) => {
                setCatData(res);
            });
        });
    };

    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/brand?page=${value}`).then((res) => {
            setCatData(res);
            context.setProgress(100);
        });
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0">Brand List</h5>
                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Brand"
                                deleteIcon={<EXpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Link to="/Brand/Add">
                            <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                                ADD Brand
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <Grid container spacing={4} className="products_card_grid mt-3">
                        {catData?.brandList?.length !== 0 &&
                            catData?.brandList?.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={item._id}>
                                    <Card className="brand-card">
                                        <CardMedia
                                            component="img"
                                            className="brand-card-media"
                                            image={`${item?.images[0]}`}
                                            alt={item.name}
                                        />
                                        <CardContent className="brand-card-content">
                                            <Typography gutterBottom variant="h6" className="brand-card-title">
                                                {item.name}
                                            </Typography>
                                            <div className="brand-card-actions">
                                                <Link to={`/brand/edit/${item._id}`}>
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
                                        </CardContent>
                                    </Card>
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

export default Brand;
