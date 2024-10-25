import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Header from "./Components/Header";
import { RiWhatsappFill } from "react-icons/ri";
import { createContext, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { fetchDataFromApi, postData_v2 } from "./utils/api";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MyList from "./Pages/MyList";
import Chekout from "./Pages/Chekout"
import MyAccount from "./Pages/MyAccount"
import Men from "./Pages/Men"
import Women from "./Pages/Women"
import Poquet from "./Pages/Class/Poquet";
import Smart from "./Pages/Class/Smart"
import Hand from "./Pages/Class/hand"
import Accesoires from "./Pages/Class/Accesoires";
import Peripheriques from "./Pages/Class/Peripheriques";
import Clockes from "./Pages/Class/clock";
import Machines from "./Pages/Class/machine";
import Orders from './Pages/Orders'
import Reparation from "./Pages/Class/Reparation";
import Checkout from "./Pages/Chekout";
import Watches from "./Pages/watches";
import Electronics from "./Pages/Electronics";
import NotFound from './NotFound';
import Search from "./Pages/Search/index";









const MyContext = createContext();

function App() {

  const [isOpenProductModal, setisOpenProductModal] = useState(
    {
      id: '',
      open: false
    }
  );
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setisLogin] = useState(false)
  const [productData, setProductData] = useState();
  const [cartData, setCartData] = useState()
  const [cartDataId, setCartDataId] = useState()

  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  })


  const [searchData, setSearchData] = useState([]);
  const [categoryData, setCategoryData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [activeCat, setActiveCat] = useState('')
  const [addingInCart, setAddingInCart] = useState(false)



  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: ''
  })





  useEffect(() => {



    const catArr = [];

    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res.categoryList)
      setActiveCat(res.categoryList[0]?._id)
    })


    fetchDataFromApi("/api/brand").then((res) => {
      setBrandData(res.brandList)
    })

    fetchDataFromApi(`/api/cart`).then((res) => {
      setCartData(res)
    })

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartDataId(res)
    })
  }, [])


  const getCartData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res)
    })
  }


  useEffect(() => {
    isOpenProductModal.open === true &&
      fetchDataFromApi(`/api/product/${isOpenProductModal.id}`).then((res) => {
        setProductData(res)
      })

  }, [isOpenProductModal])

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== null && token !== undefined && token !== null) {

      setisLogin(true);
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData)
    } else {
      setisLogin(false)
    }
  }, [isLogin])





  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false,
    })
  };


  const addToCart = (data) => {
    setAddingInCart(true)
    postData_v2(`/api/cart/add`, data).then((res) => {
      if (res.status !== false) {
        setAlertBox({
          open: true,
          error: false,
          msg: "Product is added in the cart"
        })

        setTimeout(() => {
          setAddingInCart(false)
        }, 1000)
        getCartData();

      } else {
        setAlertBox({
          open: true,
          error: true,
          msg: "Product already aded to Cart"
        })

        setAddingInCart(false)

      }
    }
    )


  }


  const values = {
    setisOpenProductModal,
    isOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setisLogin,
    categoryData,
    setCategoryData,
    brandData,
    setBrandData,
    activeCat,
    setActiveCat,
    alertBox,
    setAlertBox,
    addToCart,
    addingInCart,
    setAddingInCart,
    setCartData,
    cartData,
    cartDataId,
    setCartDataId,
    getCartData,
    searchData,
    setSearchData
  }


  return (
    <>
      <BrowserRouter>

        <MyContext.Provider value={values} >

          <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={alertBox.error === true ? "error" : "success"}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {alertBox.msg}
            </Alert>
          </Snackbar>



          {
            isHeaderFooterShow === true && <Header />
          }

          {
            isHeaderFooterShow === true &&
            <a target="_blank" href="https://wa.me/+212634057093">
              <div className="wh-fixed" >
                <RiWhatsappFill />
              </div>
            </a>

          }




          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/cat" exact={true} element={<Listing />} />
            <Route exact={true} path="/product/:id" element={<ProductDetails />} />
            <Route exact={true} path="/Cart" element={<Cart />} />
            <Route exact={true} path="/signIn" element={<SignIn />} />
            <Route exact={true} path="/signUp" element={<SignUp />} />
            <Route exact={true} path="/my-list" element={<MyList />} />
            <Route exact={true} path="/checkout" element={<Chekout />} />
            <Route exact={true} path="/my-account" element={<MyAccount />} />
            <Route exact={true} path="/Men" element={<Men />} />
            <Route exact={true} path="/women" element={<Women />} />
            <Route exact={true} path="/poquets" element={<Poquet />} />
            <Route exact={true} path="/smart" element={<Smart />} />
            <Route exact={true} path="/hand" element={<Hand />} />
            <Route exact={true} path="/accesoires" element={<Accesoires />} />
            <Route exact={true} path="/peripheriques" element={<Peripheriques />} />
            <Route exact={true} path="/clock" element={<Clockes />} />
            <Route exact={true} path="/reparation" element={<Reparation />} />
            <Route exact={true} path="/machine" element={<Machines />} />
            <Route exact={true} path="/orders" element={<Orders />} />
            <Route exact={true} path="/checkout" element={<Checkout />} />
            <Route exact={true} path="/watches" element={<Watches />} />
            <Route exact={true} path="/Electronics" element={<Electronics />} />
            <Route exact={true} path="/search" element={<Search />} />

            <Route path="*" element={<NotFound />} />

          </Routes>



          {
            isHeaderFooterShow === true && <Footer />
          }

          {
            isOpenProductModal.open === true && <ProductModal data={productData} />
          }

        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext }
