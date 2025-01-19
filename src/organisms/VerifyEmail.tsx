import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import PageSidebar from "../molecules/PageSidebar";
import Panel from "../atoms/Panel";
import Notification from "../quarks/Notification";
import LoadingComponent from "../quarks/LoadingComponent";

import { verifyEmailUrl } from "../constants/endpoints";
import Button from "../quarks/Button";

const VerifyEmail: React.FC = () => {
  // Local State
  const [loading, setLoading] = useState<boolean>(true);
  const [userVerified, setUserVerified] = useState<boolean>(false);

  // Handle the post request upon page load.
  useEffect(() => {
    handleEmailVerification();
  }, []);

  // Submit a post request to the backend to verify the user:
  const handleEmailVerification = async () => {
    // Get the token and the email from the url params
    const { email, token } = getEmailAndToken();
    if (!email || !token) return;

    // Send the post request to verify the token and email
    axios
      .post(verifyEmailUrl, { verificationToken: token, email })
      .then(() => {
        setUserVerified(true);
      })
      .catch(() => {
        setUserVerified(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Get the email and the token from the url
  const getEmailAndToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email") || null;
    const token = urlParams.get("token") || null;

    if (!email || !token) {
      setUserVerified(false);
      return { email: null, token: null };
    }

    return { email, token };
  };

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main">
        <div className="container">
          <PageSidebar />
          <div className="page-content">
            {!loading ? (
              <Panel className="panel--aboutUs">
                <h1>
                  {userVerified
                    ? "Your account has been verified"
                    : "We were unable to verify your account."}
                </h1>
                {userVerified ? (
                  <p>
                    Thank you for verifying your account. Click{" "}
                    <a href="/login">here</a> to login.
                  </p>
                ) : (
                  <>
                    <p>
                      Something unexpected happened, and we were unable to
                      verify your account. Please contact support if the issue
                      persists.
                    </p>
                    <p>
                      Alternatively, you can click the button below to try
                      again.
                    </p>
                    <Button
                      type="button"
                      className="btn btn--green"
                      disabled={loading}
                      onClick={() => handleEmailVerification()}
                    >
                      <span className="btn__text">Try Again</span>
                    </Button>
                  </>
                )}
              </Panel>
            ) : (
              <LoadingComponent color="#2D6E46" size="large" />
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Notification />
    </div>
  );
};

export default VerifyEmail;
