import { RiArrowRightSLine } from "react-icons/ri";


const CategorieItem = (props) => {
    return (
        <>

            <div className="CategorieItem d-flex flex-column justify-content-between " >
                <h6>{props?.CatData?.name}</h6>
                <div className='part-2 d-flex align-items-baseline justify-content-between' >
                    <RiArrowRightSLine/>
                    <img  src={props?.CatData?.images[0]} />
                </div>
            </div>

        </>
    )

}

export default CategorieItem;