import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MyContext } from "../../App";
import { IoMdEye, IoMdHome } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import googleIcon from '../../assets/images/GoogleImg.png';

import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "@mui/icons-material/CheckBox";
import { FaPhoneAlt } from "react-icons/fa";
import { postUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


import firebaseApp from "../../firebase";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();



const SignUp = () => {
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);
    const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
    const [isLoding, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        isAdmin: false
    });

    const history = useNavigate();
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
        window.scrollTo(0, 0);
    }, []);

    const focusInput = (index) => {
        setInputIndex(index);
    };

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }));
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const SignUp = async (e) => {
        e.preventDefault();


        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Name cannot be blank."
            });
            return false;
        }

        if (formFields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Email cannot be blank."
            });
            return false;
        }

        if (formFields.phone === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Phone number cannot be blank."
            });
            return false;
        }

        if (formFields.password === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Password cannot be blank."
            });
            return false;
        }

        // Validate password for minimum 8 characters
        if (!validatePassword(formFields.password)) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The password must be at least 8 characters long."
            });
            return false;
        }

        if (formFields.confirmPassword === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Confirm password cannot be blank."
            });
            return false;
        }

        if (formFields.confirmPassword !== formFields.password) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Passwords do not match."
            });
            return false;
        }

        setIsLoading(true);

        try {
            const res = await postUser("/api/user/signup", formFields);

            // If the server response has an error
            if (!res.error) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Inscription réussie"
                });

                setTimeout(() => {
                    setIsLoading(false);
                    history("/signIn");
                }, 1000);
            } else {
                // Handle specific server errors here
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res.msg || "An unknown error occurred."
                });
            }
        } catch (error) {
            // This block will catch network errors or other unexpected issues
            setIsLoading(false);

            // If the error response comes from the server, extract the error message
            if (error.response && error.response.data && error.response.data.msg) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: error.response.data.msg
                });
            } else {
                // Handle other types of errors (network, etc.)
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Something went wrong. Please try again."
                });
            }

            console.error('Error submitting data:', error);
        }

    };


    const SignUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    images: user.providerData[0].photoURL,
                    phone: user.providerData[0].phoneNumber
                };


                postUser("/api/user/authWithGoogle", fields).then((res) => {
                    try {
                        if (res.error !== true) {
                            localStorage.setItem("token", res.token);
                            const user = {
                                name: res.user?.name,
                                email: res.user?.email,
                                userId: res.user?._id,
                                admin: res.user?.admin
                            };

                            localStorage.setItem("user", JSON.stringify(user));

                            context.setAlertBox({
                                open: true,
                                error: false,
                                msg: res.msg
                            });

                            setTimeout(() => {
                                setIsLoading(false);
                                window.location.href = '/';
                                history('/')
                            }, 1000);
                        } else {
                            context.setAlertBox({
                                open: true,
                                error: false,
                                msg: res.msg
                            });
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
                });

                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "User authenticated successfully!"
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: errorMessage
                });
            });
    };

    return (
        <section className="loginSection signUpSection">
            <div className="row">
                <div className="loginBox m-auto">
                    <div className="logo text-center">
                        <img src={Logo} width="60px" alt="Logo" />
                        <h5 className="font-weight-bold"> Register a new account</h5>
                    </div>
                    <div className="wrapper mt-4 card border mb-0">
                        <form onSubmit={SignUp}>
                            <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                <span className="icon"> <FaUserCircle /> </span>
                                <input type="text" className="form-control"
                                    placeholder="Enter your name" onFocus={() => focusInput(0)} onBlur={() => setInputIndex(null)}
                                    autoFocus name="name" onChange={onChangeInput} />
                            </div>
                            <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                <span className="icon"> <MdEmail /> </span>
                                <input type="text" className="form-control"
                                    placeholder="Enter your email" onFocus={() => focusInput(1)} onBlur={() => setInputIndex(null)}
                                    name="email" onChange={onChangeInput} />
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 2 && 'focus'}`}>
                                <span className="icon"> <FaPhoneAlt /> </span>
                                <input type="text" className="form-control"
                                    placeholder="Enter your phone" onFocus={() => focusInput(2)} onBlur={() => setInputIndex(null)}
                                    name="phone" onChange={onChangeInput} />
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 3 && 'focus'}`}>
                                <span className="icon"> <RiLockPasswordFill /> </span>
                                <input type={`${isShowPassword === true ? 'text' : 'password'}`} className="form-control"
                                    placeholder="Enter your password" onFocus={() => focusInput(3)} onBlur={() => setInputIndex(null)}
                                    name="password" onChange={onChangeInput} />

                                <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
                                    {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                                </span>
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 4 && 'focus'}`}>
                                <span className="icon"> <IoShieldCheckmarkSharp /> </span>
                                <input type={`${isShowConfirmPassword === true ? 'text' : 'password'}`} className="form-control"
                                    placeholder="Confirm your password" onFocus={() => focusInput(4)} onBlur={() => setInputIndex(null)}
                                    name="confirmPassword" onChange={onChangeInput} />

                                <span className="toggleShowPassword" onClick={() => setisShowConfirmPassword(!isShowConfirmPassword)}>
                                    {isShowConfirmPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                                </span>
                            </div>

                            <FormControlLabel control={<CheckBox />} label="I agree to the all Terms & Conditions" />

                            <div className="form-group">
                                <Button type="submit" className="btn-blue btn-lg w-100">
                                    {isLoding === true ? <CircularProgress /> : 'Sign Up'}
                                </Button>
                            </div>

                            <div className="form-group text-center">
                                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                    <span className="line"></span>
                                    <span className="txt">or</span>
                                    <span className="line"></span>
                                </div>
                            </div>
                            <Button onClick={SignUpWithGoogle} variant="outlined" className="w-100 btn-big btn-lg loginWithGoogle">
                                <img src={googleIcon} width="25px" alt="Google" /> &nbsp; Sign Up with Google
                            </Button>
                        </form>
                    </div>
                    <div className="wrapper mt-4 card border footer p-3">
                        <span className="text-center d-block mt-3">
                            Already have an account?
                            <Link to={"/login"} className="link color ml-2">Sign In</Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
