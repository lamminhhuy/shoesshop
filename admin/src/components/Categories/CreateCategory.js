import React, { useState } from "react";
import { useEffect } from "react";
import { createCATEGORY } from "./../../Redux/Actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import axios from "axios";
const CreateCategory = () => {
  
  const [name,setName] = useState("");
  const [sucess,setSucess] = useState("");
  const [description,setDescription] = useState("");
  const dispatch = useDispatch();
  const [categoryList, setcategoryList] =useState([]);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  useEffect( async() => {
    if (sucess =="true") {
      toast.success("Category Added", ToastObjects);
      setSucess("false");
    }
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCATEGORY(name, description));
setSucess("true");
  };
  
  return (
    
    <div className="col-md-12 col-lg-4">
       <Toast />
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
               value={name}
                      onChange={(e) => setName(e.target.value)}
          />
        </div>
    
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
