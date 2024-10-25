import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { IoMdCloudUpload } from "react-icons/io";
import { deletData, deleteImages, editData, fetchDataFromApi, postData } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { MyContext } from "../../App";





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const MyAccount = () => {

  const [isLogin, setIsLogin] = useState(false)
  const history = useNavigate()
  const theme = useTheme();
  const [value, setValue] = React.useState(0);


  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userData, setUserData] = useState([])

  const [previews, setPreviews] = useState([])

  let { id } = useParams();
  const context = useContext(MyContext);


  const formdata = new FormData()

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    images: [],
  });

  const [fields, setFields] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });



  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true)
    } else {
      history("signIn")
    }

  }, [])




  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setUserData(res);
      setFormFields({
        name: res.name,
        email: res.email,
        phone: res.phone,
      })

      setPreviews(res.images);




      (async () => {
        try {
          const imagesData = await fetchDataFromApi('/api/imageUpload');
          if (imagesData?.length > 0) {
            await deletData('/api/imageUpload/deleteAllImages');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification ou suppression des images', error);
        }
      })();

      postData('/api/imageUpload/createIm', res.images);
    }
    )
  }, [])




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const changeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const changeInput2 = (e) => {
    const { name, value } = e.target;
    setFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };








  let img_arr = [];
  let uniqueArray = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {

      const files = e.target.files;

      setUploading(true);

      let newPreviews = [...previews];

      // Loop through all selected files
      for (let i = 0; i < files.length; i++) {
        // Validate the file type
        if (files[i] && (
          files[i].type === 'image/jpeg' ||
          files[i].type === 'image/jpg' ||
          files[i].type === 'image/png' ||
          files[i].type === 'image/gif' ||
          files[i].type === 'image/bmp' ||
          files[i].type === 'image/tiff' ||
          files[i].type === 'image/webp' ||
          files[i].type === 'image/svg+xml' ||
          files[i].type === 'image/heic' ||
          files[i].type === 'image/heif'
        )) {
          const file = files[i];
          formdata.append('images', file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: 'Please select a valid JPG, PNG, or other supported image file.'
          });
          setUploading(false);
          return false;
        }
      }


      await postData(apiEndPoint, formdata).then((res) => {

        fetchDataFromApi('/api/imageUpload').then((response) => {
          if (response && response.length !== 0) {
            let img_arr = [];

            response.forEach(item => {
              if (item?.images && item.images.length !== 0) {
                img_arr.push(...item.images);
              }
            });

            setPreviews(img_arr);
          }
        });

        context.setAlertBox({
          open: true,
          error: false,
          msg: "Images uploaded successfully!"
        });

      }).catch(error => {
        console.log('Error uploading files:', error);
      }).finally(() => {
        setUploading(false);
      });

    } catch (error) {
      console.log('Error:', error);
      setUploading(false);
    }

  };



  const edituser = (e) => {
    e.preventDefault();

    formdata.append('name', formFields.name)
    formdata.append('email', formFields.email)
    formdata.append('phone', formFields.phone)

    formFields.images = previews

    if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "" &&
      previews.length !== 0) {
      setIsLoading(true);
      console.log(formFields)

      const user = JSON.parse(localStorage.getItem('user'));

      editData(`/api/user/${user?.userId}`, formFields).then(res => {
        setIsLoading(false);
        history('/category');
      })

    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please fill all the details'
      });
      return false;
    }
  }

  const changePassword = (e) => {
    e.preventDefault();
    formdata.append('password', formFields.password);

    if (fields.oldPassword !== "" && fields.password !== "" && fields.confirmPassword !== "") {

      if (fields.password !== fields.confirmPassword) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Password and confirm password not match'
        });


      } else {
        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
          name: user?.name,
          email: user?.email,
          password: fields.oldPassword,
          newPass: fields.password,
          phone: formFields.phone,
          images: formFields.images,
        }

        editData(`/api/user/changePassword/${user.userId}`, data).then((res) => {
          context.setAlertBox({
            open: true,
            error: false,
            msg: 'Password change successfully'
          });
        })
      }



    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please fill all the details'
      });
      return false;
    }
  };








  return (
    <section className='section myAccountPage ' >
      <div className='container' >
        <h2 className='hd' >My Account </h2>

        <Box className="myAccBox card  border-0" >
        <AppBar position="static">
  <Tabs
    value={value}
    onChange={handleChange}
    indicatorColor="secondary"
    textColor="inherit"
    variant="fullWidth"
    className="full-width-tabs"
  >
    <Tab 
      label="Edit Profile" 
      {...a11yProps(0)} 
      style={{ backgroundColor: '#FFA52A' }}
    />
    <Tab 
      label="Change Password" 
      {...a11yProps(1)} 
      style={{ backgroundColor: '#FFA52A' }}
    />
  </Tabs>
</AppBar>


          <TabPanel value={value} index={0} dir={theme.direction}>
            <form onSubmit={edituser} >

              <div className='row' >
                <div className='col-md-4'>
                  <div className='userImage'   >
                    {
                      previews?.length !== 0 && previews?.map((img, index) => {
                        return (
                          <img src={img} key={index} />
                        )
                      })
                    }
                    <div className='overlay d-flex align-items-center justify-content-center ' >
                      <IoMdCloudUpload />
                      <input type='file' onChange={(e) =>
                        onChangeFile(e, '/api/user/upload')}
                        name="images"
                      />
                    </div>
                  </div>

                </div>

                <div className='col-md-8' >
                  <div className='row' >
                    <div className='col-md-6' >
                      <div className='form-group' >
                        <TextField label="Name" variant='outlined'
                          className='w-100' name='name' onChange={changeInput} value={formFields.name} />
                      </div>
                    </div>

                    <div className='col-md-6' >
                      <div className='form-group' >
                        <TextField label="Email" disabled variant='outlined'
                          className='w-100' name='email' onChange={changeInput} value={formFields.email} />
                      </div>
                    </div>

                    <div className='col-md-6' >
                      <div className='form-group' >
                        <TextField label="Phone" variant='outlined'
                          className='w-100' name='phone' onChange={changeInput} value={formFields.phone} />
                      </div>
                    </div>
                  </div>
                  <div className='form-group' >
                    <Button type='submit' className='btn-blue btn-site bg-red btn-lg btn-big'>Save</Button>
                  </div>
                </div>



              </div>
            </form>

          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <form onSubmit={changePassword} >

              <div className='row' >
                <div className='col-md-8' >
                  <div className='row' >
                    <div className='col-md-4' >
                      <div className='form-group' >
                        <TextField label="Old Password" variant='outlined' className='w-100'
                          name='oldPassword' onChange={changeInput2}
                        />
                      </div>
                    </div>

                    <div className='col-md-4' >
                      <div className='form-group' >
                        <TextField label="New Password" variant='outlined' className='w-100'
                          name='password' onChange={changeInput2}

                        />
                      </div>
                    </div>

                    <div className='col-md-4' >
                      <div className='form-group' >
                        <TextField label="Confirm Password" variant='outlined' className='w-100'
                          name='confirmPassword' onChange={changeInput2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-group' >
                    <Button type='submit' className='btn-blue btn-site bg-red btn-lg btn-big'>Save</Button>
                  </div>
                </div>
              </div>
            </form>
          </TabPanel>
        </Box>
      </div>
    </section>
  )
}

export default MyAccount;