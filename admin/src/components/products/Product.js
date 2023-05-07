import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";
import { addhotsale, deletehotsale } from "../../services/productServices";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const Product = (props) => {
  const [sucess,setSucess] = useState("");
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

const addhotsalehandler = (id)=> {
 
  addhotsale(id).then((data) => {
    toast.success(data, ToastObjects);
    setSucess("false");
    });
  
}
const  deletehotsalehandler = (id) => {
  deletehotsale(id).then((data) => {
    toast.success(data, ToastObjects);
    setSucess("false");
   });
  

}
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
      <Toast />
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            
              <button
               className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"    onClick={() => addhotsalehandler(product._id)}>Add Hot Sale</button>
                  <button className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"    onClick={() => deletehotsalehandler(product._id)}>Delete Hot Sale</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
