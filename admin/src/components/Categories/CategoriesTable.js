import axios from "axios";
import { data } from "jquery";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getlist,deleteCategory } from "../../services/llistCategory";

import Toast from "../LoadingError/Toast";
const CategoriesTable = () =>  {
  const [lists, setLists] = useState([]);
const [reload, setreload] = useState('');
  useEffect(()=>{
   
  getlist().then((data) => {setLists(data); });
  
  },[]);
  const handdledeleteCategory =(id) =>{ 
    console.log(id);
  deleteCategory(id).then((data) => {
    console.log(data);
    toast.success( data);
    getlist().then((data) => {setLists(data); })});
  
  }
  return (
  
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
            
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody> 
          {lists && lists.map(list=> (
          <tr >
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </td>
            <td>{list._id}</td>
            <td>
              <b>{list.name}</b>
            </td>
            <td>{list.description}</td>
            <td className="text-end">
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">

                  <button className="dropdown-item text-danger" to="#" value={list._id} onClick={(e)=> handdledeleteCategory(e.target.value)}>
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
