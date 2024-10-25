import { FaMinus, FaPlus } from 'react-icons/fa6';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

const QuantityBox = (props) => {
    const [inputVal, setInputVal] = useState(1);

    useEffect(() => {
        // Initialize input value from props
        if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
            setInputVal(parseInt(props?.value));
        }
    }, [props.value]);

    const handleQuantityChange = (newVal) => {
        setInputVal(newVal);
        props.quantity(newVal); // Notify parent of the new quantity
    };

    const minus = () => {
        if (inputVal > 1) { // Prevent going below 1
            handleQuantityChange(inputVal - 1);
        }
    };

    const plus = () => {
        handleQuantityChange(inputVal + 1);
    };

    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button className='minus' onClick={minus}>
                <FaMinus />
            </Button>
            <span style={{ width: "40px", textAlign: "center" }}>{inputVal}</span>
            <Button onClick={plus}>
                <FaPlus />
            </Button>
        </div>
    );
};

export default QuantityBox;



