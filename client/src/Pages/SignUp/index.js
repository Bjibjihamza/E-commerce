import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { postUser } from "../../utils/api"; 
import GoogleImg from '../../assets/images/GoogleImg.png';


import firebaseApp from "../../firebase"; 

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();



const SignUp = () => {
    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        isAdmin: false
    });

    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const onChangeInput = (e) => {
        setFormFields((prevFields) => ({
            ...prevFields,
            [e.target.name]: e.target.value
        }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    const validatePasswordStrength = (password) => {
        return password.length >= 8;
    };
    

    const Register = async (e) => {
        e.preventDefault();

        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The name cannot be empty."
            });
            return;
        }

        if (!validatePhone(formFields.phone)) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The phone number must contain exactly 10 digits."
            });
            return;
        }

        if (formFields.email === "" || !validateEmail(formFields.email)) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please enter a valid email."
            });
            return;
        }

        if (!validatePhone(formFields.phone)) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The phone number must contain exactly 10 digits."
            });
            return;
        }

        if (!validatePasswordStrength(formFields.password)) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The password must be at least 8 characters long."
            });
            return;
        }

        if (formFields.confirmPassword !== formFields.password) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "The passwords do not match."
            });
            return;
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


    const signUpWithGoogle = () => {
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
        <section className="section signInPage SignUpPage">
            <div className="container signInPage_Contianer ">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo} className="rounded-50" width="90px" alt="logo" />
                    </div>
                    <form className="mt-3" onSubmit={Register}>
                        <h2>Sign Up</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Name" name="name" onChange={onChangeInput} type="text" variant="standard" className="w-100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Phone" name="phone" onChange={onChangeInput} type="text" variant="standard" className="w-100" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <TextField label="Email" name="email" onChange={onChangeInput} type="email" variant="standard" className="w-100" />
                        </div>

                        <div className="form-group">
                            <TextField label="Password" name="password" onChange={onChangeInput} type="password" variant="standard" className="w-100" />
                        </div>
                        <div className="form-group">
                            <TextField label="Confirm Password" name="confirmPassword" onChange={onChangeInput} type="password" variant="standard" className="w-100" />
                        </div>

                        <div className="d-flex align-items-center mt-4 mb-3 row gap-1">
                            <div className="row w-100">
                                <div className="col-9 pl-2 pr-1 p-0">
                                    <Button type="submit" disabled={isLoading} className="btn-site bt btn-blue w-100 btn-lg btn-big"
                                       style ={{maxHeight:'45px'}} 
                                    >
                                        {isLoading ? <CircularProgress /> : 'Sign Up'}
                                    </Button>
                                </div>
                                <div className="col-3 p-0">
                                    <Link to="/"><Button className="btn-lg btn-cancel btn-big col m-1 btn-med" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                                </div>
                            </div>
                        </div>

                        <p className="fs-6">Already have an account? <a href="/signIn"><Button className="border-effect">Sign In</Button></a></p>

                        <h6 className="mt-3 text-center font-weight-bold">Or continue with Google</h6>
                        <Button onClick={signUpWithGoogle} className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} alt="Google" />Sign up with Google</Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
