import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserProfile = ({profile, setProfile}) => {
  const [data, setData] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const email = localStorage.getItem("users");
  const useFetch = async () => {
    try {
      let { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/users/get/${email}`, config);
      setData(data);
    } catch (error) {
      throw error;
    }
  };
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch();
    
  }, []);
  return (
    <>
      <div
        class="tab-pane fade show"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div class="dashboard-profile">
          <div class="title">
            <h2>My Profile</h2>
            <span class="title-leaf">
              <svg class="icon-width bg-gray">
                <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
              </svg>
            </span>
          </div>

          <div class="profile-detail dashboard-bg-box">
            <div class="dashboard-title">
              <h3>Profile Name</h3>
            </div>
            <div class="profile-name-detail">
              <div class="d-sm-flex align-items-center d-block">
                <h3>{data.fullName}</h3>
                
              </div>
            </div>

            <div class="location-profile">
              <ul>
                <li>
                  <div class="location-box">
                    <i data-feather="map-pin"></i>
                    <h6>{data.address}</h6>
                  </div>
                </li>

                <li>
                  <div class="location-box">
                    <i data-feather="mail"></i>
                    <h6>{data.email}</h6>
                  </div>
                </li>
              </ul>
            </div>

            <div class="profile-description">
              <p>
                Residences can be classified by and how they are connected to
                neighbouring residences and land. Different types of housing
                tenure can be used for the same physical type.
              </p>
            </div>
          </div>

          <div class="profile-about dashboard-bg-box">
            <div class="row">
              <div class="col-xxl-7">
                <div class="dashboard-title mb-3">
                  <h3>Profile About</h3>
                </div>

                <div class="table-responsive">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td>Gender :</td>
                        <td>{data.gender}</td>
                      </tr>
                      {/* <tr>
                        <td>Birthday :</td>
                        <td>21/05/1997</td>
                      </tr> */}
                      <tr>
                        <td>Phone Number :</td>
                        <td>
                          <Link href="javascript:void(0)"> {data.phone}</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Address :</td>
                        <td>{data.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div class="dashboard-title mb-3">
                  <h3>Login Details</h3>
                </div>

                <div class="table-responsive">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td>Email :</td>
                        <td>
                          <a href="javascript:void(0)">
                            vicki.pope@gmail.com
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#editProfile"
                            >
                              Edit
                            </span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Password :</td>
                        <td>
                          <a href="javascript:void(0)">
                            ●●●●●●
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#editProfile"
                            >
                              Edit
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>

              <div class="col-xxl-5">
                <div class="profile-image">
                  <img
                    src="http://127.0.0.1:5500/themes.pixelstrap.com/fastkart/assets/images/inner-page/dashboard-profile.png"
                    class="img-fluid blur-up lazyload"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
