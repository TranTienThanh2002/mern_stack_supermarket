import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { NotificationManager } from "react-notifications";
export const Profiles = ({ store ,setStore}) => {
  const [info, setInfo] = useState([]);
  const [stores, setStores] = useState(store);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClickEdit = async (e) => {
    e.preventDefault();
    document.querySelector(".edit-store").classList.add("show");
    document.querySelector("#edit-profile").classList.add("show");
  };
  const handleClose = () => {
    document.querySelector(".edit-store").classList.remove("show");
    document.querySelector("#edit-profile").classList.remove("show");
  };
  const handleSaveChangeClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://super-market-2ebn.onrender.com/api/store/updateStore/${store._id}`, info);
      setStores(data);
      setStore(data);
      NotificationManager.success(
        "Update profile successfully!",
        "Profiles",
        2000
      );
      handleClose();
    } catch (error) {
      NotificationManager.success(
        "Update profile failed!",
        "Profiles",
        2000
      );
      console.log("update store failed: " + error);
    }
  };
  useEffect(() => {}, [stores]);
  return (
    <>
      <div
        class="tab-pane fade show active"
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

          <div class="profile-tab dashboard-bg-box">
            <div class="dashboard-title dashboard-flex">
              <h3>Profile Name</h3>
              <button
                class="btn btn-sm theme-bg-color text-white"
                data-bs-toggle="modal"
                data-bs-target="#edit-profile"
                onClick={(e) => handleClickEdit(e)}
              >
                Edit Profile
              </button>
            </div>

            <ul>
              <li>
                <h5>Store Name :</h5>
                <h5>{stores.storeName}</h5>
              </li>
              <li>
                <h5>Email Address :</h5>
                <h5>{stores.email}</h5>
              </li>
              <li>
                <h5>Country / Region :</h5>
                <h5>{stores.country}</h5>
              </li>

              <li>
                <h5>Year Established :</h5>
                <h5>{stores.yearEstablished}</h5>
              </li>

              <li>
                <h5>Phone :</h5>
                <h5>{stores.phone}</h5>
              </li>
              {/* <li>
                <h5>Category :</h5>
                <h5>Grocery</h5>
              </li> */}

              <li>
                <h5>Street Address :</h5>
                <h5>{stores.address}</h5>
              </li>

              <li>
                <h5>City / State :</h5>
                <h5>{stores.city}</h5>
              </li>

              <li>
                <h5>Zip :</h5>
                <h5>{stores.zip}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="modal fade theme-modal"
        id="edit-profile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: "100001" }}
      >
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel3">
                Edit Your Profile
              </h5>
              <button
                type="button"
                class="btn-close btn-close-addProduct"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose()}
              >
                <MdClose class="icons" />
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="storeName" class="form-label">
                    Store Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="storeName"
                    defaultValue={stores.storeName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    defaultValue={stores.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="country" class="form-label">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="country"
                    defaultValue={stores.country}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="yearEstablished" class="form-label">
                    Year Established
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="yearEstablished"
                    defaultValue={stores.yearEstablished}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    defaultValue={stores.phone}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <input type="email" class="form-control" id="category" value="Grocery"/>
                        </div> */}
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Street Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    defaultValue={stores.address}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="city" class="form-label">
                    City / State
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="city"
                    defaultValue={stores.city}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-3">
                  <label for="zip" class="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    defaultValue={stores.zip}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-animation btn-md fw-bold"
                data-bs-dismiss="modal"
                onClick={() => handleClose()}
              >
                Cancle
              </button>
              <button
                type="button"
                class="btn theme-bg-color btn-md fw-bold text-light"
                data-bs-dismiss="modal"
                onClick={(e) => handleSaveChangeClick(e)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade edit-store"
        style={{ zIndex: "100000" }}
      ></div>
    </>
  );
};
