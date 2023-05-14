import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import signUps from "../../assets/images/inner-page/sign-up.png";
import google from "../../assets/images/inner-page/google.png";
import facebook from "../../assets/images/inner-page/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../../redux/contexts/loginContext/loginContext";
export const Register = () => {
  const [info, setInfo] = useState([]);
  const [message, setMessage] = useState("");
  const { loginUser } = useUserContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...info };
      await axios.post("/users", newUser);
      setMessage("Please verify account");
    } catch (error) {
      console.log("at register" + error);
    }
  };
  const signUp = useGoogleLogin({
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
          photos: data.picture,
          refreshToken: tokenResponse.access_token
        }
        await axios.post("/users/createUserWithGG", newUser);
        var { data }= await axios.post("/users/login", newUser);
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("users", newUser.email);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            X_authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        var { data } = await axios.get(`/users/get/${newUser.email}`, config);
        loginUser(data);
        navigate("/");
      } catch (error) {console.log("sign up: ", error)}
    },
  });
  const handleClickSignUpGoogle = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    signUp();
  };
  return (
    <>
      <BreadCrumb title="Register" />
      <section class="log-in-section section-b-space">
        <div class="container-fluid-lg w-100">
          <div class="row">
            <div class="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div class="image-contain">
                <img src={signUps} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div class="log-in-box">
                <div class="log-in-title">
                  <h3>Welcome To Fastkart</h3>
                  {message !== "" ? (
                    <h4 style={{ color: "red" }}>{message}</h4>
                  ) : (
                    <h4>Create New Account</h4>
                  )}
                </div>

                <div class="input-box">
                  <form class="row g-4">
                    <div class="col-12">
                      <div class="form-floating theme-form-floating">
                        <input
                          type="text"
                          class="form-control"
                          id="fullName"
                          placeholder="Full Name"
                          onChange={(e) => handleChange(e)}
                        />
                        <label for="fullname">Full Name</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating theme-form-floating">
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
                      <div class="form-floating theme-form-floating">
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
                      <button
                        class="btn btn-animation w-100"
                        // type="submit"
                        onClick={(e) => handleClick(e)}
                      >
                        Sign Up
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
                      <Link
                        onClick={(e) => handleClickSignUpGoogle(e)}
                        class="btn google-button w-100"
                      >
                        <img src={google} class="blur-up lazyload" alt="" />
                        Sign up with Google
                      </Link>
                    </li>
                    {/* <li>
                      <Link class="btn google-button w-100">
                        <img src={facebook} class="blur-up lazyload" alt="" />{" "}
                        Sign up with Facebook
                      </Link>
                    </li> */}
                  </ul>
                </div>

                <div class="other-log-in">
                  <h6></h6>
                </div>

                <div class="sign-up-box">
                  <h4>Already have an account?</h4>
                  <Link to="/login">Log In</Link>
                </div>
              </div>
            </div>

            <div class="col-xxl-7 col-xl-6 col-lg-6"></div>
          </div>
        </div>
      </section>
    </>
  );
};
