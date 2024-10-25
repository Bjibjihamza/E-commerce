import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import GoogleImg from '../../assets/images/GoogleImg.png';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { postUser, postData } from "../../utils/api";


import firebaseApp from "../../firebase"; 

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const onChangeInput = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        });
    };
    const login = (e) => {
        e.preventDefault();
        context.setAlertBox({ open: false });

        if (formFields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Email cannot be blank."
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

        setIsLoading(true);

        postUser("/api/user/signin", formFields).then((res) => {
            try {
                if (!res.error) {
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
                        msg: "User logged in successfully!"
                    });

                    setTimeout(() => {
                        setIsLoading(false);
                        history("/");
                    }, 1000);
                } else {
                    setIsLoading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg || "Invalid credentials."
                    });
                }
            } catch (error) {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "An unexpected error occurred. Please try again."
                });
            }
        }).catch((error) => {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Invalid credentials!"
            });
        });
    };

    const signInWithGoogle = () => {
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
                            }, 2000);
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
        <section className="section signInPage">
            <div className="container signInPage_Container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo} className="rounded-50" width="90px" alt="Logo" />
                    </div>
                    <form className="mt-3" onSubmit={login}>
                        <h2>Sign In</h2>
                        <div className="form-group">
                            <TextField
                                id="standard-basic"
                                label="Email"
                                type="email"
                                required
                                variant="standard"
                                className="w-100"
                                name="email"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group mb-1">
                            <TextField
                                id="standard-basic"
                                label="Password"
                                required
                                type="password"
                                variant="standard"
                                className="w-100"
                                name="password"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="d-flex align-items-center mt-5 mb-3 row">
                            <div className="row w-100">
                                <div className="col-md-8">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn-site btn-blue w-100 btn-lg btn-big"
                                    >
                                        {isLoading ? <CircularProgress /> : 'Sign In'}
                                    </Button>
                                </div>
                                <div className="col-md-4">
                                    <a href="/">
                                        <Button
                                            className="btn-lg btn-cancel btn-big col m-1 btn-med"
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <p>Not Registered? <a href="/signUp"><Button className="border-effect cursor">Sign Up</Button></a></p>
                        <h6 className="mt-3 text-center font-weight-bold">Or continue with Google account</h6>
                        <Button
                            className="loginWithGoogle btn-cancel mt-2"
                            variant="outlined"
                            onClick={signInWithGoogle}
                        >
                            <img src={GoogleImg} alt="Google Logo" /> Sign In with Google
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
