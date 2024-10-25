import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext , useEffect } from 'react';
import { MyContext } from '../../App';
import { FaLongArrowAltRight } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaUser } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { ListItemIcon } from '@mui/material';
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";




const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false)
    const open = Boolean(anchorEl);
    const history = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);
    useEffect(() => {
        const handleBodyClick = (event) => {
            if (
                openMenu && 
                !event.target.closest('.nav-left') && 
                !event.target.closest('.menu') 
            ) {
                fcloseMenu();
            }
        };

        document.body.addEventListener('click', handleBodyClick);
    
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [openMenu]);
    

    const Logout = () => {
        setAnchorEl(null)
        localStorage.clear()
        context.setisLogin(false)

        context.setAlertBox({
            open: true,
            error: false,
            msg: "Logout successful"
        })


        setTimeout(() => {
            history("/signIn")
        }, 1000)

    }

    const [openReports, setOpenReports] = useState(false);

    const handleReportsClick = () => {
        setOpenReports(!openReports);
    };

    const fopenMenu = () => {
        setOpenMenu(true)
        document.body.style.overflow = 'hidden';
    }

    const fcloseMenu = () => {
        setOpenMenu(false)
        document.body.style.overflow = 'auto';
    }

    const menuItemStyle = {
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Space between icon and text
        transition: 'background-color 0.2s ease-in-out',
    };








    const context = useContext(MyContext)
    return (
        <>

            <div className="headerWrapper" >
                <header className="header">

                    <div className={`nav-left ${openMenu ? 'active' : ''} d-flex flex-column justify-content-between`}>

                        <div>
                            <div className='d-flex align-items-center justify-content-between p-3' >
                                <div className="logoWrapper p-0 m-0 d-flex align-items-center justify-content-center">
                                    <Link to={'/'}> <img src={Logo} alt='logo' className='rounded-50' /> </Link>
                                </div>
                                <div className='close' onClick={fcloseMenu} >
                                    <IoMdClose />
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-around p-2 Acc_Ship' >

                                {
                                    context.isLogin !== true ? <Link to="/signIn" ><Button className='btn-blue btn-site btn-lg btn-big btn-round mr-3' > Sign In </Button></Link> : <Link to='/my-account'><Button><FaUser className='m-2' />  Account</Button></Link>

                                }

                                <Link><Button><FaShippingFast className='m-2' />Shipping </Button></Link>
                            </div>
                            <Divider />
                            <div className='list-nav-left' >
                                <ul className='d-flex flex-column m-4 list-unstyled' >
                                    <li className=''> <Link to="/" onClick={fcloseMenu} > <span className='buttonNav' >Home</span></Link></li>
                                    <li className=''> <Link to="/men" onClick={fcloseMenu}  > <span className='buttonNav' >Men</span></Link> </li>
                                    <li className=''> <Link to="/women" onClick={fcloseMenu}  > <span className='buttonNav'>Women</span></Link> </li>
                                    <li className=''> <Link to="/cat" onClick={fcloseMenu}  > <span className='buttonNav'>Shop</span>  </Link> </li>
                                    <li className=''> <Link to="/watches" onClick={fcloseMenu}  > <span className='buttonNav'>watches</span></Link></li>
                                    <li className=''> <Link to="/accesoires" onClick={fcloseMenu}  > <span className='buttonNav'>Accesoires</span></Link></li>
                                    <li className=''> <Link to="/Electronics" onClick={fcloseMenu}  > <span className='buttonNav'>Eloctronics</span></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='Apropos p-2' >
                            <div className='ApropsContent' >
                                <h3>A props de</h3>
                                <div className='links p-2 pt-0' >
                                    <Link className='d-flex align-items-center m-2' >
                                        <AiOutlineExclamationCircle className='links-icon' />
                                        <h6 className='m-0 p-1'  >About Us</h6>
                                    </Link>
                                    <Link className='d-flex align-items-center m-2' >
                                        <FaRegEnvelope className='links-icon' />
                                        <h6 className='m-0 p-1'  >Contact Us</h6>
                                    </Link>
                                </div>

                                {
                                    context.isLogin === true &&
                                    < Button onClick={Logout} className='d-flex align-items-center m-2 Logout' >
                                        <IoLogOutOutline className='links-icon' />
                                        <h6 className='m-0 ml-1'  >Log Out</h6>
                                    </Button>
                                }



                            </div>


                        </div>

                    </div>


                    <div className="container" >
                        <div className='pc' >
                            <div className="row" >
                                <div className="logoWrapper d-flex align-items-center justify-content-center  col-sm-3">
                                    <Link to={'/'}> <img src={Logo} alt='logo' className='rounded-50' /> </Link>
                                </div>
                                <div className='col-sm-6 d-flex align-items-center part2' >
                                    <SearchBox />
                                </div>
                                <div className='part3 col-sm-3 d-flex align-items-center ml-auto '>

                                    {
                                        context.isLogin !== true ? <Link to="/signIn" ><Button className='btn-blue btn-site btn-lg btn-big btn-round mr-3' > Sign In </Button></Link> :

                                            <>
                                                <Button onClick={handleClick} className='circle mr-3' > <FaRegUser />   </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="accDrop"
                                                    open={open}
                                                    onClose={handleClose}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <Link to="/my-account" >
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaUser fontSize="small" />
                                                            </ListItemIcon>
                                                            My Account
                                                        </MenuItem>
                                                    </Link>


                                                    <Divider />
                                                    <Link to="/orders" >
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaClipboardCheck fontSize="small" />
                                                            </ListItemIcon>
                                                            Orders
                                                        </MenuItem>
                                                    </Link>

                                                    <Link to="/my-list" >
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaHeart fontSize="small" />
                                                            </ListItemIcon>
                                                            My List
                                                        </MenuItem>
                                                    </Link>

                                                    <MenuItem onClick={Logout}>
                                                        <ListItemIcon>
                                                            <RiLogoutCircleRFill fontSize="small" />
                                                        </ListItemIcon>
                                                        Logout
                                                    </MenuItem>
                                                </Menu>
                                            </>

                                    }

                                    <div className='cartTab d-flex align-items-center' >
                                        <div className='position-relative  ml-1' >
                                            <Link to={`/cart`} ><Button className='circle' > <IoBagOutline /> </Button></Link>

                                            <span className='count d-flex align-items-center justify-content-center' ></span>
                                        </div>
                                    </div>



                                </div>

                            </div>
                            <Navigation />
                        </div>

                        <div className='mobile'>

                            <div className=" d-flex align-items-center justify-content-between w-90 m-auto" >
                                <div className='menu' onClick={fopenMenu} >
                                    <HiMenuAlt1 />
                                </div>
                                <div className="logoWrapper d-flex align-items-center justify-content-center">
                                    <Link to={'/'}> <img src={Logo} alt='logo' className='rounded-50' /> </Link>
                                </div>
                                <div className='part3 d-flex align-items-center '>

                                    {
                                        context.isLogin === true &&

                                        <>
                                            <Button onClick={handleClick} className='circle' > <FaRegUser />   </Button>
                                            <Menu
                                                anchorEl={anchorEl}
                                                id="accDrop"
                                                open={open}
                                                onClose={handleClose}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                style={{
                                                    backgroundColor: '8px',
                                                }}
                                            >
                                                <Link to="/my-account" style={{ textDecoration: 'none', color: '#333' }}>
                                                    <MenuItem onClick={handleClose} style={menuItemStyle}>
                                                        <ListItemIcon>
                                                            <FaUser fontSize="small" />
                                                        </ListItemIcon>
                                                        My Account
                                                    </MenuItem>
                                                </Link>

                                                <Divider style={{ margin: '4px 0', opacity: 0.6 }} />

                                                <Link to="/orders" style={{ textDecoration: 'none', color: '#333' }}>
                                                    <MenuItem onClick={handleClose} style={menuItemStyle}>
                                                        <ListItemIcon>
                                                            <FaClipboardCheck fontSize="small" />
                                                        </ListItemIcon>
                                                        Orders
                                                    </MenuItem>
                                                </Link>

                                                <Link to="/my-list" style={{ textDecoration: 'none', color: '#333' }}>
                                                    <MenuItem onClick={handleClose} style={menuItemStyle}>
                                                        <ListItemIcon>
                                                            <FaHeart fontSize="small" />
                                                        </ListItemIcon>
                                                        My List
                                                    </MenuItem>
                                                </Link>

                                                <MenuItem onClick={Logout} style={menuItemStyle}>
                                                    <ListItemIcon>
                                                        <RiLogoutCircleRFill fontSize="small" />
                                                    </ListItemIcon>
                                                    Logout
                                                </MenuItem>
                                            </Menu>

                                        </>

                                    }


                                    <div className='cartTab d-flex align-items-center' >
                                        <div className='position-relative  ml-1' >
                                            <Link to={`/cart`} ><Button className='circle' > <IoBagOutline /> </Button></Link>
                                            <span className='count d-flex align-items-center justify-content-center' ></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-12 d-flex align-items-center part2' >
                                <SearchBox />
                            </div>
                        </div>



                    </div>
                </header >


            </div >
        </>
    )
}

export default Header;