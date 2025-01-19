import { useState } from "react";
import { useNotificationContext } from "../hooks/useNotificationContext";

import Dropdown from "./Dropdown";
import Button from "../quarks/Button";
import Select from "../quarks/Select";

// import reportUserOrSkill from "../helperFunctions/reportUserOrSkill";
import ChevronIcon from "../icons/ChevronIcon";
import LoadingComponent from "../quarks/LoadingComponent";
import { SkillTypes, reportReasons } from "../constants/fakeData";
import { reportSkillUrl } from "../constants/endpoints";
import axios from "axios";

type ReportDropdownTypes = {
    skillDetails: SkillTypes;
};

export default function ReportDropdown(props: ReportDropdownTypes) {
    const { skillDetails } = props;

    // Global Context
    const { setNotification } = useNotificationContext();

    // Local State
    const [loading, setLoading] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [reportReason, setReportReason] = useState<string>("");

    async function handleFormSubmission(event: React.FormEvent) {
        console.log("[handleFormSubmission]");
        setLoading(true);
        event.preventDefault();

        const data = {
            type: "skill",
            reportedUserId: skillDetails.userId,
            reportedSkillId: skillDetails.skillId,
            reason: reportReason,
        };

        try {
            console.log(data);
            await axios.post(reportSkillUrl, data);
            setNotification({
                show: true,
                type: "success",
                message: "Skill has been reported successfully",
                displayDuration: 5000,
            });
        } catch (error) {
            console.error("Error reporting:", error);
            setNotification({
                show: true,
                type: "danger",
                message: "Unable to report, please try again later",
                displayDuration: 5000,
            });
        } finally {
            setLoading(false);
        }
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
                    <div className="form-group form-group--buttons">
                        <Button
                            className="btn btn--red btn--report"
                            disabled={reportReason === "" ? true : false}
                            type="submit"
                        >
                            {loading && (
                                <LoadingComponent
                                    color="#ffffff"
                                    size="small"
                                />
                            )}
                            {!loading && (
                                <span className="btn__text">Report</span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </Dropdown>
    );
}
