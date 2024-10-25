import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import { createContext, useEffect, useState, useRef } from 'react';
import ProductUpload from './pages/Products/addProduct';
import CategoryAdd from './pages/Category/addCategory';
import Category from './pages/Category/categoryList';
import Products from './pages/Products';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from 'react-top-loading-bar';
import EditCategory from './pages/Category/editCategory';
import EditProduct from './pages/Products/editProduct'
import { fetchDataFromApi } from './utils/api';

import BrandList from './pages/Brand/BrandList'
import BrandAdd from './pages/Brand/addBrand'
import BrandEdit from './pages/Brand/editBrand';
import AddHomeBannerSlide from './pages/HomeBanner/addHomeSlide';
import HomeSlidesList from './pages/HomeBanner/homeSlideList';
import EditHomeBannerSlide from './pages/HomeBanner/editHomeSlide'
import Orders from './pages/Orders'



const MyContext = createContext();

function App() {

  const [isToggleSidebar, setisToggleSidebar] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false)
  const [catData, setCatData] = useState([]);
  const [brandData, setBrandData] = useState([])
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  })

  const [progress, setProgress] = useState(0);



  const [alertBox, setAlertBox] = React.useState({
    msg: '',
    error: false,
    open: false
  })
  const [open, setOpen] = React.useState(false)
  const [msg, setMsg] = React.useState("");


  const handleClick = () => {
    setOpen(true);
  };



  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== null && token !== undefined && token !== null) {

      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem('user'));

      setUser(userData)

    } else {
      setIsLogin(false)
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



  useEffect(() => {
    setProgress(20)
    fetchCategory();
    fetchBrand();
  }, [])

  const fetchCategory = () => {
    fetchDataFromApi('/api/category').then((res) => {
      setCatData(res);
      setProgress(100);
    })
  }


  const fetchBrand = () => {
    fetchDataFromApi('/api/brand').then((res) => {
      setBrandData(res);
      setProgress(100);
    })
  }



  const values = {
    setisToggleSidebar,
    isToggleSidebar,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    isLogin,
    setIsLogin,
    alertBox,
    setAlertBox,
    setProgress,
    progress,
    catData,
    fetchCategory,
    fetchBrand,
    setUser,
    user,
    brandData,
    setBrandData
  }



  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values} >

          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            className='topLoadingBar'
          />

          <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={alertBox.error === true ? "error" : "success"} // Corrected here
              variant="filled"
              sx={{ width: '100%' }}
            >
              {alertBox.msg}
            </Alert>
          </Snackbar>
          {
            isHideSidebarAndHeader !== true && <Header />
          }


          <div className='main d-flex ' >
            {
              isHideSidebarAndHeader !== true &&
              <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''} `} >
                <Sidebar />
              </div>
            }



            <div className={`content ${isHideSidebarAndHeader === true ? 'full' : ''} ${isToggleSidebar === true ? 'toggle' : ''} `} >
              <Routes>
                <Route path="/" exact={true} element={<Dashboard />} />
                <Route path="/dashboard" exact={true} element={<Dashboard />} />
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/signUp" exact={true} element={<SignUp />} />
                <Route path="/products" exact={true} element={<Products />} />
                <Route path='/product/upload' exact={true} element={<ProductUpload />} ></Route>
                <Route path='/product/edit/:id' exact={true} element={<EditProduct />} ></Route>
                <Route path='/category' exxact={true} element={<Category />} />
                <Route path='/category/add' exact={true} element={<CategoryAdd />} ></Route>
                <Route path='/category/edit/:id' exact={true} element={<EditCategory />} ></Route>
                <Route path='/brand' exact={true} element={< BrandList />} />
                <Route path='/brand/add' exact={true} element={<BrandAdd />} ></Route>
                <Route path='/brand/edit/:id' exact={true} element={<BrandEdit />} ></Route>
                <Route path='/homeBannerSlide/add' exact={true} element={<AddHomeBannerSlide />} ></Route>
                <Route path='/homeBannerSlide/list' exact={true} element={<HomeSlidesList />} ></Route>
                <Route path='/homeBannerSlide/edit/:id' exact={true} element={<EditHomeBannerSlide />} ></Route>
                <Route path='/orders' exact={true} element={<Orders />} ></Route>
              </Routes>
            </div>
          </div>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };

