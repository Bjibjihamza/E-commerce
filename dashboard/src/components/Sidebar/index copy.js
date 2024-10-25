import Button from '@mui/material/Button';
import { RxDashboard } from 'react-icons/rx';
import { FaAngleRight } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { IoMdLogOut } from 'react-icons/io';
import { MyContext } from '../../App';



const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setisToggleSubmenu] = useState(false)


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
                                <li><Link to="/product/details">Product View</Link></li>
                                <li><Link to="/product/upload">Product Upload</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="" >
                            <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(2)} >
                                <span className='icon' ><FaCartArrowDown /></span>
                                Orders
                                <span className='arrow' ><FaAngleRight /></span>
                            </Button>
                        </Link>

                    </li>
                    <li>
                        <Link to="" >
                            <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(3)} >
                                <span className='icon' ><MdMessage /></span>
                                Messages
                                <span className='arrow' ><FaAngleRight /></span>
                            </Button>
                        </Link>

                    </li>
                    <li>
                        <Link to="" >
                            <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(4)} >
                                <span className='icon' ><FaBell /></span>
                                Notifications
                                <span className='arrow' ><FaAngleRight /></span>
                            </Button>
                        </Link>

                    </li>
                    <li>
                        <Link to="" >
                            <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(5)} >
                                <span className='icon' ><IoIosSettings /></span>
                                Setting
                                <span className='arrow' ><FaAngleRight /></span>
                            </Button>
                        </Link>

                    </li>
                </ul>


                <br/>
                <div className='logoutWrapper' >
                    <div className='logoutBox' >
                        <Button variant='contained' ><IoMdLogOut/> Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;