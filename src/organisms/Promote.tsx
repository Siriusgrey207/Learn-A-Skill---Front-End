import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Notification from "../quarks/Notification";
import PageSidebar from "../molecules/PageSidebar";
import Error from "../quarks/Error";
import LoadingComponent from "../quarks/LoadingComponent";
import Button from "../quarks/Button";
import Membership from "../atoms/Membership";
import LoginWarningPanel from "../quarks/LoginWarningPanel";
import ThankYouPanel from "../atoms/ThankYouPanel";

import hardCodedeMemberships from "../constants/memberships";
import { getMembershipsUrl } from "../constants/endpoints";
import { developmentMode } from "../constants/devTools";
import LightningIcon from "../icons/LightningIcon";
import { membershipTypes } from "../constants/memberships";
import { useUserContext } from "../hooks/useUserContext";

const Promote: React.FC = () => {
  // Global Context
  const { userDetails } = useUserContext();

  // Local State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [membershipDuration, setMembershipDuration] = useState<string>("year");
  const [memberships, setMemberships] = useState<membershipTypes[]>([]);

  useEffect(() => {
    getMembershipOptions();
  }, []);

  const getMembershipOptions = async () => {
    try {
      const res = await axios.get(getMembershipsUrl);
      const memberships = res.data;
      if (developmentMode) {
        setMemberships(hardCodedeMemberships);
      } else {
        setMemberships(memberships);
      }
    } catch (error) {
      console.log(error);
      setError(
        "We were unable to obtain the possible memberships. Please check your internet connection or try again later."
      );
      setLoading(false);
    } finally {
      if (developmentMode) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main">
        <div className="container">
          <PageSidebar />
          <div className="page-content">
            <div
              className={classNames(
                "memberships-container",
                loading && "memberships-container--loading",
                error !== "" && "memberships-container--error"
              )}
            >
              {loading && <LoadingComponent size="large" color="#2D6E46" />}
              {!loading && error !== "" && <Error errorMessage={error} />}
              {!loading && error === "" && (
                <>
                  {userDetails.isLoggedIn && (
                    <>
                      <div className="membership-length-buttons">
                        <Button
                          type="button"
                          className={classNames(
                            "btn",
                            "btn--forAMonth",
                            membershipDuration === "month"
                              ? "btn--green"
                              : "btn--white-green"
                          )}
                          onClick={() => setMembershipDuration("month")}
                        >
                          <LightningIcon />
                          <span className="btn__text">Enhance For A Month</span>
                        </Button>
                        <Button
                          type="button"
                          className={classNames(
                            "btn",
                            "btn--forAYear",
                            membershipDuration === "year"
                              ? "btn--green"
                              : "btn--white-green"
                          )}
                          onClick={() => setMembershipDuration("year")}
                        >
                          <LightningIcon />
                          <span className="btn__text">Enhance For A Year</span>
                        </Button>
                      </div>
                      {userDetails.isPremium && <ThankYouPanel />}
                      {memberships.map((membership) => {
                        if (
                          (membership.name === "premium" ||
                            membership.name === "organization") &&
                          userDetails.isPremium
                        )
                          return null;
                        return (
                          <Membership
                            key={membership.id}
                            membership={membership}
                            membershipDuration={membershipDuration}
                          />
                        );
                      })}
                    </>
                  )}
                  {!userDetails.isLoggedIn && <LoginWarningPanel />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Notification />
    </div>
  );
};

export default Promote;
