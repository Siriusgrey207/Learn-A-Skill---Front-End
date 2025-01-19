import Button from "../quarks/Button";

import TeachIcon from "../icons/TeachIcon";
import LearnersIcon from "../icons/LearnerIcon";
import CalendarIcon from "../icons/CalendarIcon";
import TimeIcon from "../icons/TimeIcon";
import InfoIcon from "../icons/InfoIcon";
import CloseIcon from "../icons/CloseIcon";

// import { ScheduledLessonTypes } from "../constants/fakeData";

export type LessonDetailsTypes = {
    userId: string;
    lessonId: string;
    subject: string;
    learners: string;
    date: string;
    time: string;
    additionalInfo?: string | undefined;
    removeLesson: (lessonId: string) => void;
};

const LessonDetails: React.FC<LessonDetailsTypes> = (props) => {
    const {
        userId,
        lessonId,
        subject,
        learners,
        date,
        time,
        additionalInfo,
        removeLesson,
    } = props;

    return (
        <div className="panel panel--lesson" key={lessonId + userId}>
            <Button
                className="btn btn--red btn--cancel"
                onClick={() => removeLesson(lessonId)}
            >
                <CloseIcon />
            </Button>
            <div className="lesson-info-group lesson-info-group--subject">
                <h6>
                    <TeachIcon />
                    <span>Subject</span>
                </h6>
                <p>{subject}</p>
            </div>
            <div className="lesson-info-group lesson-info-group--learners">
                <h6>
                    <LearnersIcon />
                    <span>Learners</span>
                </h6>
                <p>{learners}</p>
            </div>
            <div className="lesson-info-group lesson-info-group--date">
                <h6>
                    <CalendarIcon />
                    <span>Date</span>
                </h6>
                <p>{date}</p>
            </div>
            <div className="lesson-info-group lesson-info-group--time">
                <h6>
                    <TimeIcon />
                    <span>Time</span>
                </h6>
                <p>{time}</p>
            </div>
            {additionalInfo && (
                <div className="lesson-info-group lesson-info-group--further-details">
                    <h6>
                        <InfoIcon />
                        <span>Additional Information</span>
                    </h6>
                    <p>{additionalInfo}</p>
                </div>
            )}
        </div>
    );
};

export default LessonDetails;
