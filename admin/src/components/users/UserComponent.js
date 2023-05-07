import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { disableUser,enableUser } from "../../services/userMange";
import { map } from "jquery";

const UserComponent = () => {
  const dispatch = useDispatch();
  const userList =  useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {

    dispatch(listUser());
  
  
  }, [dispatch]);
  const enablehandler = async(userinfo)=>{
  await  enableUser (userinfo);
   dispatch(listUser());
  };

  const disablehandler = async (userinfo) =>{
 await  disableUser (userinfo); 
    dispatch(listUser());
 }
 const sortUserHandler = (value) =>{
  console.log(value);
 dispatch(listUser({isDisable:value}));
 }
   return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
        
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
         
            </div>
      
            <div className="col-lg-2 col-6 col-md-3" id="123">
              <select className="form-select"onChange= {(e) => sortUserHandler(e.target.value)}>
                <option value={""}>Status: all</option>
                <option value={false}>Active only</option>
                <option value={true}>Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.map((user) => (
                
                <div className="col" key={user._id} style={{display: user.isAdmin ==true ? 'none':'block' }}  >
                    {user.isAdmin != true && (
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                   
                      />
                    </div>
                  
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                     
                          <p className="m-0">Customer</p>
                      
                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                      </div>
                      <button className="btn" value={user.email} onClick={(e)=>enablehandler(e.target.value)}>Enable</button>     
                      <button className="btn btn2" value={user.email} onClick={(e)=>disablehandler(e.target.value)}> {user.isDisable ? "Disabled" : "Disable"}</button> 
                     
                      </div>
                      
                  </div>
                  
                    )}
                </div>
              ))}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
