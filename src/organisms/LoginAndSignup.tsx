import React, { useState, useEffect } from "react";

import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import PageSidebar from "../molecules/PageSidebar";
import Panel from "../atoms/Panel";
import Button from "../quarks/Button";
import Input from "../quarks/Input";
import Select from "../quarks/Select";
import Error from "../quarks/Error";
import LoadingComponent from "../quarks/LoadingComponent";
import Info from "../quarks/Info";
import ForgotPassword from "../molecules/ForgotPassword";

// import CheckIcon from "../icons/CheckIcon";

import { loginUrl, registerUrl } from "../constants/endpoints";
// import { developmentMode } from "../constants/devTools";
import { useUserContext } from "../hooks/useUserContext";
// import { fakeUser } from "../constants/fakeData";
import isValidEmail from "../helperFunctions/isValidEmail";
import sortStringsAlphabetically from "../helperFunctions/sortStringsAlphabetically";
import { useNotificationContext } from "../hooks/useNotificationContext";
import Notification from "../quarks/Notification";

type LoginDetails = {
  email: string;
  password: string;
};

type RegistrationDetails = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  TOS: boolean;
  country?: string | undefined;
  city?: string | undefined;
};

const LoginAndSignUp: React.FC = () => {
  // Global State
  const { setUserDetails } = useUserContext();
  const { setNotification } = useNotificationContext();

  // Local State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [component, setComponent] = useState<string>("login");
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

  const [registrationDetails, setRegistrationDetails] =
    useState<RegistrationDetails>({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      TOS: false,
      country: undefined,
      city: undefined,
    });
  //

  // Navigation
  const navigate = useNavigate();

  // Clean the fields after a component change
  useEffect(() => {
    cleanup();
  }, [component]);

  // Get a list of all countries in the world
  useEffect(() => {
    const fetchCountries = async () => {
      // setLoading(true);
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const orderedCountries = sortStringsAlphabetically(
        data.map((country: any) => country.name.common)
      );
      setCountries(orderedCountries);
      setLoading(false);
    };
    fetchCountries();
  }, []);
  //

  // Based on the selected country, get a list of all cities in that country.
  useEffect(() => {
    const fetchCities = async () => {
      // setLoading(true);
      if (!registrationDetails.country) return;
      const url = "https://countriesnow.space/api/v0.1/countries/cities";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: registrationDetails.country,
          }),
        });
        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [registrationDetails.country]); // Whenever the country changes, get the cities for that country.
  //

  const cleanup = () => {
    setLoginDetails({ email: "", password: "" });
    setRegistrationDetails({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      TOS: false,
      country: undefined,
      city: undefined,
    });
    setLoading(false);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  // --- The function that handles the submission details for both the login and register components.
  const handleFormSubmission = async (event: React.FormEvent) => {
    // Initiate submission and prevent the page from refreshing.
    event.preventDefault();

    // Check the input fields of the relevant component
    const continueSubmission =
      component === "login" ? checkLoginForm() : checkRegistrationForm();
    if (!continueSubmission) {
      return;
    }

    // If everything looks okay for the relevant form, proceed with submission.
    setLoading(true);

    let url: string;
    let submissionDetails;
    url = component === "login" ? loginUrl : registerUrl;
    submissionDetails =
      component === "login" ? loginDetails : registrationDetails;

    try {
      // Make the request either to the registration endpoint or the login endpoint depending on the selected component.
      const res = await axios.post(url, submissionDetails, {
        withCredentials: true,
      });
      // withCredentials() makes your browser include cookies and authentication headers in your XHR request.
      // The cookies are needed for the server to know that the request is authenticated.

      // Registration logic
      if (component === "register" && res.status === 201) {
        setNotification({
          show: true,
          type: "success",
          message: res.data.msg,
          displayDuration: 5000,
        });
      }

      // Login logic
      if (component === "login" && res.status === 200) {
        console.log(res.data);
        // Set the login details of the user.
        console.log(res.data.user, "res.data.user");
        if (res.data.user) setUserDetails(res.data.user);
        // Redirect to the home page
        navigate("/");
      }
    } catch (error) {
      // Set a default error message if the error is not from the backend.
      let errorMessage = "Something went wrong, please try again later.";

      console.log("Error:", error);

      // Handle the error message from the backend if it exists.
      if (axios.isAxiosError(error) && error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      }

      // Set the correct error message.
      setError(errorMessage);
      setLoading(false);
    }
  };

  // --- Make basic checks of the provided login information.
  const checkLoginForm = () => {
    if (!isValidEmail(loginDetails.email)) {
      setError("Please enter a valid email.");
      return false;
    } else if (loginDetails.password.length < 8) {
      setError("Your password needs to be at least 8 characters long.");
      return false;
    }
    return true;
  };

  // --- Make basic check of the provided registration information.
  const checkRegistrationForm = () => {
    if (registrationDetails.name.length === 0) {
      setError("Please enter a valid name.");
      return false;
    } else if (registrationDetails.surname.length === 0) {
      setError("Please enter a valid surname");
      return false;
    } else if (!isValidEmail(registrationDetails.email)) {
      setError("Please enter a valid email.");
      return false;
    } else if (registrationDetails.password.length < 8) {
      setError("Your password needs to be at least 8 characters long.");
      return false;
    } else if (
      registrationDetails.password !== registrationDetails.confirmPassword
    ) {
      setError("Passwords do not match.");
      return false;
    } else if (!registrationDetails.TOS) {
      setError("Please agree to the terms of services.");
      return false;
    }
    return true;
  };

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main">
        <div className="container">
          <PageSidebar />

          <div className="page-content">
            <div className="panel login-and-signup-actions">
              <Button
                onClick={() => setComponent("login")}
                className={classNames(
                  component !== "login" && "btn btn--white-green",
                  component === "login" && "btn btn--green"
                )}
              >
                <span className="btn__text">Login</span>
              </Button>
              <Button
                onClick={() => setComponent("register")}
                className={classNames(
                  component !== "register" && "btn btn--white-green",
                  "btn--white",
                  component === "register" && "btn btn--green"
                )}
              >
                <span className="btn__text">Sign Up</span>
              </Button>
            </div>

            {component === "login" && (
              <Panel className="panel--login">
                <h1>Login</h1>
                <form
                  className="form form--login"
                  name="login"
                  onSubmit={handleFormSubmission}
                >
                  <div className="form-group form-group--email">
                    <label>Email</label>
                    <Input
                      type="email"
                      value={loginDetails.email}
                      name="email"
                      placeholder="bob@gmail.com"
                      onChange={(e) =>
                        setLoginDetails({
                          ...loginDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--password">
                    <label>Password</label>
                    <Input
                      type="password"
                      value={loginDetails.password}
                      name="password"
                      placeholder="1234"
                      onChange={(e) =>
                        setLoginDetails({
                          ...loginDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <input type="submit" hidden />
                  {error !== "" && !loading && (
                    <div className="form-group form--group--error">
                      <Error errorMessage={error} />
                    </div>
                  )}
                  <p className="p--forgottenPassword">
                    Click{" "}
                    <button
                      type="button"
                      onClick={() => setComponent("forgotPassword")}
                    >
                      here
                    </button>{" "}
                    if you have forgotten your password.
                  </p>
                  <Button
                    className="btn btn--green btn--login"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && (
                      <LoadingComponent color="#ffffff" size="small" />
                    )}
                    {!loading && <span className="btn__text">Login</span>}
                  </Button>
                </form>
              </Panel>
            )}

            {component === "register" && (
              <Panel className="panel--register">
                <h1>Register</h1>
                <form
                  className="form form--register"
                  name="register"
                  onSubmit={handleFormSubmission}
                >
                  <div className="form-group form-group--name">
                    <label>Name*</label>
                    <Input
                      value={registrationDetails.name}
                      type="text"
                      placeholder="Bob"
                      name="name"
                      className="input--name"
                      onChange={(e) =>
                        setRegistrationDetails({
                          ...registrationDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--surname">
                    <label>Surname*</label>
                    <Input
                      value={registrationDetails.surname}
                      type="text"
                      placeholder="Adams"
                      name="surname"
                      className="input--surname"
                      onChange={(e) =>
                        setRegistrationDetails({
                          ...registrationDetails,
                          surname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--email">
                    <label>Email*</label>
                    <Input
                      value={registrationDetails.email}
                      type="email"
                      placeholder="bob@gmail.com"
                      name="email"
                      className="input--email"
                      onChange={(e) =>
                        setRegistrationDetails({
                          ...registrationDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--country">
                    <label>Country (optional)</label>
                    <Select
                      id="country"
                      name="country"
                      className="select--country"
                      defaultOption="Select a country"
                      disabled={loading}
                      optionsList={countries}
                      onChange={(e) => {
                        let country = e.target.value;
                        setRegistrationDetails({
                          ...registrationDetails,
                          country:
                            country.charAt(0).toUpperCase() + country.slice(1),
                        });
                      }}
                    />
                  </div>
                  {registrationDetails.country && (
                    <div className="form-group form-group--city">
                      <label>City (optional)</label>
                      <Select
                        id="cities"
                        name="cities"
                        defaultOption="Select a city"
                        className="select--cities"
                        disabled={loading}
                        optionsList={cities}
                        onChange={(e) => {
                          let city = e.target.value;
                          setRegistrationDetails({
                            ...registrationDetails,
                            city: city.charAt(0).toUpperCase() + city.slice(1),
                          });
                        }}
                      />
                    </div>
                  )}
                  <div className="form-group form-group--locationAnnouncement">
                    <Info infoMessage="Your location will be used solely to inform users about the region where you offer your services. This information can be helpful for users seeking in-person learning opportunities." />
                  </div>
                  <div className="form-group form-group--password">
                    <label>Password*</label>
                    <Input
                      value={registrationDetails.password}
                      type="password"
                      placeholder="1234 (don't use this one)"
                      name="password"
                      className="input--password"
                      onChange={(e) =>
                        setRegistrationDetails({
                          ...registrationDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--confirmPassword">
                    <label>Confirm Password*</label>
                    <Input
                      value={registrationDetails.confirmPassword}
                      type="password"
                      placeholder="1234 (don't use this one)"
                      name="confirmPassword"
                      className="input--confirmPassword"
                      onChange={(e) =>
                        setRegistrationDetails({
                          ...registrationDetails,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group form-group--tos">
                    <label>Terms Of Service*</label>
                    <div className="custom-checkbox-cosntainer">
                      <Input
                        type="checkbox"
                        name="terms"
                        checked={registrationDetails.TOS}
                        onChange={() => {
                          setRegistrationDetails({
                            ...registrationDetails,
                            TOS: !registrationDetails.TOS,
                          });
                        }}
                      />
                    </div>
                    <p>
                      I agree to the
                      <a href="/">Terms Of Service</a>
                    </p>
                  </div>
                  <input type="submit" hidden />
                  {error !== "" && !loading && (
                    <div className="form-group form--group--error">
                      <Error errorMessage={error} />
                    </div>
                  )}
                  <div className="form-group form-group--buttons">
                    <Button
                      className="btn btn--green btn--signUp"
                      disabled={loading}
                      type="submit"
                    >
                      {loading && (
                        <LoadingComponent color="#ffffff" size="small" />
                      )}
                      {!loading && <span className="btn__text">Sign Up</span>}
                    </Button>
                  </div>
                </form>
              </Panel>
            )}

            {component === "forgotPassword" && <ForgotPassword />}
          </div>
        </div>
      </div>
      <Footer />
      <Notification />
    </div>
  );
};

export default LoginAndSignUp;
