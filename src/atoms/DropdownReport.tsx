import { useState } from "react";
import { useNotificationContext } from "../hooks/useNotificationContext";
import { useUserContext } from "../hooks/useUserContext";
import { api } from "../services";

import Dropdown from "./Dropdown";
import Button from "../quarks/Button";
import Select from "../quarks/Select";

// import reportUserOrSkill from "../helperFunctions/reportUserOrSkill";
import ChevronIcon from "../icons/ChevronIcon";
import LoadingComponent from "../quarks/LoadingComponent";
import { SkillTypes, reportReasons } from "../constants/fakeData";
import { reportSkillUrl } from "../constants/endpoints";
import axios from "axios";
// import { UserIdleState } from "@excalidraw/excalidraw/types/types";

type ReportDropdownTypes = {
  skillDetails: SkillTypes;
};

export default function ReportDropdown(props: ReportDropdownTypes) {
  // Props
  const { skillDetails } = props;

  // Global Context
  const { setNotification } = useNotificationContext();
  const { userDetails } = useUserContext();

  // Local State
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>("");

  // Method that handles the submission of the report.
  async function handleFormSubmission(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    // Construct the data object in the correct format.
    const data = {
      reportingUserId: userDetails.userId,
      reportingUserName: userDetails.name,
      reportingUserSurname: userDetails.surname,
      reportedUserId: skillDetails.userId,
      reportedUserName: skillDetails.name,
      reportedUserSurname: skillDetails.surname,
      reportedSkillId: skillDetails._id,
      reportedSkillName: skillDetails.skillName,
      reportReason,
    };

    try {
      // If the report was submitted successfully
      const res = await api.post(reportSkillUrl, data);
      if (res.status === 201 && res.data?.msg) {
        // Notify the user the report was submitted successfully
        setNotification({
          show: true,
          type: "success",
          message: res.data.msg,
          displayDuration: 5000,
        });
      }
    } catch (error) {
      // Handle the error.
      if (axios.isAxiosError(error) && error.response?.data?.msg) {
        setNotification({
          show: true,
          type: "danger",
          message: error.response.data.msg,
          displayDuration: 5000,
        });
      } else {
        setNotification({
          show: true,
          type: "danger",
          message:
            "An unexpected error occurred, and we couldn't submit your report. Please contact us if the issue persists.",
          displayDuration: 5000,
        });
      }
    }
    setLoading(false);
  }

  return (
    <Dropdown isToggled={toggle} className="dropdown--report">
      <Button
        className="btn btn--red btn--report dd__toggle"
        type="button"
        onClick={() => setToggle(!toggle)}
      >
        <span className="btn__text">Report</span>
        <ChevronIcon />
      </Button>
      <div className="dropdown__main dropdown__main--red">
        <form
          id="report"
          name="report"
          className="form form--report"
          onSubmit={handleFormSubmission}
        >
          <div className="form-group form-group--report-reason">
            <span>Please select a reson for your report.</span>
            <Select
              id="reason"
              name="reason"
              className="select--reason"
              disabled={loading}
              defaultOption="Select a reason"
              optionsList={reportReasons}
              onChange={(e) => setReportReason(e.target.value)}
            />
          </div>
          <div className="form-group form-group--buttons form-group--report-button">
            <Button
              className="btn btn--red btn--report"
              disabled={reportReason === "" ? true : false}
              type="submit"
            >
              {loading && <LoadingComponent color="#ffffff" size="small" />}
              {!loading && <span className="btn__text">Report</span>}
            </Button>
          </div>
        </form>
      </div>
    </Dropdown>
  );
}
