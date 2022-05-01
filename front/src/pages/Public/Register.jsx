import { Form, Formik } from "formik";
import React from "react";
import images from "../../assets/images";
import { Header, Slider } from "../../components/authentication";
import { FormInput } from "../../components/common";
import { RegisterSchema } from "../../components/common/Schemas/ValidationSchema";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className="main_section">
        <div className="container-fluid">
          <div className="row main_section--inner">
            <div className="col-12 col-xl-5 px-xl-4 d-flex flex-column justify-content-center">
              <div className="login_register_wrap p-xl-5">
                <h2 className="text-xxl fw-bold mb-4 text-nowrap">
                  Let’s Create Basic Profile
                </h2>
                <p className="text-md text-secondary-text">
                  Enter following detail for registration
                </p>
                <Formik
                  initialValues={{
                    full_name: "",
                    email: "",
                    mobile_no: "",
                    password: "",
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={(values) => {
                    dispatch(register(values))
                      .unwrap()
                      .then(() => {
                        navigate("/verify");
                      })
                      .catch((err) => {
                        toast.error(err.message, { position: "top-right" });
                      });
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="onquity_inputs_wrap my-5">
                        <div
                          className={` ${
                            errors.full_name && touched.full_name
                              ? "invalid-input"
                              : null
                          } form-floating onquity-input mb-3`}
                        >
                          <FormInput
                            type="text"
                            placeholder="John Deo"
                            label="Full Name"
                            isImportant={true}
                            name="full_name"
                          />
                          {errors.full_name && touched.full_name ? (
                            <span className="mt-2 d-inline-block text-xs text-red-de">
                              {errors.full_name}
                            </span>
                          ) : null}
                        </div>
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
                            label="Email"
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
                            errors.mobile_no && touched.mobile_no
                              ? "invalid-input"
                              : null
                          } form-floating onquity-input mb-3`}
                        >
                          <FormInput
                            type="text"
                            placeholder="+917894561230"
                            label="Mobile Number"
                            isImportant={true}
                            name="mobile_no"
                          />
                          {errors.mobile_no && touched.mobile_no ? (
                            <span className="mt-2 d-inline-block text-xs text-red-de">
                              {errors.mobile_no}
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
                      <div className="or-separator text-sm my-4">
                        <span className="bg-primary px-2 d-inline-block">
                          or
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn onquity-btn btn-outlined w-100 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src={images.LinkedInLogo}
                          alt="linkedIn"
                          className="me-2"
                        />{" "}
                        <span className="text-sm">Register with LinkedIn</span>
                      </button>
                      <p className="text-md text-center mt-5">
                        Already have an Account?{" "}
                        <Link
                          to="/"
                          className="fw-bold text-reset text-decoration-none text-blue-58"
                        >
                          Login
                        </Link>
                      </p>
                    </Form>
                  )}
                </Formik>
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

export default Register;
