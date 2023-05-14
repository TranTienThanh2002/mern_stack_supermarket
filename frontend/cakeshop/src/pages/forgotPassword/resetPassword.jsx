import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import forgot from "../../assets/images/inner-page/forgot.png";
import axios from "axios";
import { useParams } from "react-router-dom";
export const ResetPassword = () => {
  const [data, setData] = useState([]);
  const [passWord, setPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [message, setMessage] = useState("");
  const { email } = useParams();
  useEffect(() => {
    const useFetch = async () => {
      try {
        const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/users/gets/${email}`);
        setData(data);
      } catch (error) {
        throw error;
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch();
  }, []);
  const handleChangePasswordClick = async (e) => {
    e.preventDefault();
    try {
        if (confirmPassWord !== passWord) {
            setMessage("Password don't match!!!");
          } else {
            const passwords = {
              newPassword: passWord,
            };
            await axios.put(`https://super-market-2ebn.onrender.com/api/users/resetPassWord/${data.id}`, passwords);
            setMessage("Reset Password successfully!");
          }
    } catch (error) {
        setMessage("Reset Password Fail!");
    }
    
  };

  return (
    <>
      <BreadCrumb title="Set New Password" />
      <section class="log-in-section section-b-space forgot-section">
        <div class="container-fluid-lg w-100">
          <div class="row">
            <div class="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div class="image-contain">
                <img src={forgot} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div class="d-flex align-items-center justify-content-center h-100">
                <div class="log-in-box">
                  <div class="log-in-title">
                    <h3>Welcome To Fastkart</h3>
                    <h4>Set new password</h4>
                  </div>

                  <div class="input-box">
                    <form class="row g-4">
                      

                      <div class="col-12">
                        <form>
                          <div class="form-floating theme-form-floating">
                            <input
                              type="password"
                              class="form-control"
                              id="password"
                              placeholder="Password"
                              onChange={(e) => setPassWord(e.target.value)}
                            />
                            <label for="password">Password</label>
                          </div>
                        </form>
                      </div>
                      <div class="col-12">
                        <form>
                          <div class="form-floating theme-form-floating">
                            <input
                              type="password"
                              class="form-control"
                              id="conFirmPassword"
                              placeholder="Confirm Password"
                              onChange={(e) =>
                                setConfirmPassWord(e.target.value)
                              }
                            />
                            <label for="conFirmPassword">
                              Confirm Password
                            </label>
                          </div>
                        </form>
                      </div>
                      {message !== "" && (
                        <div style={{ color: "red" }}>{message}*</div>
                      )}

                      <div class="col-12">
                        <button
                          class="btn btn-animation w-100"
                          onClick={(e) => handleChangePasswordClick(e)}
                        >
                          Confirm Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
