import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartFromCookie } from "../utils/CookieCart";
import { setCart } from "../redux/action";
import { message } from "antd";
import { createOrder } from "../utils/ApiFunction";
import Paypal from "./Paypal";
const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const currentUser = localStorage.getItem("userId");
  const [showCheckout, setShowCheckout] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState({
    firstName: "",
    lastName: "",
    email: currentUser,
    phoneNumber: "",
    address: "",
    note: "",
    totalMoney: "",
    paymentMethod: "",
    orderDetails: []
  })
  useEffect(() => {
    const initialCart = getCartFromCookie();
    if (state.length === 0) {
      if(initialCart.length > 0) {
        dispatch(setCart(initialCart));  // cập nhật Redux từ cookie 
      }
    }
  }, [state, dispatch]);
  useEffect(() => {
    setShowCheckout(true);
  }, [newOrder]);
  const handleInputeChange = (e) => {
    setNewOrder({...newOrder, [e.target.name]: e.target.value});
  }

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(newOrder.paymentMethod === "cash") {
        const results = await createOrder(newOrder);
        if(results) {
          messageApi.open({
            type: "success",
            content: "Bạn đã đặt hàng thành công!",
            // duration: 2
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: "Thất bại!",
            duration: 2
          })
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        messageApi.open({
          type: "error",
          content: error.response.data,
          duration: 1
        })
      } else {
        messageApi.open({
          type: "error",
          content: "Thất bại!",
          duration: 1
        })
      }
    }
  }
  useEffect(() => {
    const orderDetails = state.map((product, index) => {
      return {
          productId: product.id,
          numberOfProducts: product.qty,
          totalMoney: product.price
      };
    });
    let subtotal = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });
    setNewOrder({...newOrder, totalMoney: subtotal, orderDetails: orderDetails})
  }, [state])
  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });
    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        {/* <div className="container py-5">
          <div className="row my-4"> */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${subtotal}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${subtotal + shipping}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
      </>
    );
  };
  return (
    <>
      {conTextHolder}
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? showCheckout && (
          
          <>
            <div className="container py-5">
            <div className="row my-4">
            <ShowCheckout />
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder=""
                          required
                          value={newOrder.firstName}
                          onChange={handleInputeChange}
                        />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder=""
                          required
                          value={newOrder.lastName}
                          onChange={handleInputeChange}
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="my-3">
                        <label htmlFor="display-4">Email address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="name@example.com"
                          value={newOrder.email}
                          disabled
                        />
                      </div>

                      {/* <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          name="email"
                          required
                          value={newOrder.email}
                          onChange={handleInputeChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div> */}

                      <div className="col-12 my-1">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          placeholder="0123456789"
                          name="phoneNumber"
                          required
                          value={newOrder.phoneNumber}
                          onChange={handleInputeChange}
                        />
                        <div className="invalid-feedback">
                          Please enter your phone.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="Apartment or suite"
                          value={newOrder.address}
                          onChange={handleInputeChange}
                        />
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="note" className="form-label">
                          Note{" "}
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="note"
                          name="note"
                          placeholder=""
                          value={newOrder.note}
                          onChange={handleInputeChange}
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="payment" className="form-label">
                          Payment Method
                        </label>
                        <br />
                        <select className="form-select" id="payment" required name="paymentMethod" onChange={handleInputeChange}>
                          <option value="">Choose...</option>
                          <option value="paypal">Paypal</option>
                          <option value="cash">Cash</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a Payment Method.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    {newOrder.paymentMethod === "paypal" ? (
                      <Paypal orderDTO = {newOrder}/>
                    ) : (
                      <>
                        <button
                        className="w-100 btn btn-primary "
                        type="submit"
                      >
                        Continue to checkout
                      </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
            </div>
            </div>
          </>
        ) : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
