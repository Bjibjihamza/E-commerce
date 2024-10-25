
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const Sidebar = (props) => {
    const [Value_, setValue_] = useState([100, 6000]);
    const [Value2, setValue2] = useState(0);

    const [filterCat, setFilterCat] = useState();

    const [filterBrand, setFilterBrand] = useState('');



    // const handleChangeCat = (event) => {
    //     setFilterCat(event.target.value);
    //     props.filterData(event.target.value)
    //     console.log(event.target.value)
    // };

    const handleFilterChange = (category, brand) => {
        props.filterData(category, brand);  // Pass both values to the parent function
    };

    const handleChangeCat = (event) => {
        const newCategory = event.target.value;
        setFilterCat(newCategory);
        handleFilterChange(newCategory, filterBrand);  // Call filter with both values
    };

    const handleChangeBrand = (event) => {
        const newBrand = event.target.value;
        setFilterBrand(newBrand);
        handleFilterChange(filterCat, newBrand);  // Call filter with both values
    };








    return (
        <>
            <div className="sidebar pc" >
                <div className='sticky'>
                    <div className='filterBox mb-5' >
                        <h6>PRODUCT CATEGORIES</h6>
                        <div className='scroll' >
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={filterCat}
                                defaultValue=""
                                onChange={handleChangeCat}
                            >

                                <FormControlLabel value=""
                                    control={<Radio />} label="All Categories" />

                                

                                    {
                                        props.catData?.lenght !== 0 && props.catData?.map((item, index) => {
                                            return (
                                                <FormControlLabel value={item?._id}
                                                    control={<Radio />} label={item?.name} />

                                            )
                                        })
                                    }

                            </RadioGroup>
                        </div>
                    </div>
                    <div className='filterBox mb-5' >
                        <h6>Brands</h6>
                        <div className='scroll' >

                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={filterBrand}
                                defaultValue=""
                                onChange={handleChangeBrand}
                            >


                                <FormControlLabel value=""
                                    control={<Radio />} label="All Brands" />

                                {
                                    props.brandData?.lenght !== 0 && props.brandData?.map((item, index) => {
                                        return (
                                            <FormControlLabel value={item?._id}
                                                control={<Radio />} label={item?.name} />

                                        )
                                    })
                                }
                            </RadioGroup>

                            <ul>
                            </ul>
                        </div>
                    </div>

                    {/* <div className='filterBox mb-5' >
                        <h6>FILTER BY PRICE</h6>
                        <RangeSlider value={Value_} onInput={setValue_} min={100} max={60000} step={5} />
                        <div className='d-flex pt-2 priceRange' >
                            <span>From: <strong className='text-dark' >Rs: {Value_[0]} </strong> </span>
                            <span className='ml-auto'>Form: <strong className='text-dark'>Rs:{Value_[1]}</strong> </span>

                        </div>
                    </div> */}


                    <br /><br />
                </div>


            </div>
        </>
    )
}

export default Sidebar;