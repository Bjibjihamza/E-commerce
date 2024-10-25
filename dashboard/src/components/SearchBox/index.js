import { IoSearch } from "react-icons/io5"

const SearchBox = () => {
    return(
        <>
            <div className="searchBox position-relative align-items-center d-flex" >
                <IoSearch className="mr-2"/>
                <input type="text"  placeholder="search here ..."/>
            </div>
        </>
    )
}

export default SearchBox