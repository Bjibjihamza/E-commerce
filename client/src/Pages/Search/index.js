import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MdSearchOff } from 'react-icons/md';
import ProductItem from '../../Components/ProductItem';  
import { MyContext } from '../../App';

const SearchPage = () => {
  const location = useLocation();
  const { searchFields } = location.state || {}; 
  const context = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchFields) {
      setLoading(true);
      fetchDataFromApi(`/api/search?q=${encodeURIComponent(searchFields)}`)
        .then((data) => {
          context.setSearchData(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          context.setSearchData([]);
          setLoading(false);
        });
    }
  }, [searchFields]);

  return (
    <section className="product_Listing_Page search_Listing_Page  mt-4 mb-4">
      <div className='container container_mx'>
        <div className="row container m-0">
          <div className="col-md-12 w-100 m-auto p-1">
            <div className="info d-flex align-items-center flex-column w-100 text-center mt-4 mb-4">
              <h3 className="mb-0 hd">Search : {searchFields}</h3>
            </div>

            <div className="container">
              <div className="productListing">
                <div className="productListing w-100 pc flex-row">
                  {loading ? (
                    <div className='w-100 text-center'>
                      <p>Loading...</p>
                    </div>
                  ) : context.searchData?.length > 0 ? (
                    context.searchData.map((item, index) => (
                      <ProductItem key={index} itemView={'four'} item={item} />
                    ))
                  ) : (
                    <div className='w-100 text-center'>
                      <MdSearchOff style={{ fontSize: "100px" }} />
                      <p>We couldn't find any result</p>
                    </div>
                  )}
                </div>

                <div className="productListing w-100 mobile flex-row">
                  {loading ? (
                    <div className='w-100 text-center'>
                      <p>Loading...</p>
                    </div>
                  ) : context.searchData?.length > 0 ? (
                    context.searchData.map((item, index) => (
                      <ProductItem key={index} itemView={'two'} item={item} />
                    ))
                  ) : (
                    <div className='w-100 text-center'>
                      <MdSearchOff style={{ fontSize: "100px" }} />
                      <p>We couldn't find any result</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
