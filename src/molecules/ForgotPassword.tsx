import { useState } from "react";
import axios from "axios";
// import isValidEmail from "../helperFunctions/isValidEmail";

import Panel from "../atoms/Panel";
import Input from "../quarks/Input";
import Button from "../quarks/Button";
import Error from "../quarks/Error";
import LoadingComponent from "../quarks/LoadingComponent";

import { forgotPasswordUrl } from "../constants/endpoints";
import Success from "../quarks/Success";

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Handles the submission of the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailIsValid = validateEmail(email);
    if (!emailIsValid) {
      console.log("Email is invalid");
      setTimeout(() => {
        cleanup();
      }, 5000);
      return;
    }

    // Initiate forgot password request
    setLoading(true);
    try {
      const res = await axios.post(forgotPasswordUrl, { email });
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      // Narrow the type of the error object
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setError(
            "There seems to be an issue with your connection. Please try again later."
          );
        } else if (error.response && error.response.status === 400) {
          setError("Invalid email address. Please check and try again.");
        } else {
          setError(
            "An error occurred. Please try again later. If the issue persists, please contact support."
          );
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      cleanup();
    }, 5000);
  };

  // Validates the email address
  const validateEmail = (email: string) => {
    if (email.length === 0) {
      setError("Please provide your email address before submitting.");
      return false;
    } else {
      return true;
    }
    // TO DO, VALIDATE EMAIL
  };

  // Clean up function
  const cleanup = () => {
    setEmail("");
    setError("");
    setSuccess(false);
  };

  return (
    <Panel className="panel--forgot-password">
      <h1>Forgotten Password</h1>

      <p>
        Please enter the email address associated with your account. We will
        send you instructions to reset your password.
      </p>

      {/* Form */}
      <form
        name="forgotPassword"
        className="form form--forgot-password"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Email Input */}
        <div className="form-group form-group--email">
          <label>Email</label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="myemail@gmail.com"
            name="email"
            value={email}
          />
        </div>
        <input type="submit" hidden />

        {/* Submission Button */}
        <Button className="btn btn--green btn--forgot-password" type="submit">
          {loading && <LoadingComponent size="small" />}
          {!loading && <span className="btn__text">Reset Password</span>}
        </Button>
      </form>

      {/* Error Message */}
      {error && <Error errorMessage={error} />}

      {/* Success Message */}
      {success && (
        <Success
          successMessage="If the email address you entered is associated with an account, a
            password reset link has been sent. Please check your inbox to
            proceed."
        />
      )}
      {/*  */}
    </Panel>
  );
}
