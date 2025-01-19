import React, { useState, useEffect } from "react";
import axios from "axios";

import { useUserContext } from "../hooks/useUserContext";
import { createNewSkillUrl } from "../constants/endpoints";
import { developmentMode } from "../constants/devTools";
import { currencyTypes } from "../atoms/DropdownCurrency";

import Panel from "../atoms/Panel";
import Input from "../quarks/Input";
import Textarea from "../quarks/TextArea";
import CategoriesDropdown from "../atoms/CategoriesDropdown";
import Button from "../quarks/Button";
import Error from "../quarks/Error";
import DropdownCurrency from "../atoms/DropdownCurrency";
import LoadingComponent from "../quarks/LoadingComponent";
import Info from "../quarks/Info";

import LightningIcon from "../icons/LightningIcon";
import TeachIcon from "../icons/TeachIcon";

type newSkillTypes = {
  userId: string;
  email: string;
  discord?: string;
  skype?: string;
  phone?: string;
  skillId: string;
  skillName: string;
  skillPrice: number;
  lessonDuration: number;
  skillCurrencyCode: string;
  skillCurrencySymbol: string;
  skillRelevantExperience: string;
  skillImg: File | null;
  skillRating: number | null;
  skillDescription: string;
  skillTags: string[];
};

type newSkillTypesWithTOS = newSkillTypes & {
  TOS: boolean;
};

type TeachNewSkillTypes = {
  setComponent: (component: string) => void;
};

