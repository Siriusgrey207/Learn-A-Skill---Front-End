import React, { useState, useEffect } from "react";

import { useNotificationContext } from "../hooks/useNotificationContext";
import { useUserContext } from "../hooks/useUserContext";

import Button from "../quarks/Button";
import LessonDetails from "../atoms/LessonDetails";
import LoadingComponent from "../quarks/LoadingComponent";
import Error from "../quarks/Error";
import Panel from "./Panel";
import Input from "../quarks/Input";

import PlusIcon from "../icons/PlusIcon";
import SaveIcon from "../icons/SaveIcon";
import CloseIcon from "../icons/CloseIcon";

import { developmentMode } from "../constants/devTools";
import {
    getScheduledLessonsUrl,
    saveNewLessonUrl,
} from "../constants/endpoints";
import axios from "axios";

import {
    fakeScheduledLessons,
    ScheduledLessonTypes,
} from "../constants/fakeData";

const ScheduleALesson: React.FC = () => {
    // Global Context
    const { setNotification } = useNotificationContext();
    const { userDetails } = useUserContext();

    // Local State - basic
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [lessons, setLessons] = useState<ScheduledLessonTypes[]>([]);
    const [addNewLesson, setAddNewLesson] = useState<boolean>(false);

    // Local State - form handling
    const [newLessonDetails, setNewLessonDetails] =
        useState<ScheduledLessonTypes>({
            userId: userDetails.userId,
            lessonId: crypto.randomUUID(),
            subject: "",
            learners: "",
            date: "",
            time: "",
            additionalInfo: "",
        });

    useEffect(() => {
        const fetchScheduledLessons = async () => {
            setLoading(true);
            try {
                const res = await axios.get(getScheduledLessonsUrl);
                const data = res.data;
                setLessons(developmentMode ? fakeScheduledLessons : data);
            } catch (error) {
                console.error("Unexpected error:", error);
                setError(
                    "An unexpected error occurred. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchScheduledLessons();
    }, []);

    const handleNewLessonSubmission = async (event: React.FormEvent) => {
        console.log("[handleNewLessonSubmission]", newLessonDetails);
        event.preventDefault();

        if (newLessonDetails.userId === "") {
            setNotification({
                show: true,
                type: "danger",
                message:
                    "Please log in to add this lesson to your saved reminders.",
                displayDuration: 5000,
            });
            return;
        }

        if (
            newLessonDetails.subject === "" ||
            newLessonDetails.learners === "" ||
            newLessonDetails.date === "" ||
            newLessonDetails.time === ""
        ) {
            setNotification({
                show: true,
                type: "danger",
                message:
                    "Please ensure that you have filled all mandatory fields.",
                displayDuration: 5000,
            });
            return;
        }

        setLessons([...lessons, { ...newLessonDetails }]);
        updateUpcomingLessons([...lessons, { ...newLessonDetails }]);
    };

    const removeLesson = async (lessonId: string) => {
        if (newLessonDetails.userId === "") {
            setNotification({
                show: true,
                type: "danger",
                message:
                    "Please log in to remove this lesson from your saved reminders.",
                displayDuration: 5000,
            });
            return;
        }

        const newLessonsList = lessons.filter(
            (lesson) => lesson.lessonId !== lessonId
        );

        setLessons(newLessonsList);
        updateUpcomingLessons(newLessonsList);
    };

    const updateUpcomingLessons = async (
        passedLessons: ScheduledLessonTypes[]
    ) => {
        console.log("[updateUpcomingLessons]");
        setLoading(true);
        try {
            console.log("Data that is sent to the backend.", passedLessons);
            await axios.post(saveNewLessonUrl, passedLessons);
            setNotification({
                show: true,
                type: "success",
                message: "Lesson has been added.",
                displayDuration: 5000,
            });
        } catch (error) {
            console.log(error);
            setNotification({
                show: true,
                type: "danger",
                message: "Unable to save lesson.",
                displayDuration: 5000,
            });
        } finally {
            setLoading(false);
            setNewLessonDetails({
                userId: userDetails.userId,
                lessonId: crypto.randomUUID(),
                subject: "",
                learners: "",
                date: "",
                time: "",
                additionalInfo: "",
            });
        }
    };

    return (
        <>
            <div className="panel panel--scheduleALesson">
                {!loading && error === "" && (
                    <div className="scheduleALesson__noLessons">
                        <p>
                            {lessons &&
                                `You currently have ${lessons.length} scheduled lessons.`}
                        </p>
                        <Button
                            onClick={() => setAddNewLesson(true)}
                            type="button"
                            className="btn btn--green btn--scheduleALesson"
                        >
                            <PlusIcon />
                            <span className="btn__text">
                                Add an upcoming lesson
                            </span>
                        </Button>
                    </div>
                )}
                {loading && error === "" && (
                    <LoadingComponent size="medium" color="#2D6E46" />
                )}
                {!loading && error !== "" && <Error errorMessage={error} />}
            </div>
            {addNewLesson && (
                <Panel className="panel--addNewLesson">
                    <h1>Add an upcoming lesson</h1>
                    <form
                        className="form form--addNewLesson"
                        name="addNewLesson"
                        onSubmit={handleNewLessonSubmission}
                    >
                        <div className="form-group form-group--subject">
                            <label>Subject*</label>
                            <Input
                                value={newLessonDetails.subject}
                                type="text"
                                placeholder="Chess lesson"
                                name="subject"
                                onChange={(e) =>
                                    setNewLessonDetails({
                                        ...newLessonDetails,
                                        subject: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group form-group--students">
                            <label>Students*</label>
                            <Input
                                value={newLessonDetails.learners}
                                type="text"
                                placeholder="Bob, Mark ..."
                                name="students"
                                onChange={(e) =>
                                    setNewLessonDetails({
                                        ...newLessonDetails,
                                        learners: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group form-group--date">
                            <label>Date*</label>
                            <Input
                                value={newLessonDetails.date}
                                type="text"
                                placeholder="19.04.2024"
                                name="date"
                                onChange={(e) =>
                                    setNewLessonDetails({
                                        ...newLessonDetails,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group form-group--time">
                            <label>Time*</label>
                            <Input
                                value={newLessonDetails.time}
                                type="text"
                                placeholder="20:00 PM"
                                name="time"
                                onChange={(e) =>
                                    setNewLessonDetails({
                                        ...newLessonDetails,
                                        time: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group form-group--additionalInfo">
                            <label>Additional Information (optional)</label>
                            <Input
                                value={newLessonDetails.additionalInfo}
                                type="text"
                                placeholder="They said they may not be able to attend."
                                name="additionalInfo"
                                onChange={(e) =>
                                    setNewLessonDetails({
                                        ...newLessonDetails,
                                        additionalInfo: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input type="submit" hidden />
                        <div className="form-group form-group--buttons">
                            <Button
                                className="btn btn--green btn--submitNewLesson"
                                disabled={loading}
                                type="submit"
                            >
                                <SaveIcon />
                                <span className="btn__text">Save</span>
                            </Button>
                        </div>
                    </form>
                    <Button
                        className="btn btn--red btn--cancel"
                        disabled={loading}
                        onClick={() => setAddNewLesson(false)}
                    >
                        <CloseIcon />
                    </Button>
                </Panel>
            )}
            {lessons.length > 0 && (
                <div className="scheduleALesson__lessons">
                    {lessons.map((lesson) => (
                        <LessonDetails
                            key={lesson.lessonId}
                            userId={userDetails.userId}
                            lessonId={lesson.lessonId}
                            subject={lesson.subject}
                            learners={lesson.learners}
                            date={lesson.date}
                            time={lesson.time}
                            additionalInfo={lesson.additionalInfo}
                            removeLesson={removeLesson}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default ScheduleALesson;
