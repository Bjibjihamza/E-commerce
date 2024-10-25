import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from 'react-icons/io';

import { useContext, useState } from 'react';
import { MyContext } from '../../App';



const ProductItem = (props) => {

    const context = useContext(MyContext);





    return (
        <>                                                       
            <div className="ModelItem" >
                <div className="ModelImg" >
                    <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62-346x310.jpg" className="w-100" />


                </div>
                <div className="info" >
                    <h4> Werther's Original Caramel Hard Candies  </h4>
                    <span>In Stock</span>
                </div>

             </div>
         
        </>
    )
}

export default ProductItem