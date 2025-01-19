import React, { useState, useEffect } from "react";

import Panel from "../atoms/Panel";
import Button from "../quarks/Button";
import EditSkillCard from "../atoms/EditSkillCard";
import PlusIcon from "../icons/PlusIcon";
import LoadingComponent from "../quarks/LoadingComponent";

// import { developmentMode } from "../constants/devTools";
import { useUserContext } from "../hooks/useUserContext";

import { SkillTypes } from "../constants/fakeData";
import { developmentMode } from "../constants/devTools";

const EditTaughtSkills: React.FC = () => {
    // Global Context
    const { userDetails } = useUserContext();

    // Local State
    const [loading, setLoading] = useState<boolean>(false);
    const [taughtSkills, setTaughtSkills] = useState<SkillTypes[] | []>([]);

    useEffect(() => {
        setTaughtSkills(userDetails.skills);
    }, [userDetails.skills]);

    // ----- Updates the list of taught skills if the user removes one of their taught skills
    const updateListOfSkills = (skillId: string) => {
        setLoading(true);
        const updatedListOfSkills = taughtSkills.filter(
            (skill) => skill.skillId !== skillId
        );
        setTaughtSkills(updatedListOfSkills);
        if (developmentMode) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="edit-taught-skill-container">
            {/* {!userDetails.isLoggedIn && (
                <Panel className="panel--pleaseLogin">
                    <h6>
                        Please <a href="/login">login</a> to edit the skills
                        that you teach.
                    </h6>
                </Panel>
            )} */}
            {userDetails.isLoggedIn && taughtSkills.length === 0 && (
                <Panel className="panel--noTaughtSkills">
                    <h6>Currently, you are not teaching any skills.</h6>
                    <Button className="btn btn--green btn--teachASkill">
                        <PlusIcon />
                        <span className="btn__text">Teach a skill</span>
                    </Button>
                </Panel>
            )}
            {userDetails.isLoggedIn &&
                taughtSkills.length !== 0 &&
                !loading && (
                    <>
                        {taughtSkills.map((skillDetails) => (
                            <EditSkillCard
                                key={skillDetails.skillId}
                                skillDetails={skillDetails}
                                updateListOfSkills={updateListOfSkills}
                            />
                        ))}
                    </>
                )}
            {loading && <LoadingComponent size="large" color="#2D6E46" />}
        </div>
    );
};

export default EditTaughtSkills;
