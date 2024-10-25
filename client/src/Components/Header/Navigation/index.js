import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useContext } from 'react';
import { MyContext } from '../../../App';




const Navigation = () => {

    const [isOpenSidebarVal, setisopenSidebarVal] = useState(false);
    const context  = useContext(MyContext)

    return (
        <nav>
            <div className='container mt-2'>

                <div className='navlist d-flex align-items-center justify-content-center'>
                    <ul className='list list-inline d-flex justify-content-between w-75' >
                        <li className='list-inline-item'> <Link to="/"> <Button>Home</Button></Link></li>

                        <li className='list-inline-item'> <Link to="/men"> <Button>Men</Button></Link> </li>
                        <li className='list-inline-item'> <Link to="/women"> <Button>Women</Button></Link> </li>
                        <li className='list-inline-item'> <Link to="/cat"> <Button>Shop</Button>  </Link> </li>
                        <li className='list-inline-item'> <Link to="/watches"> <Button>watches<IoIosArrowDown/></Button></Link>
                            <div className='submenu shadow' >
                                <Link to="/poquets" ><Button>Poquets Watches</Button></Link>
                                <Link to="/smart" ><Button>Smart Watches</Button></Link>
                                <Link to="/hand" ><Button>Hand Watches</Button></Link>
                                <Link to="/clock" ><Button>Clockes</Button></Link>
                                <Link to="/reparation" ><Button>Reparations</Button></Link>
                            </div>
                        </li>
                        <li className='list-inline-item'> <Link to="/accesoires"> <Button>Accesoires</Button></Link></li>
                        <li className='list-inline-item'> <Link to="/Electronics"> <Button>Eloctronics<IoIosArrowDown/></Button></Link>
                            <div className='submenu shadow' >
                                <Link to="/machine" ><Button>Machines</Button></Link>
                                <Link to="/peripheriques" ><Button>Peripheriques</Button></Link>
                            </div>
                        </li>
                        <li className='list-inline-item'> <Link to="/"> <Button>About us</Button>  </Link> </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;