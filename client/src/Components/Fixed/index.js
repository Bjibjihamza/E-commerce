import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { LiaShippingFastSolid } from "react-icons/lia";



const Fixed = () => {
    return(
        <>
        <div className="ShippingButton" >
            <Button><Link to="" ></Link>
                <div className="ShippingIcon"><LiaShippingFastSolid/></div>
                <span className="Shipping-text" > Shipping ?</span>
             </Button> 
        </div>
        
        </>
    )
}

export default Fixed;