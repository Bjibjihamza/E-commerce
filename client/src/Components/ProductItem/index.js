import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from 'react-icons/io';
import vid from '../../assets/vid/vid.mp4'
import Link from '@mui/material/Link';
import { useContext, useState , useEffect } from 'react';
import { MyContext  } from '../../App';
import { fetchDataFromApi, postData_v2  , deletData} from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaHeart } from "react-icons/fa";





const ProductItem = (props) => {


  const [isHovering, setIsHovering] = useState(false);
  const [isAddedToMyList, setAddedToMyList] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const context = useContext(MyContext);
  

  const viewProductDetails = (id) => {
    setTimeout(() => {
      context.setisOpenProductModal({
        id: id,
        open: true
      });
    }, 100);

  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    fetchDataFromApi(`/api/my-list?productId=${props.item?._id}&userId=${user?.userId}`).then((res) => {
      if (res.length !== 0) {
        setAddedToMyList(true)
      }
    })
  } , [])



  const addToMyList = (id) => {

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000);

    setTimeout(() => {
      context.setisOpenProductModal({
        id: id,
        open: false
      });
    }, 102);


    if(isAddedToMyList){

      const user = JSON.parse(localStorage.getItem("user"));
      fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
        deletData(`/api/my-list/${res[0]?._id}`).then((res) => {
          context.setAlertBox({
            open: true,
            error: false,
            msg: "product removed from My List!"
        })
        })
      })
      setAddedToMyList(false)
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user !== undefined && user !== null && user !== "") {
        const data = {
          productTitle: props?.item?.name,
          image: props?.item?.images[0],
          rating: props?.item?.rating,
          price: props?.item?.price,
          productId: id,
          userId: user?.userId
        };
  
        postData_v2(`/api/my-list/add/`, data).then((res) => {
  
          if (res.status !== false) {
            context.setAlertBox({
              open: true,
              error: false,
              msg: "the product added in my list"
            });
  
            fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
              if (res.length !== 0) {
                setAddedToMyList(true)
              }
            })
          } else {
            context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg
            });
          }
        });
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "please Login first"
        });
  
      }
    }
  };


  return (
    <>


      <div className={`item productItem  ${props.itemView}`}
      
      >


        <div className="imgWrapper" onMouseEnter={() => {
          // setIsHovering(true);
          
        }}
        onClick={() => viewProductDetails(props.item?._id)}


          onMouseLeave={() => setIsHovering(false)} >
          {isHovering ? (
            <video className="w-100 m-1 rounded-simple"
              autoPlay
              loop
              muted
            >
              <source src={vid} type="video/mp4" />
            </video>

          ) : (
            <LazyLoadImage
              alt="image"
              effect='blur'
              src={`${props.item.images[0]}`}
              className="" />

          )}
        </div>

    
        <div className='actions'>
          {/* <Button onClick={() => viewProductDetails(props.item?._id)} ><TfiFullscreen /></Button> */}


          <Button disabled={isButtonDisabled} className={isAddedToMyList == true && 'activeHeart'} onClick={() => addToMyList(props.item?._id)} >
            {
              isAddedToMyList === true ? <IoMdHeartEmpty style={{ fontSize: "20px" }} />
                :
                <FaHeart style={{ fontSize: "20px" }} />
            }
          </Button >
        </div>


        <div className="info info-item" 
        onClick={() => viewProductDetails(props.item?._id)}
        >
          <h4 className='text-normal' >{props?.item?.name?.length > 30
            ? props.item.name.substr(0, 30) + '...'
            : props.item.name}
          </h4>
          <div className='brand-badge' >
            <h6 className='text-normal mb-0' >By <span className='badge-cat'>
              
              {props.item.brand?.name || props.item.brand[0]?.name }</span></h6>
          </div>


          <Rating className="mt-1 mb-1" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />
          <div className='' >
          <span className="oldPrice" >MAD  {props?.item?.oldPrice}</span>

          </div>

          <div className="text-center " >
            <span className="netPrice " >MAD  {props?.item?.price}</span>
            <span className="ml-3 savePrice" >SAVE {((props?.item?.price / props?.item?.oldPrice) * 100).toFixed(0)} %</span>
          </div>


        </div>

      </div>

    </>
  )
}

export default ProductItem;