const TeachNewSkill: React.FC<TeachNewSkillTypes> = (props) => {
  const { setComponent } = props;

  // Global Context
  const { userDetails } = useUserContext();
  // TO DO - Check if the user is premium in the front end. If they aren't allow them 2 tags, If they are, allow them 5 tags.

  // Local State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // The default values for the new lesson.
  const [newSkill, setNewSkill] = useState<newSkillTypesWithTOS>({
    userId: userDetails.userId,
    email: userDetails.email,
    discord: userDetails.discord || "",
    skype: userDetails.skype || "",
    phone: userDetails.phone || "",
    skillId: Date.now().toString(),
    skillName: "",
    skillPrice: 19,
    lessonDuration: 60,
    skillCurrencyCode: "USD",
    skillCurrencySymbol: "$",
    skillRelevantExperience: "",
    skillImg: null,
    skillRating: null,
    skillDescription: "",
    skillTags: [],
    TOS: false,
  });

  // ----- Make the error message disappear once the user has made any changes to the form
  useEffect(() => {
    setError("");
  }, [newSkill]);

  // ----- Handles the skill tags
  const updateSkillTags = (tagsList: string[]) => {
    setNewSkill({ ...newSkill, skillTags: tagsList });
  };

  // ----- Save the selected image and preview it
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the user changes their mind and changes the Image, we want to free up the memore first
    if (previewImage) URL.revokeObjectURL(previewImage); // Revoke the old preview if it exists.

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewSkill({ ...newSkill, skillImg: file });
      setPreviewImage(URL.createObjectURL(file)); // Generate a URL for the image preview
    }
  };

  // ----- Initial form checks
  const handleFormCheck = () => {
    // Make sure the user is logged in.
    if (!userDetails.isLoggedIn) {
      setError("Please log in to perform this action.");
      return false;
    }
    // Skill name checks.
    if (newSkill.skillName.trim().length < 10) {
      setError("The skill name must be at least 10 characters long.");
      return false;
    }
    if (newSkill.skillName.trim().length > 80) {
      setError("The skill name must be less thatn 50 characters long.");
      return false;
    }
    // Skill description checks.
    if (newSkill.skillDescription.trim().length < 100) {
      setError("The skill description must be at least 100 characters long.");
      return false;
    }
    if (newSkill.skillDescription.trim().length > 1500) {
      setError(
        "This skill description must be less that 1500 characters long."
      );
      return false;
    }
    // Skill relevant experience checks.
    if (newSkill.skillRelevantExperience.trim().length === 0) {
      setError(
        "Please provide relevant experience to help build trust with potential clients."
      );
      return false;
    }
    if (newSkill.skillRelevantExperience.trim().length > 200) {
      setError(
        "The relevant experience you have provided is too long. Please make it less than 200 characters."
      );
      return false;
    }

    if (newSkill.skillTags.length === 0) {
      setError(
        "Please provide at least one category tag to help users find you more easily."
      );
      return false;
    }

    if (newSkill.skillTags.length > 5) {
      setError(
        "Please reduce the number of tags. A maximum of 5 tags is allowed."
      );
      return false;
    }

    // Price checks
    if (!newSkill.skillPrice) {
      setError(
        "An hourly rate is required. Please provide this information to proceed."
      );
      return false;
    }
    if (typeof newSkill.skillPrice !== "number" || isNaN(newSkill.skillPrice)) {
      setError("Invalid lesson price. The price needs to be a valid number.");
      return false;
    }

    if (!newSkill.email || newSkill.email.trim().length === 0) {
      setError("An email address is required. Please provide a valid email.");
      return false;
    }

    if (!newSkill.email.includes("@")) {
      setError(
        "The email address you entered is invalid. Please provide a valid email."
      );
      return false;
    }

    if (!newSkill.TOS) {
      setError("You must agree to the terms and conditions to proceed.");
      return false;
    }

    return true;
  };

  // ----- Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    const formValidated = handleFormCheck();

    if (!formValidated) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(createNewSkillUrl, {
        ...newSkill,
        name: userDetails.name,
        surname: userDetails.surname,
        userIsPremium: userDetails.userIsPremium,
        userIsInOrganization: userDetails.userIsInOrganization,
        userImage: userDetails.userImage,
      });
      if (res.status === 200) setSuccess(true);
    } catch (error) {
      setError(
        "Unable to add a new skill to the list of taught skills. Please try again later, and/or contact us for more information"
      );
      console.log(error);
    } finally {
      // ----- CLEAN UP

      // Free up memory used by the image the user has uploaded
      if (previewImage) URL.revokeObjectURL(previewImage);

      // Set loading to false
      if (developmentMode) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setLoading(false);
      }
    }
  };

  const handleCurrencyChange = (newCurrency: currencyTypes) => {
    setNewSkill({
      ...newSkill,
      skillCurrencyCode: newCurrency.code,
      skillCurrencySymbol: newCurrency.symbol,
    });
  };

  return (
    <>
      {!success && (
        <Panel>
          <h1>New Skill</h1>
          <form
            className="form form--new-skill"
            name="skillForm"
            onSubmit={handleSubmit}
          >
            <div className="form-group form-group--title">
              <label>Title*</label>
              <Input
                type="text"
                name="title"
                disabled={loading}
                value={newSkill.skillName}
                placeholder="Astrophysics Lessons"
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    skillName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--description">
              <label>Description*</label>
              <Textarea
                disabled={loading}
                name="description"
                value={newSkill.skillDescription}
                placeholder="If you would like to learn how the universe ticks..."
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    skillDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--relevantExperience">
              <label>Relevant Experience*</label>
              <Input
                type="text"
                disabled={loading}
                name="relevantExperience"
                value={newSkill.skillRelevantExperience}
                placeholder="MPhys. Physics, Astrophysics, Cosmology"
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    skillRelevantExperience: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--relevantExperience">
              <label>Categories*</label>
              <CategoriesDropdown
                updateSkillTags={updateSkillTags}
                mode="select"
              />
            </div>
            <div className="form-group form-group--image">
              <label>Image*</label>
              <div className="form-group__inner">
                <input
                  className="input input--img"
                  type="file"
                  disabled={loading}
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file-input"
                />
                {previewImage && (
                  <div className="image-preview">
                    <img
                      src={previewImage}
                      alt="Selected Preview"
                      style={{
                        width: "184px",
                        maxHeight: "184px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-group form-group--lesson-duration">
              <div className="form-group__inner">
                <label>Lesson duration (in minutes)*</label>
                <Input
                  name="lessonDuration"
                  type="text"
                  disabled={loading}
                  //   value={newSkill.skillPrice}
                  placeholder="60"
                  onChange={(e) => {
                    // Convert the value to a number, defaulting to 0 if empty or invalid
                    const price = Number(e.target.value);
                    if (!isNaN(price)) {
                      setNewSkill({
                        ...newSkill,
                        lessonDuration: price,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group form-group--price">
              <div className="form-group__inner">
                <label>Price per lesson*</label>
                <Input
                  name="price"
                  type="text"
                  disabled={loading}
                  value={newSkill.skillPrice}
                  placeholder="22"
                  onChange={(e) => {
                    // Convert the value to a number, defaulting to 0 if empty or invalid
                    const price = Number(e.target.value);
                    if (!isNaN(price)) {
                      setNewSkill({
                        ...newSkill,
                        skillPrice: price,
                      });
                    }
                  }}
                />
                <DropdownCurrency handleCurrencyChange={handleCurrencyChange} />
              </div>
            </div>
            <div className="form-group form-group--email">
              <label>Email*</label>
              <Input
                value={newSkill.email}
                name="email"
                type="email"
                disabled={loading}
                placeholder="myemail@gmail.com"
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--phone">
              <label>Phone</label>
              <Input
                value={newSkill.phone}
                name="phone"
                type="text"
                disabled={loading}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--discord">
              <label>Discord</label>
              <Input
                value={newSkill.discord}
                name="discord"
                type="text"
                disabled={loading}
                placeholder="myDiscord"
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    discord: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--skype">
              <label>Skype</label>
              <Input
                value={newSkill.skype}
                name="skype"
                disabled={loading}
                type="text"
                placeholder="mySkype"
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    skype: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group form-group--tos">
              <label>Terms Of Service*</label>
              <div className="custom-checkbox-cosntainer">
                <Input
                  type="checkbox"
                  disabled={loading}
                  name="terms"
                  checked={newSkill.TOS}
                  onChange={() =>
                    setNewSkill({
                      ...newSkill,
                      TOS: !newSkill.TOS,
                    })
                  }
                />
              </div>
              <p
                className="cursor-pointer"
                onClick={() => setNewSkill({ ...newSkill, TOS: !newSkill.TOS })}
              >
                I agree to the
                <a href="/" target="_blank">
                  Terms Of Service
                </a>
              </p>
            </div>
            <div className="form-group form-group--info">
              <Info infoMessage="Please double-check the details of your offer. Currently, offers cannot be edited. If you need to make any changes, you will have to create a new offer from scratch." />
            </div>
            <input type="submit" hidden />
            {error !== "" && (
              <div className="form-group form-group--error">
                <Error errorMessage={error} />
              </div>
            )}
            <Button type="submit" className="btn btn--green btn--submit">
              {loading && <LoadingComponent size="small" color="#2D6E46" />}
              {!loading && <span className="btn__text">Submit</span>}
            </Button>
          </form>
        </Panel>
      )}
      {success && (
        <Panel className="panel--successfulSkillSubmission">
          <h1>Skill Successfully Submitted</h1>
          <p>
            Thank you for joining our community! You can relax while we take
            care of the next steps.
          </p>
          <p>
            Your skill offer is currently under review to ensure compliance with
            our platform's terms and conditions.
          </p>
          <p>
            <b>
              Want to increase the visibility of your offer once it's approved?
              Consider going premium!
            </b>
          </p>
          <div className="buttons">
            <a href="/promote" className="btn btn--orange btn--promote">
              <LightningIcon />
              <span className="btn__text">Promote</span>
            </a>
            <Button
              onClick={() => setComponent("editTaughtSkills")}
              type="button"
              className="btn btn--white-green"
            >
              <TeachIcon />
              <span className="btn__text">Skill That You Teach</span>
            </Button>
          </div>
        </Panel>
      )}
    </>
  );
};

export default TeachNewSkill;
