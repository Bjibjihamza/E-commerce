import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React, { useContext, useRef, useState, useEffect } from 'react';
import Rating from "@mui/material/Rating";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import Button from "@mui/material/Button";
import { editData, fetchDataFromApi, postData, deleteImages, deletData } from "../../utils/api";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const ProductEdit = () => {

    const context = useContext(MyContext);

    const history = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const [formFields, setFormFields] = useState({
        name: "",
        description: "",
        sex: "",
        class: "",
        isFeatured: false,
        isPopulair: false,
        New: false,
        rating: 0,
        price: 0,
        oldPrice: 0,
        brand: "",
        catName: "",
        brandName: '',
        category: "",
        images: [],
    })


    const [categoryVal, setcategoryVal] = useState('');
    const [brandVal, setbrandVal] = useState('');

    const [ratingValue, setRatingValue] = useState(1)
    const [isFeaturedValue, setIsFeaturedValue] = useState("")
    const [isPopulairValue, setIsPopulairValue] = useState("");
    const [NewValue, setNewValue] = useState("");
    const [sexValue, setSexValue] = useState([]);
    const [classValue, setClassValue] = useState([]);




    const [catData, setCatData] = useState([]);

    const [product, setProducts] = useState([]);

    const [uploading, setUploading] = useState(false)


    const [previews, setPreviews] = useState([]);





    const productImages = useRef()

    const { id } = useParams();

    const formdata = new FormData()



    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0, 0);
        setCatData(context.catData);



        (async () => {
            try {
                const imagesData = await fetchDataFromApi('/api/imageUpload');
                if (imagesData?.length > 0) {
                    await deletData('/api/imageUpload/deleteAllImages');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification ou suppression des images', error);
            }
        })();



    }, [])




    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            setProducts(res)

            setFormFields({
                name: res.name,
                description: res.description,
                sex: res.sex,
                class: res.class,
                isFeatured: res.isFeatured,
                isPopulair: res.isPopulair,
                New: res.New,
                rating: res.rating,
                price: res.price,
                oldPrice: res.oldPrice,
                brand: res.brand,
                catName: res.catName,
                brandName: res.brandName,
                category: res.category,
            })

            setPreviews(res.images);



            setRatingValue(res.rating);
            setcategoryVal(res.category);
            setbrandVal(res.brand)
            setSexValue(res.sex)
            setClassValue(res.class)
            setIsFeaturedValue(res.isFeatured)
            setIsPopulairValue(res.isPopulair)
            setNewValue(res.New)



            postData('/api/imageUpload/createIm', res.images);
            context.setProgress(100);

        })
    }, []);




    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value)

        setFormFields(() => ({
            ...formFields,
            category: event.target.value
        }))

        formFields.catName = event.target.value


    }

    const handleChangeBrand = (event) => {
        setbrandVal(event.target.value)

        setFormFields(() => ({
            ...formFields,
            brand: event.target.value
        }))

        formFields.brandName = event.target.value


    }



    const handleChangeisFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value)

        setFormFields(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    }

    const handleChangeisPopulairValue = (event) => {
        setIsPopulairValue(event.target.value)

        setFormFields(() => ({
            ...formFields,
            isPopulair: event.target.value
        }))
    }
    const handleChangeNewValue = (event) => {
        setNewValue(event.target.value)

        setFormFields(() => ({
            ...formFields,
            New: event.target.value
        }))
    }

    const handleChangeSexValue = (event) => {
        const {
            target: { value },
        } = event;
        setSexValue(
            typeof value === 'string' ? value.split(',') : value,
        );
        setFormFields(() => ({
            ...formFields,
            sex: event.target.value
        }))
    }

    const handleChangeClassValue = (event) => {
        const {
            target: { value },
        } = event;
        setClassValue(
            typeof value === 'string' ? value.split(',') : value,
        );
        setFormFields(() => ({
            ...formFields,
            class: event.target.value
        }))
    }



    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const selectCat = (cat) => {
        formFields.catName = cat;
    }

    const selectBrand = (cat) => {
        formFields.brandName = cat;
    }



    let img_arr = [];
    let uniqueArray = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const files = e.target.files;

            setUploading(true);

            let newPreviews = [...previews];  // Start with the current previews

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
                    formdata.append('images', file);  // Append valid image to FormData
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
                                img_arr.push(...item.images);  // Spread images into img_arr
                            }
                        });

                        const uniqueArray = [...newPreviews, ...img_arr].filter((item, index, self) =>
                            self.indexOf(item) === index
                        );

                        setPreviews(uniqueArray);
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

    const editProduct = (e) => {
        e.preventDefault();
        const appendedArray = [...previews, ...uniqueArray];

        img_arr = [];

        formdata.append('name', formFields.name);
        formdata.append('description', formFields.description);
        formdata.append('sex', formFields.sex);
        formdata.append('class', formFields.class);
        formdata.append('isFeatured', formFields.isFeatured);
        formdata.append('isPopulair', formFields.isPopulair);
        formdata.append('New', formFields.New);
        formdata.append('rating', formFields.rating);
        formdata.append('price', formFields.price);
        formdata.append('oldPrice', formFields.oldPrice);
        formdata.append('brand', formFields.brand);
        formdata.append('catName', formFields.catName);
        formdata.append('category', formFields.category);

        formFields.images = appendedArray



        setIsLoading(true)
        editData(`/api/product/${id}`, formFields).then((res) => {

            setIsLoading(false);

            setIsLoading(false)

            history('/products')

        })
    };




    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 d-flex justify-content-between align-items-center flex-row p-4">
                    <h5 className="mb-0"> Edit Product</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#" label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Products"
                            component="a"
                            href="#"
                        />
                        <StyledBreadcrumb
                            label="Products Upload"
                        />
                    </Breadcrumbs>
                </div>
                <form className="form" onSubmit={editProduct} >

                    <div className="row" >
                        <div className="col-sm-12" >
                            <div className="card p-4" >
                                <h5 className="mb-4">Basic Information</h5>

                                <div className="form-group" >
                                    <h6>PRODUCT NAME</h6>
                                    <input type="text" value={formFields.name} name="name" onChange={inputChange} />
                                </div>

                                <div className="form-group" >
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} value={formFields.description} name="description" onChange={inputChange} />
                                </div>

                                <div className="row">


                                    <div className="col" >
                                        <div className="form-group">
                                            <h6 className="text-uppercase" >is Featured</h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col" >
                                        <div className="form-group">
                                            <h6 className="text-uppercase" >is New</h6>
                                            <Select
                                                value={NewValue}
                                                onChange={handleChangeNewValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col" >
                                        <div className="form-group">
                                            <h6>PRICE</h6>
                                            <input type="text" value={formFields.price} name="price" onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col" >
                                        <div className="form-group">
                                            <h6>OLD PRICE</h6>
                                            <input type="text" value={formFields.oldPrice} name="oldPrice" onChange={inputChange} />
                                        </div>
                                    </div>


                                </div>


                                <div className="row" >
                                    <div className="col" >
                                        <div className="form-group">

                                            <h6>BRAND</h6>
                                            <Select
                                                value={brandVal}
                                                onChange={handleChangeBrand}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    context.brandData?.brandList?.length !== 0 &&
                                                    context.brandData?.brandList?.map((brand, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalise"
                                                                value={brand._id} key={index}
                                                                onClick={() => selectBrand(brand.name)}  >
                                                                {brand.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>

                                        </div>
                                    </div>
                                    <div className="col" >
                                        <div className="form-group">
                                            <h6>CATEGORY</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    context.catData?.categoryList?.length !== 0 &&
                                                    context.catData?.categoryList?.map((cat, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalise"
                                                                value={cat._id} key={index}
                                                                onClick={() => selectCat(cat.name)}  >
                                                                {cat.name}</MenuItem>

                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                </div>





                                <div className="row" >
                                    <div className="col-md-4" >
                                        <div className="form-group">
                                            <h6>SEX</h6>

                                            <Select
                                                multiple
                                                value={sexValue}
                                                onChange={handleChangeSexValue}
                                                displayEmpty
                                                className="w-100"
                                                MenuProps={MenuProps}

                                            >
                                                <MenuItem value={'MEN'}>MEN</MenuItem>
                                                <MenuItem value={'WOMEN'}>WOMEN</MenuItem>
                                            </Select>

                                        </div>
                                    </div>


                                    <div className="col-md-4" >
                                        <div className="form-group">
                                            <h6>CLASS</h6>

                                            <Select
                                                multiple
                                                value={classValue}
                                                onChange={handleChangeClassValue}
                                                displayEmpty
                                                className="w-100"
                                                MenuProps={MenuProps}

                                            >
                                                <MenuItem value={'poquet'}>Poquet</MenuItem>
                                                <MenuItem value={'smart'}>smart</MenuItem>
                                                <MenuItem value={'hand'}>HAND </MenuItem>
                                                <MenuItem value={'Prepheriques'}>Prepheriques</MenuItem>
                                                <MenuItem value={'clock'}>clock</MenuItem>
                                                <MenuItem value={'reparation'}>reparation</MenuItem>
                                                <MenuItem value={'accesoires'}>accesoires</MenuItem>
                                                <MenuItem value={'machine'}>machine</MenuItem>
                                            </Select>

                                        </div>
                                    </div>

                                    <div className="col-md-4" >
                                        <div className="form-group">
                                            <h6>RATING</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue)
                                                    setFormFields(() => ({
                                                        ...formFields,
                                                        rating: newValue
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </form >

                <div className="card p-4 mt-0" >
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
                                                {(e) => onChangeFile(e, '/api/product/upload')} name="images" />
                                            <div className="info" >
                                                <FaRegImages />
                                                <h5>iamge Upload</h5>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>

                    <br />

                    <Button type="submit" className="btn-blue btn-lg btn-big w-100"
                        onClick={editProduct}  ><FaCloudUploadAlt />
                        &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}
                    </Button>

                </div>

            </div >

        </>
    )
}

export default ProductEdit;