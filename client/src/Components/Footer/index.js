import { useContext } from 'react';
import { LuShirt } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Button from '@mui/material/Button';
import FooterLogo from '../../assets/images/logo.jpg';
import { MyContext } from "../../App";
import { useEffect, useState } from 'react';

const Footer = () => {
    // This script removes the "email" parameter from the URL
    if (window.location.href.indexOf("email") > -1) {
        var clean_url = window.location.href.split("?")[0];
        window.history.replaceState({}, document.title, clean_url);
    }

    const context = useContext(MyContext);

    const [formFields, setFormFields] = useState({
        email: "",
    });

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }));
    }

    const Subscribe = (e) => {
        e.preventDefault(); // Prevents the page reload
        if (context.isLogin) {
            if (formFields.email !== "") {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Thanks for the subscription <3"
                });
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Please enter a valid email"
                });
            }
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please login first"
            });
        }
    }

    return (
        <>
            <footer className="bg-black">
                <div className="container part-1">
                    <div className="row">

                        <div className="col-sm-3">
                            <div className="FooterLogo">
                                <img className="rounded-50" src={FooterLogo} alt="Footer Logo" />
                                <p>ABR TETOUANIWATCHES</p>
                            </div>
                            <div className="FooterAboutPart">
                                <h2>About Us</h2>
                                <p>After following these steps, your pagination bullets will appear as small dots, </p>
                            </div>
                            <div className="FooterContactPart">
                                <h2>Contact Us</h2>
                                <p className="mb-0"><FaPhoneAlt />+212 63405-7093</p>
                                <p><IoMdMail />abrtetouaniwatches@gmail.com</p>
                            </div>
                        </div>

                        <div className="col-sm-3 FooterList">
                            <h3>Shop</h3>
                            <ul>
                                <Link to="/men"><li>Men watches</li></Link>
                                <Link to="/women"><li>Women watches</li></Link>
                                <Link to="/watches"><li>Watches</li></Link>
                                <Link to="/accesoires"><li>Accesoires</li></Link>
                                <Link to="/electronics"><li>Electronics</li></Link>
                                <Link to="/autres"><li>Autres</li></Link>
                            </ul>
                        </div>

                        <div className="col-sm-3 FooterList">
                            <h3>Helpful Links</h3>
                            <ul>
                                <Link to=""><li>Services</li></Link>
                                <Link to=""><li>Supports</li></Link>
                                <Link to=""><li>Terms & Condition</li></Link>
                                <Link to=""><li>Privacy Policy</li></Link>
                            </ul>
                        </div>

                        <div className="col-sm-3 FooterEmail">
                            <h5 className="mb-4"> Subscribe for more info</h5>
                            <form onSubmit={Subscribe}>
                                <IoMdMail />
                                <input type="email" name="email" placeholder="Your Email" onChange={onChangeInput} />
                                <Button type="submit">Subscribe</Button>
                            </form>
                        </div>


                    </div>
                </div>
                <div className="container part-2">
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4 d-flex mt-3 mb-3">
                            <ul className="d-flex align-items-center m-auto list list-inline">
                                <li className="list-inline-item cursor">
                                    <Link to="#"><FaFacebookF /></Link>
                                </li>
                                <li className="list-inline-item cursor ml-2">
                                    <a target="_blank" href="https://wa.me/+212634057093"><FaWhatsapp /></a>
                                </li>
                                <li className="list-inline-item cursor ml-2">
                                    <a href="https://www.instagram.com/abrtetouaniwatches/profilecard/" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram />
                                    </a>

                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4 copyright">
                            <p>2024 &#169; Copyright. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
