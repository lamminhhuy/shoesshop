import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getLineAndCharacterOfPosition } from 'typescript';
import { getlist,deleteCategory  } from "../../services/llistCategory";

import { useEffect, useState } from "react";
const Category = () =>{
  
  const dispatch = useDispatch();
  let history = useHistory();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const  googleuser =    localStorage.getItem("googleinfo") ?  JSON.parse(localStorage.getItem("googleinfo")):null;
  const { userInfo } = userLogin;
  
  const [lists, setLists] = useState([]);
  useEffect(()=>{
    let mounted = true;
  getlist().then((data) => {if(mounted){setLists(data); }});
  return () => mounted = false;
  },[]);
  const submitHandler = (e) => {

      history.push(`/category/${e}`);
  }
    return (
      
  <div className='col-lg-2' >
    <legend style={{marginLeft:"10px"}}>CATEGORY</legend>
   
    <div className='row mt-2'>
      
        <div className='col-md-12'>
        <hr style={{marginTop:"-5px"}}></hr>
        {lists && lists.map(list=> (
 <div>
            <button style={{width:150,backgroundColor:"#5cb0cf", color:"#ffffff"}}  onClick={(e)=> submitHandler(e.target.value) } value={list.name} className='btn  w-100 mb-4'>{list.name}</button>
          <hr style={{marginTop:"-5px"}}></hr></div>
        ))}
    
        </div>
       
    </div>
  </div>       
    )
}
export default Category;