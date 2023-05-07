import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { listHotSale } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HotSaleSection = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state. productHotSale);
  console.log(productList);
  const { loading, error, products } = productList;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrow:true,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(listHotSale())},[dispatch]);
    
;

  return (
   
      

        <div className="card-body container">
        
          {loading ? (
            <Loading style={{display:"none"}} />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div>
              <div className="d-flex justify-content-center align-items-center gap-2"><img src="/images/hotsale.png" style={{width:"50px", height:"50px"}}/> <h2 style={{color:"#e61923"}}> <strong>Best Selling Products</strong>   </h2></div>
            <div className="row ">
            <Slider {...settings}   style={  {width:"90%",marginLeft:"4.25%"}}>
              {/* Products */}
            
              {products.map((product) => (
                
                      <div
                        className="shop col-lg-3 col-md-3 col-sm-3 "
                        key={product._id} style={{marginTop:"150px"}}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div> ))}
                      </Slider>
     </div>
                </div>
          
          )}
        </div>

  );
};
export default HotSaleSection;
