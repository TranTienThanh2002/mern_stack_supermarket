import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import login from "../../assets/images/inner-page/log-in.png";
import google from "../../assets/images/inner-page/google.png";
import facebook from "../../assets/images/inner-page/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../redux/contexts/loginContext/loginContext";
import { useGoogleLogin } from "@react-oauth/google";
import { NotificationManager } from "react-notifications";
export const Login = () => {
  const [info, setInfo] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const { loginUser } = useUserContext();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...info };

      var { data } = await axios.post("https://super-market-2ebn.onrender.com/api/users/login", newUser);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("users", info.email);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          X_authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/users/get/${newUser.email}`, config);
      loginUser(data);
      NotificationManager.success(
        "Login success",
        "Login",
        2000
      );
      navigate("/");
    } catch (error) {
      NotificationManager.error(
        "Login failed",
        "Login",
        2000
      );
      setMessage("Email or password incorrect(Maybe account don't verify!");
      console.log("at login" + error);
    }
  };
  const LoginGG = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        var {data}  = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: { "Authorization":`Bearer ${tokenResponse.access_token}` },
          }
        );
        const newUser = {
          fullName: data.name,
          email: data.email,
          password: data.id,
          verifyCode: data.verified_email,
          refreshToken: tokenResponse.access_token
        }
        var { data }= await axios.post("https://super-market-2ebn.onrender.com/api/users/login", newUser);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("users", newUser.email);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            X_authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/users/get/${newUser.email}`, config);
        loginUser(data);
        NotificationManager.success(
          "Login success",
          "Login",
          2000
        );
        navigate("/");
      } catch (error) {
        NotificationManager.error(
          "Login failed",
          "Login",
          2000
        );
        setMessage("Email invalid");
        console.log("login: ", error)}
    },
  });
  const handleClickLoginGoogle = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    LoginGG();
  };
  return (
    <>
      <BreadCrumb title="Login" />
      <section class="log-in-section background-image-2 section-b-space">
        <div class="container-fluid-lg w-100">
          <div class="row">
            <div class="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div class="image-contain">
                <img src={login} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div class="log-in-box">
                <div class="log-in-title">
                  <h3>Welcome To Fastkart</h3>
                  {message === "" ? (
                    <h4>Log In Your Account</h4>
                  ) : (
                    <h4 style={{ color: "red" }}>{message}*</h4>
                  )}
                </div>

                <div class="input-box">
                  <form class="row g-4">
                    <div class="col-12">
                      <div class="form-floating theme-form-floating log-in-form">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Email Address"
                          onChange={(e) => handleChange(e)}
                        />
                        <label for="email">Email Address</label>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-floating theme-form-floating log-in-form">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Password"
                          onChange={(e) => handleChange(e)}
                        />
                        <label for="password">Password</label>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="forgot-box">
                        <div class="form-check ps-0 m-0 remember-box">
                          <input
                            class="checkbox_animated check-box"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link to="/forgot" class="forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <div class="col-12">
                      <button
                        class="btn btn-animation w-100 justify-content-center"
                        // type="submit"
                        onClick={(e) => handleClick(e)}
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>

                <div class="other-log-in">
                  <h6>or</h6>
                </div>

                <div class="log-in-button">
                  <ul>
                    <li>
                      <Link onClick={(e)=>handleClickLoginGoogle(e)}
                        
                        class="btn google-button w-100"
                      >
                        <img src={google} class="blur-up lazyload" alt="" /> Log
                        In with Google
                      </Link>
                    </li>
                    {/* <li>
                      <a
                        href="https://www.facebook.com/"
                        class="btn google-button w-100"
                      >
                        <img src={facebook} class="blur-up lazyload" alt="" />{" "}
                        Log In with Facebook
                      </a>
                    </li> */}
                  </ul>
                </div>

                <div class="other-log-in">
                  <h6></h6>
                </div>

                <div class="sign-up-box">
                  <h4>Don't have an account?</h4>
                  <Link to="/register">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
