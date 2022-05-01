import React from "react";
import images from "../../../assets/images";

const Slider = () => {
  return (
    <>
      <div className="download_app">
        <button className="download_app-btn">
          <img src={images.GooglePlayLogo} alt="google play" />
        </button>
        <button className="download_app-btn">
          <img src={images.AppStoreLogo} alt="app store" />
        </button>
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide welcome_section-slider w-100"
        data-bs-touch="true"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <div className="text-center mb-5">
              <h2 className="text-xxl fw-bold mb-3">
                Welcome to <span className="text-gradiant">Onquity</span>
              </h2>
              <p className="text-md text-secondary-text">
                Join us to build your dream Startup
              </p>
            </div>
            <img
              src={images.WelcomeIllustrationOne}
              alt="welcome-illustration"
              className="d-block w-100 welcome-img mx-auto"
            />
            <div className="w-100 mt-4">
              <h5 className="text-lg mb-3">
                An ecosystem for
                <span className="text-gradiant fw-bold">
                  nurturing startups
                </span>
              </h5>
              <p className="text-sm text-secondary-text w-50">
                Helping startups to get the best talent and <br />
                investment opportunities across the globe.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="text-center mb-5">
              <h2 className="text-xxl fw-bold mb-3">
                Welcome to <span className="text-gradiant">Onquity</span>
              </h2>
              <p className="text-md text-secondary-text">
                Join us to build your dream Startup
              </p>
            </div>
            <img
              src={images.WelcomeIllustrationTwo}
              className="d-block w-100 welcome-img mx-auto"
              alt="welcome-illustration"
            />
            <div className="w-100 mt-4">
              <h5 className="text-lg mb-3">
                Promoting{" "}
                <span className="text-gradiant fw-bold"> Entrepreneurship</span>{" "}
              </h5>
              <p className="text-sm text-secondary-text w-50">
                Helping skilled individuals to take their first step <br />{" "}
                towards entrepreneurship{" "}
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="text-center mb-5">
              <h2 className="text-xxl fw-bold mb-3">
                Welcome to <span className="text-gradiant">Onquity</span>
              </h2>
              <p className="text-md text-secondary-text">
                Join us to build your dream Startup
              </p>
            </div>
            <img
              src={images.WelcomeIllustrationThree}
              className="d-block w-100 welcome-img mx-auto"
              alt="welcome-illustration"
            />
            <div className="w-100 mt-4">
              <h5 className="text-lg mb-3">
                Connecting startups with{" "}
                <span className="text-gradiant fw-bold"> experts</span>{" "}
              </h5>
              <p className="text-sm text-secondary-text w-50">
                Helping Angel investors to find innovative startup <br /> ideas
                across the globe and invest in them
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="text-center mb-5">
              <h2 className="text-xxl fw-bold mb-3">
                Welcome to <span className="text-gradiant">Onquity</span>
              </h2>
              <p className="text-md text-secondary-text">
                Join us to build your dream Startup
              </p>
            </div>
            <img
              src={images.WelcomeIllustrationFour}
              className="d-block w-100 welcome-img mx-auto"
              alt="welcome-illustration"
            />
            <div className="w-100 mt-4">
              <h5 className="text-lg mb-3">
                Catching the innovative
                <span className="text-gradiant fw-bold">
                  {" "}
                  ideas early{" "}
                </span>{" "}
              </h5>
              <p className="text-sm text-secondary-text w-50">
                Helping Angel investors to find innovative startup <br /> ideas
                across the globe and invest in them
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
