import Button from '@mui/material/Button';
import { RxDashboard } from 'react-icons/rx';
import { useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { IoMdLogOut } from 'react-icons/io';
import { MyContext } from '../../App';
import { FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 



const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setisToggleSubmenu] = useState(false)
    const [ isLogin , setIsLogin ] = useState(false)

    const history = useNavigate();


    useEffect(() => { 

        const token = localStorage.getItem('token');    
        if(token!==null && token!==undefined && token!==null ){
          setIsLogin(true);
            const user = JSON.parse(localStorage.getItem("user"));
    
            if (user.admin === false) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "please Login as Admin"
                });
    
                history("/login")
            } 
        }
        else {
          history('/login')
        }

            // const user = JSON.parse(localStorage.getItem("user"));
    
            // if (user.admin === false) {
            //     context.setAlertBox({
            //         open: true,
            //         error: true,
            //         msg: "please Login as Admin"
            //     });
    
            //     context.setisOpenProductModal(true)
            //     history("/login")
            // } 
        
    
        } ,[])





    const context = useContext(MyContext)

    const isOpenSubmenu = (index) => {
        setActiveTab(index)
        setisToggleSubmenu(!isToggleSubmenu)
    }

    return (
        <>
            <div className='sidebar' >
                <ul>
                    <li>
                        <Link to="" >
                            <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)} >
                                <span className='icon' ><RxDashboard /></span>
                                Dashboard
                                <span className='arrow' ><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(1)} >
                            <span className='icon' ><FaProductHunt /></span>
                            Products
                            <span className='arrow' ><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'} `} >
                            <ul className='submenu' >
                                <li><Link to="/products">Product List</Link></li>
                                <li><Link to="/product/upload">Product Upload</Link></li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(2)} >
                            <span className='icon' ><FaProductHunt /></span>
                            Category
                            <span className='arrow' ><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'} `} >
                            <ul className='submenu' >
                                <li><Link to="/category">Category List</Link></li>
                                <li><Link to="/category/add">Add a Category</Link></li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <Button className={`w-100 ${activeTab === 3 && isToggleSubmenu === true ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(3)} >
                            <span className='icon' ><FaProductHunt /></span>
                            Brand
                            <span className='arrow' ><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu === true ? 'colapse' : 'colapsed'} `} >
                            <ul className='submenu' >
                                <li><Link to="/brand">Brand List</Link></li>
                                <li><Link to="/brand/add">Add a Brand</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 4 && isToggleSubmenu === true ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(4)} >
                            <span className='icon' ><FaProductHunt /></span>
                            Home Banner Slides
                            <span className='arrow' ><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenu === true ? 'colapse' : 'colapsed'} `} >
                            <ul className='submenu' >
                                <li><Link to="/homeBannerSlide/list">Home Slides List</Link></li>
                                <li><Link to="/homeBannerSlide/add">Add Home Banner Brand</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <NavLink exact activeClasseName='is-active' to='/orders' >
                            <Button className={`w-100 ${activeTab === 5 && isToggleSubmenu === true ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(5)} >
                                <span className='icon' ><FaClipboardCheck  /></span>
                                Orders
                            </Button>
                        </NavLink>

                    </li>
                </ul>

                <br />
                <div className='logoutWrapper' >
                    <div className='logoutBox' >
                        <Button variant='contained' ><IoMdLogOut /> Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;