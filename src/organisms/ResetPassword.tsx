import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Panel from "../atoms/Panel";
import PageSidebar from "../molecules/PageSidebar";
import Button from "../quarks/Button";
import LoadingComponent from "../quarks/LoadingComponent";
import Error from "../quarks/Error";

import axios from "axios";
import { resetPasswordUrl } from "../constants/endpoints";
import Success from "../quarks/Success";

const ResetPassword: React.FC = () => {
  // Local State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  // Other
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  let token = queryParams.get("token");
  let email = queryParams.get("email");

  // Upon loading of the page, we want to make sure the email and token are in the query params
  useEffect(() => {
    // If one of the two is missing, redirect to the homepage.
    if (!token || !email) {
      navigate("/");
    }
  }, [navigate]);

  // This method ensures that the input fields are filled in and ensures that the two passwords are the same.
  const verifyForm = () => {
    if (password.length === 0 || confirmedPassword.length === 0) {
      setError(
        "Please ensure both fields are filled out to reset your password."
      );
      return false;
    } else if (password.length < 8 || confirmedPassword.length < 8) {
      setError("Your new password must be at least 8 characters long.");
      return false;
    } else if (password !== confirmedPassword) {
      setError("Please ensure that both passwords match!");
      return false;
    } else {
      return true;
    }
  };

  // Handles the submission of the reset password form.
  const submitResetPasswordForm = async (event: React.FormEvent) => {
    // Initiate submission and prevent the page from refreshing.
    event.preventDefault();

    const proceedWithSubmission = verifyForm();
    if (!proceedWithSubmission) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(resetPasswordUrl, {
        token,
        email,
        password,
      });
      if (res.status === 200) setSuccess(true);
    } catch (error) {
      // Set a default error message if the error is not from the backend.
      let errorMessage =
        "An error occurred while updating your password. Please try again later.";

      // Handle the error message from the backend if it exists.
      if (axios.isAxiosError(error) && error.response?.data?.msg)
        errorMessage = error.response.data.msg;

      // In the case when the user has bad internet:
      if (axios.isAxiosError(error) && error.code === "ERR_NETWORK")
        errorMessage =
          "There seems to be an issue with your connection. Please try again later.";

      setError(errorMessage);
    }

    setLoading(false);
    setTimeout(() => {
      setError("");
      setSuccess(false);
      navigate("/login?action=login");
    }, 5000);
  };

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main page-main--reset-password">
        <div className="container">
          <PageSidebar />
          <div className="page-content">
            <Panel className="panel--reset-password">
              <h1>Reset Password</h1>
              <p>Please set a new password for your account.</p>
              <form
                name="resetPassword"
                className="form form--reset-password"
                onSubmit={submitResetPasswordForm}
              >
                <div className="form__fields">
                  <div className="form-group form-group--password">
                    <label>Password</label>
                    <input
                      type="password"
                      className="input input--password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="form-group form-group--confirm-password">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="input input--password"
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                      value={confirmedPassword}
                    />
                  </div>
                </div>

                <input type="submit" hidden />

                {error !== "" && (
                  <div className="error-container">
                    <Error errorMessage={error} />
                  </div>
                )}

                {success && (
                  <Success successMessage="Your password has been successfully reset. You will be redirected to the login page shortly." />
                )}

                <Button className="btn btn--green btn--submit" type="submit">
                  {loading ? (
                    <LoadingComponent size="small" />
                  ) : (
                    <span className="btn__text">Reset Password</span>
                  )}
                </Button>
              </form>
            </Panel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
