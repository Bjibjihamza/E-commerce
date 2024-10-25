import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { IoShieldHalfSharp } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';




const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
    const isAccountMenuOpen = Boolean(anchorEl);
    const isNotificationsOpen = Boolean(anchorNotificationEl);


    const context = useContext(MyContext)
    const history = useNavigate()

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
        setAnchorNotificationEl(null);
    };

    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null)
        localStorage.clear();
        context.setIsLogin(false)


        context.setAlertBox({
            open: true,
            error: false,
            msg: "Logout successful"
        })


        setTimeout(() => {
            history("/login")
        }, 1000)
    }

    return (
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className="d-flex flex-column align-items-center logo p-2" >
                                <img src={logo} alt="Logo" className='rounded' />
                                <span className="ml-2">AbrWatches</span>
                            </Link>
                        </div>

                        <div className="col-sm-3 part2 d-flex align-items-center">
                            <Button className="mr-3 rounded-circle" onClick={() => context.setisToggleSidebar(!context.isToggleSidebar)} >
                                {
                                    context.isToggleSidebar === false ? <MdMenuOpen /> : <MdOutlineMenu />
                                }
                            </Button>
                        </div>

                        <div className="col-sm-7 part3 d-flex align-items-center justify-content-end">
                            <div className='dropdownWrapper position-relative' >
                            </div>

                            
                            {
                                context.isLogin !== true ? <Link to={'/login'} ><Button className='btn-blue btn-lg btn-round'>Sign In</Button></Link> :

                                    <div className="myAccWrapper" >
                                        <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                                            {context.user?.name?.charAt(0)}
                                            <div className="userInfo">
                                                <h4>{context.user?.name}</h4>
                                                <p className="mb-0">{context.user?.email}</p>
                                            </div>
                                        </Button>

                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={isAccountMenuOpen}
                                            onClose={handleCloseMyAccDrop}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleCloseMyAccDrop}>
                                                <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon>
                                                My Account
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseMyAccDrop}>
                                                <ListItemIcon><IoShieldHalfSharp /></ListItemIcon>
                                                Reset Password
                                            </MenuItem>
                                            <MenuItem onClick={logout}>
                                                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>

                                    </div>
                            }


                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
