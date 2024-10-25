import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Sidebar = (props) => {
    const [filterCat, setFilterCat] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [activityType, setActivityType] = useState(''); // State for activity type

    // Function to handle the filter change (Category, Brand, Activity Type)
    const handleFilterChange = (category, brand, activity) => {
        props.filterData(category, brand, activity); // Ensure the activity type is also passed up
    };

    // Handle category change
    const handleChangeCat = (event) => {
        const newCategory = event.target.value;
        setFilterCat(newCategory);
        handleFilterChange(newCategory, filterBrand, activityType);  
    };

    // Handle brand change
    const handleChangeBrand = (event) => {
        const newBrand = event.target.value;
        setFilterBrand(newBrand);
        handleFilterChange(filterCat, newBrand, activityType);  
    };

    // Handle activity type change
    const handleActivityTypeChange = (event) => {
        const newActivity = event.target.value;
        setActivityType(newActivity);
        handleFilterChange(filterCat, filterBrand, newActivity); 
    };

    return (
        <div className="sidebar mobile">
            <div className='filtring d-flex align-items-center' >
                <div className="filterBox">
                    <FormControl fullWidth>
                        <InputLabel className='label' id="category-label" >Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={filterCat}
                            label="Category"
                            onChange={handleChangeCat}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {props.catData?.map((item, index) => (
                                <MenuItem key={index} value={item?._id}>{item?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="filterBox">
                    <FormControl fullWidth>
                        <InputLabel className='label' id="brand-label">Brand</InputLabel>
                        <Select
                            labelId="brand-label"
                            id="brand-select"
                            value={filterBrand}
                            label="Brand"
                            onChange={handleChangeBrand}
                        >
                            <MenuItem value="">All Brands</MenuItem>
                            {props.brandData?.map((item, index) => (
                                <MenuItem key={index} value={item?._id}>{item?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;