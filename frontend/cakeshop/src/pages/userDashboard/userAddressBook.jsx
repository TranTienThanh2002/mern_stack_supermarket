import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import axios from "axios";
export const UserAddressBook = ({ id }) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [data, setData] = useState([]);
  const [listAddress, setListAddress] = useState([]);
  const [info, setInfo] = useState([]);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSaveChangeClick = async (e) => {
    e.preventDefault();
    const address = {
      userId: id,
      info,
    };
    try {
      await axios.post(`https://super-market-2ebn.onrender.com/api/address/`, address);
      const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/address/getByUserId/${id}`);
      setListAddress(data);
      setShow(false);
    } catch (error) {
      console.log("userAddress");
    }
  };
  const handleEditClick = async (e, addressId) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/address/gets/${addressId}`);

      setData(data);
    } catch (error) {
      throw error;
    }
    setShowEdit(true);
  };
  const handleUpdateClick = async (e, addressId) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://super-market-2ebn.onrender.com/api/address/update/${addressId}`, info);
      setData(data);
    } catch (error) {
      throw error;
    }
    setShowEdit(false);
  };
  const handleRemoveClick = async (e, addressId) => {
    e.preventDefault();
    const userId = {
      userId: id,
    };
    try {
      await axios.delete(`https://super-market-2ebn.onrender.com/api/address/delete/${addressId}`);
      await axios.put(`https://super-market-2ebn.onrender.com/api/address/deleteAddressInUser/${addressId}`, userId);
      const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/address/getByUserId/${id}`);
      setListAddress(data);
    } catch (error) {
      console.log("remove address" + error);
    }
    setShowEdit(false);
  };
  useEffect(() => {
    const useFetch = async () => {
      try {
        const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/address/getByUserId/${id}`);
        setListAddress(data);
      } catch (error) {
        throw error;
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch();
  }, [data]);
  return (
    <>
      <div
        class="tab-pane fade show"
        id="pills-address"
        role="tabpanel"
        aria-labelledby="pills-address-tab"
      >
        <div class="dashboard-address">
          <div class="title title-flex">
            <div>
              <h2>My Address Book</h2>
              <span class="title-leaf">
                <svg class="icon-width bg-gray">
                  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                </svg>
              </span>
            </div>
            {listAddress.length < 7 && (
              <button
                class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#add-address"
                onClick={() => setShow(true)}
              >
                <HiPlus className="me-2" />
                Add New Address
              </button>
            )}
          </div>

          <div class="row g-sm-4 g-3">
            {listAddress.length > 0 && (
              <>
                {listAddress.map((item, index) => (
                  <div
                    key={index}
                    class="col-xxl-4 col-xl-6 col-lg-12 col-md-6"
                  >
                    <div class="address-box">
                      <div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="jack"
                            id="flexRadioDefault2"
                            checked
                          />
                        </div>

                        <div class="label">
                          <label>{item.type}</label>
                        </div>

                        <div class="table-responsive address-table">
                          <table class="table">
                            <tbody>
                              <tr>
                                <td colspan="2">
                                  {item.firstName + " " + item.lastName}
                                </td>
                              </tr>

                              <tr>
                                <td>Address :</td>
                                <td>
                                  <p>{item.address}</p>
                                </td>
                              </tr>

                              <tr>
                                <td>Pin Code :</td>
                                <td>{item.pinCode}</td>
                              </tr>

                              <tr>
                                <td>Phone :</td>
                                <td> 0{item.phone}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="button-group">
                        <button
                          class="btn btn-sm add-button w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#editProfile"
                          onClick={(e) => handleEditClick(e, item._id)}
                        >
                          <FiEdit className=" feather feather-edit" />
                          Edit
                        </button>
                        <button
                          class="btn btn-sm add-button w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#removeProfile"
                          onClick={(e) => handleRemoveClick(e, item._id)}
                        >
                          <FiTrash2 className=" feather feather-trash-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {
        <div
          class={
            show || showEdit
              ? "modal fade theme-modal show"
              : "modal fade theme-modal"
          }
          id="add-address"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add a new address
                </h5>
                <button
                  type="button"
                  class="btn-close btn-close-addProduct"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShow(false);
                    setShowEdit(false);
                  }}
                >
                  <MdClose class="icons" />
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      defaultValue={showEdit ? data.firstName : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="firstName">First Name</label>
                  </div>
                </form>

                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      defaultValue={showEdit ? data.lastName : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="lastName">Last Name</label>
                  </div>
                </form>
                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="type"
                      placeholder="Ex: home"
                      defaultValue={showEdit ? data.type : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="type">State</label>
                  </div>
                </form>

                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Enter Email Address"
                      defaultValue={showEdit ? data.email : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="email">Email Address</label>
                  </div>
                </form>
                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="number"
                      class="form-control"
                      id="phone"
                      placeholder="Enter Phone Number"
                      defaultValue={showEdit ? data.phone : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="phone">Phone Number</label>
                  </div>
                </form>
                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <textarea
                      class="form-control"
                      placeholder="Leave a comment here"
                      id="address"
                      style={{ height: "100px" }}
                      defaultValue={showEdit ? data.address : ""}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                    <label for="address">Enter Address</label>
                  </div>
                </form>

                <form>
                  <div class="form-floating mb-4 theme-form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="pinCode"
                      placeholder="Enter Pin Code"
                      defaultValue={showEdit ? data.pinCode : ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="pinCode">Pin Code</label>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-md"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShow(false);
                    setShowEdit(false);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn theme-bg-color btn-md text-white"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    showEdit
                      ? handleUpdateClick(e, data._id)
                      : handleSaveChangeClick(e);
                  }}
                >
                  {showEdit ? <>Updated Address</> : <>Add New Address</>}
                </button>
              </div>
              F
            </div>
          </div>
        </div>
      }

      <div
        class={
          show || showEdit ? "modal-backdrop fade show" : "modal-backdrop fade"
        }
      ></div>
    </>
  );
};
