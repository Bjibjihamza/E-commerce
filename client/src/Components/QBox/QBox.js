import { FaMinus, FaPlus } from 'react-icons/fa6';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';






const QuantityBox = ({ quantity, item, selectedItem, value }) => {
    const [inputVal, setInputVal] = useState(value || 1); // Initialize with prop value

    useEffect(() => {
        setInputVal(value); // Sync state with parent when `value` changes
    }, [value]);

    const handleUpdate = (newVal) => {
        setInputVal(newVal);
        selectedItem(item, newVal); // Notify parent with the new quantity
    };

    const minus = () => {
        if (inputVal > 1) handleUpdate(inputVal - 1); // Decrease quantity
    };

    const plus = () => {
        handleUpdate(inputVal + 1); // Increase quantity
    };

    return (
        <div className="quantityDrop d-flex align-items-center">
            <Button className="minus" onClick={minus}>
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
