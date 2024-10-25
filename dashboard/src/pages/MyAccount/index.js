import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const MyAccount = () => {

    const [ isLogin , setIsLogin ] = useState(false)
    const history = useNavigate()

    

    useEffect(() => {
        window.scrollTo(0,0);

        const token = localStorage.getItem("token");
        if(token !== "" && token!== undefined && token!==null){
            setIsLogin(true)
        }else {
            history("signIn")
        }
    },[])







    return(
        <section className='section' >
            <div className='container' >
                <div className='hd' >My Account </div>
            </div>
        </section>
    )
}

export default MyAccount;