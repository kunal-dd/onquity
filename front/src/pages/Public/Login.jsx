import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components/common";
import { Header, Slider } from "../../components/authentication";
import images from "../../assets/images";
import { LoginSchema } from "../../components/common/Schemas/ValidationSchema";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    dispatch(login(values))
                      .unwrap()
                      .then(() => {
                        navigate("/feed");
                      })
                      .catch((err) => {
                        toast.error(err.message, { position: "top-right" });
                      });
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="onquity_inputs_wrap my-5">
                        {/* <!-- for invalid input add "invalid-input" className to below div --> */}
                        <div
                          className={` ${
                            errors.email && touched.email
                              ? "invalid-input"
                              : null
                          } form-floating onquity-input mb-3`}
                        >
                          <FormInput
                            type="email"
                            placeholder="name@example.com"
                            label="Mobile number / email id"
                            isImportant={true}
                            name="email"
                          />
                          {errors.email && touched.email ? (
                            <span className="mt-2 d-inline-block text-xs text-red-de">
                              {errors.email}
                            </span>
                          ) : null}
                        </div>
                        <div
                          className={` ${
                            errors.password && touched.password
                              ? "invalid-input"
                              : null
                          } form-floating onquity-input mb-3`}
                        >
                          <FormInput
                            type="password"
                            placeholder="**********"
                            label="Password"
                            name="password"
                            isImportant={true}
                          />
                          {errors.password && touched.password ? (
                            <span className="mt-2 d-inline-block text-xs text-red-de">
                              {errors.password}
                            </span>
                          ) : null}
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/forgot-password"
                            className="text-xs fw-semibold ms-auto text-reset text-blue-58"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`${
                          Object.keys(errors).length > 0
                            ? "btn-secondary"
                            : "btn-primary"
                        } btn onquity-btn w-100`}
                      >
                        Continue
                      </button>
                    </Form>
                  )}
                </Formik>
                {/* <!-- use btn-primary className when btn is enable -->
                        <!-- <button type="button" className="btn onquity-btn btn-secondary btn-primary w-100">Continue</button> --> */}
                <div className="or-separator text-sm my-4">
                  <span className="bg-primary px-2 d-inline-block">or</span>
                </div>
                <button
                  type="button"
                  className="btn onquity-btn btn-outlined w-100 d-flex align-items-center justify-content-center"
                >
                  <img
                    src={images.LinkedInLogo}
                    alt="linkedin"
                    className="me-2"
                  />
                  <span className="text-sm"> Continue with LinkedIn</span>
                </button>
                <p className="text-md text-center mt-5">
                  Don’t have an Account?{" "}
                  <Link
                    to="/create-account"
                    className="fw-bold text-reset text-decoration-none text-blue-58"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-7 d-flex flex-column align-items-start px-xl-5 welcome_section position-relative">
              <Slider />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
