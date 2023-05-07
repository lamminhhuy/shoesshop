import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { login } from "./../Redux/Actions/userActions";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../Redux/StateProvider";
import { Googlelogin } from "./../Redux/Actions/userActions";
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";
import { isDisable } from "../services/userManage";

import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const Login = ({ location, history }) => {
  window.scrollTo(0, 0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [sucess,setSucess] = useState("");
  useEffect(() => {
    if (userInfo  ) {

      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = async (e) => { 
    e.preventDefault();
 isDisable (email).then (data =>{
  console.log(data);
  if (data == "true"){
    toast.success("Tài khoản của bạn đã bị khóa", ToastObjects);
      setSucess("false");
  }else{
    e.preventDefault();
    dispatch(login(email, password));}
 })

  };
const Googlelogin1 = async (e) =>{
  await  dispatch(Googlelogin);
  history.push(redirect);
}
  return (
    <>
      <Header />
      <Toast />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <div className="row" style={{marginTop:"10px"}}>
    <a className="btn btn-outline-gray" role="button" onClick={Googlelogin1} style={{textTransform:"none",fontSize:"20px",border:"1px solid #eeeeee"}}>
      <img  style={{marginBottom:"3px", marginRight:"35px",width:"35px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
      Login with Google
    </a>
</div>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
