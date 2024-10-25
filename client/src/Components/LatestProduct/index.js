import { useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';

const LatestProduct = () => {


    const [anchorEl, setAnchorEl] = useState(null);
    const [productView , setproductView] = useState('four')
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    return(
        <>
            <section className="product_Listing_Page" >
                <div className="container" >
                    <div className="productListing d-flex" >
                                <ProductItem itemView={productView}/>
                                <ProductItem itemView={productView}/>
                                <ProductItem itemView={productView}/>
                                <ProductItem itemView={productView}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" >
                        <Pagination count={10} color="primary" size="large" />
                    </div>      
                </div>
            </section>
        </>
    )
}

export default LatestProduct;