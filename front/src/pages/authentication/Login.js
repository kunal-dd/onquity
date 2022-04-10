import React from "react";
import Header from "../../components/authentication/Header";
import FormTextInput from "../../components/common/forms/form-text-input";
import LinkedInIcon from "./../../assets/images/linkedin-icon.svg";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import GooglePlay from "./../../assets/images/goole-play-badge.svg";
import AppStore from "./../../assets/images/app-store-badge.svg";
const Login = () => {
  return (
    <>
      <Header />
      <section className="main_section">
        <div className="container-fluid">
          <div className="row main_section--inner">
            <div className="col-12 col-xl-5 px-xl-4 d-flex flex-column justify-content-center">
              <div className="login_register_wrap p-xl-5">
                <h2 className="text-xxl fw-bold mb-4">Login</h2>
                <p className="text-md text-secondary-text w-75">
                  Enter your email id / mobile number and password to login
                </p>
                <div className="onquity_inputs_wrap my-5">
                  {/* <!-- for invalid inpur add "invalid-input" className to below div --> */}
                  <div className="form-floating onquity-input mb-3">
                    <FormTextInput
                      type="email"
                      placeholder="name@example.com"
                      label="Mobile number / email id"
                    />
                    {/* <!-- for invalid input error -->
                                <!-- <span className="mt-2 d-inline-block text-xs text-red-de">opps! invalid mobile number</span> --> */}
                  </div>
                  <div className="form-floating onquity-input mb-3">
                    <FormTextInput
                      type="password"
                      placeholder="**********"
                      label="Password"
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check onquity-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label text-xs"
                        for="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-xs fw-semibold ms-auto text-reset"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn onquity-btn btn-secondary w-100"
                >
                  Continue
                </button>
                {/* <!-- use btn-primary className when btn is enable -->
                        <!-- <button type="button" className="btn onquity-btn btn-secondary btn-primary w-100">Continue</button> --> */}
                <div className="or-separator text-sm my-4">
                  <span className="bg-primary px-2 d-inline-block">or</span>
                </div>
                <button
                  type="button"
                  className="btn onquity-btn btn-outlined w-100 d-flex align-items-center justify-content-center"
                >
                  <img src={LinkedInIcon} alt="linkedin" className="me-2" />
                  <span className="text-sm"> Login with Linked in</span>
                </button>
                <p className="text-md text-center mt-5">
                  Don’t have an Account?{" "}
                  <Link
                    to="/create-account"
                    className="fw-bold text-reset text-decoration-underline"
                  >
                    {" "}
                    Register
                  </Link>
                </p>
              </div>
            </div>
            <div class="col-12 col-xl-7 d-flex flex-column align-items-start px-xl-5 welcome_section position-relative">
              <div class="download_app">
                <button class="download_app-btn">
                  <img src={GooglePlay} alt="google play" />
                </button>
                <button class="download_app-btn">
                  <img src={AppStore} alt="app store" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
