import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React, {  useState, useContext, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { deletData, fetchDataFromApi, postData ,deleteImages } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";



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



const AddHomeSlide = () => {

    const context = useContext(MyContext);

    const history = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const [formFields, setFormFields] = useState({
        images: [],
    })


    const [previews, setPreviews] = useState([]);
    const [ uploading , setUploading ] = useState(false)

    const formdata = new FormData();

    

    useEffect(() => {

        (async () => {
            try {
                const imagesData = await fetchDataFromApi('/api/imageUpload');
                if (imagesData?.length > 0) {
                    await deletData('/api/homeBanner/deleteAllImages');
                } 
            } catch (error) {
                console.error('Erreur lors de la vérification ou suppression des images', error);
            }
        })();

        setPreviews([]); 
    }, []);



    let img_arr = [];
    let uniqueArray = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {

            const files = e.target.files;
    
            setUploading(true);
    
            let newPreviews = [...previews]; 
    
            // Loop through all selected files
            for (let i = 0; i < files.length; i++) {
                // Validate the file type
                if (files[i] && (
                    files[i].type === 'image/jpeg' ||
                    files[i].type === 'image/jpg' ||
                    files[i].type === 'image/png' ||
                    files[i].type === 'image/gif' ||
                    files[i].type === 'image/bmp' ||
                    files[i].type === 'image/tiff' ||
                    files[i].type === 'image/webp' ||
                    files[i].type === 'image/svg+xml' ||
                    files[i].type === 'image/heic' ||
                    files[i].type === 'image/heif'
                )) {
                    const file = files[i];
                    formdata.append('images', file); 
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: 'Please select a valid JPG, PNG, or other supported image file.'
                    });
                    setUploading(false);
                    return false;
                }
            }

    
            await postData(apiEndPoint, formdata).then((res) => {
    
                fetchDataFromApi('/api/imageUpload').then((response) => {
                    if (response && response.length !== 0) {
                        let img_arr = [];
    
                        response.forEach(item => {
                            if (item?.images && item.images.length !== 0) {
                                img_arr.push(...item.images);
                            }
                        });

                        setPreviews(img_arr);
                    }
                });
    
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images uploaded successfully!"
                    });
    
                     }).catch(error => {
                console.log('Error uploading files:', error);
                }).finally(() => {
                setUploading(false);
                });
    
        } catch (error) {
            console.log('Error:', error);
            setUploading(false);
        }

    };
    
    const removeImg = async (index, imgUrl) => {
        const updatedPreviews = [...previews];

        updatedPreviews.splice(index, 1);

        setPreviews(updatedPreviews);

        try {
            await deleteImages('/api/imageUpload/delete', imgUrl);
            context.setAlertBox({
                open: true,
                error: false,
                msg: 'Image supprimée avec succès!'
            });
        } catch (error) {
            console.log('Erreur lors de la suppression de l\'image :', error);
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Erreur lors de la suppression de l\'image.'
            });
        }
    };


    const AddHomeSlide = (e) => {
        e.preventDefault();

        formFields.images = previews

        if (previews.length !== 0) {
            setIsLoading(true);

            postData('/api/homeBanner/create', formFields).then(res => {

                setIsLoading(false);
                context.fetchCategory();

                deletData("/api/imageUpload/deleteAllImages")

                history('/homeBannerSlide/list');

            })

        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }

    }


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0">Add Home Slide</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#" label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Home Slide"
                            component="a"
                            href="#"
                        />
                        <StyledBreadcrumb
                            label="Add Home Slide"
                        />
                    </Breadcrumbs>
                </div>
                <form className="form" onSubmit={AddHomeSlide}  >
                    <div className="row" >
                        <div className="col-sm-12" >
                            <div className="card p-4" >
                                <div className="imagesUploadSec" >
                                    <h5 className="mb-4"> Media And Published</h5>

                                    <div className="imgUploadBox d-flex align-items-center">
                                    
                                        {
                                            previews?.length !== 0 && previews?.map((img, index) => {
                                                return (
                                                    <div className="uploadBox" key={index} >
                                                        <span className="remove" onClick={() => removeImg(index, img)}> <IoCloseSharp /> </span>
                                                        <div>
                                                            <img src={img} className="w-100" />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="uploadBox">
                                            {
                                                uploading === true ?
                                                    <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column" >
                                                        <CircularProgress />
                                                        <span>Uploading...</span>
                                                    </div>

                                                    :
                                                    <>
                                                        <input type="file" multiple onChange=
                                                            {(e) => onChangeFile(e, '/api/homeBanner/upload')} name="images" />
                                                        <div className="info" >
                                                            <FaRegImages />
                                                            <h5>iamge Upload</h5>
                                                        </div>
                                                    </>
                                            }
                                        

                                        </div>
                                    </div>
                                    <br />
                                    <Button type="submit" className="btn-blue btn-lg btn-big w-100"
                                        ><FaCloudUploadAlt />
                                        &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div >

        </>
    )
}

export default AddHomeSlide;