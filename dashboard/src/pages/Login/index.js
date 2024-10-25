import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg'
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MyContext } from "../../App";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";
import googleIcon from "../../assets/images/GoogleImg.png";
import CircularProgress from "@mui/material/CircularProgress";
import { postUser , postData_v2 } from "../../utils/api";


import firebaseApp from "../../firebase"; 

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();




const Login = () => {

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false)
    const context = useContext(MyContext)
    const [isLoding, setIsLoading] = useState(false)


    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
        isAdmin: true
    })



    useEffect(() => {
        context.setisHideSidebarAndHeader(true)
    }, [])

    const focusInput = (index) => {
        setInputIndex(index);
    }

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }


    const SignIn = (e) => {
        e.preventDefault()

        if (formFields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "name can not be blank"
            })
            return false;
        }

        if (formFields.password === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "name can not be blank"
            })
            return false;
        }

        setIsLoading(true)
        postData_v2("/api/user/signin", formFields).then((res) => {
            try {


                if (res.error !== true) {
                    localStorage.setItem("token", res.token);

                    const user = {
                        name: res.user?.name,
                        email: res.user?.email,
                        userId: res.user?._id,
                        admin : res.user?.admin
                    }

                    localStorage.setItem("user", JSON.stringify(user))


                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "User Login successfully"
                    })
                    setTimeout(() => {
                        setIsLoading(false)
                        window.location.href = "/dashboard"
                    }, 1000)

                }

                else {

                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Invalid credentials!"
                    })
                    setIsLoading(false)

                }


            } catch (error) {
                setIsLoading(false)

                console.log(error);

            }

        })
    }



    const LoginWithGoogle = () => {
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
                            admin : res.user?.admin
                        };

                        localStorage.setItem("user", JSON.stringify(user));

                        context.setAlertBox({
                            open: true,
                            error: false,
                            msg: res.msg
                        });

                        setTimeout(() => {
                            setIsLoading(false);
                            window.location.href = "/dashboard"
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
        <section className="loginSection" >
            <div className="loginBox m-auto" >
                <div className="logo text-center" >
                    <div className="logo text-center" >
                        <img src={Logo} className="rounded-50" width="60px" />
                        <h5 className="font-weight-bold" > Login to AbrWatches</h5>
                    </div>
                </div>


                <div className="wrapper mt-4 card border mb-0" >
                    <form onSubmit={SignIn} >
                        <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`} >
                            <span className="icon"> <MdEmail /> </span>
                            <input type="text" className="form-control"
                                placeholder="entrer your email" onFocus={() => focusInput(0)} onBlur={() => setInputIndex(null)}
                                autoFocus name="email" onChange={onChangeInput} />
                        </div>
                        <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`} >
                            <span className="icon"> <RiLockPasswordFill /> </span>
                            <input type={`${isShowPassword === true ? 'text' : 'password'}`} className="form-control"
                                placeholder="entrer your password" onFocus={() => focusInput(1)} onBlur={() => setInputIndex(null)}
                                name="password" onChange={onChangeInput} />

                            <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)} >

                                {
                                    isShowPassword === true ? < IoMdEyeOff /> : < IoMdEye />
                                }

                            </span>

                        </div>


                        <div className="form-group">
                            <Button type="submit" className="btn-blue btn-lg w-100" >
                                {
                                    isLoding === true ? <CircularProgress /> : 'Sign In'
                                }
                            </Button>
                        </div>

                        <div className="form-group text-center " >
                            <Link to={'/forget-password'} className="link" >FORGET PASSWORD ? </Link>
                            <div className="d-flex align-items-center justify-content-center or mt-3 mb-3" >
                                <span className="line"></span>
                                <span className="txt">or</span>
                                <span className="line"></span>
                            </div>
                        </div>

                        <Button  onClick={LoginWithGoogle} variant="outlined" className="w-100 btn-big btn-lg loginWithGoogle" >
                            <img src={googleIcon} width="25px" />   &nbsp; Sign In with Google
                        </Button  >

                    </form>
                </div>


                <div className="wrapper mt-4 card border footer p-3" >
                    <span className="text-center" >
                        Don't have an account ?
                        <Link to={"/signUp"} className="link color ml-2" > Register</Link>
                    </span>
                </div>

            </div>
        </section>
    )
}

export default Login; 