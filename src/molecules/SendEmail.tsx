import { useState } from "react";
import axios from "axios";

import Panel from "../atoms/Panel";
import Button from "../quarks/Button";
import Input from "../quarks/Input";
import Textarea from "../quarks/TextArea";
import LoadingComponent from "../quarks/LoadingComponent";
import Error from "../quarks/Error";

import { useUserContext } from "../hooks/useUserContext";
import { useNotificationContext } from "../hooks/useNotificationContext";
import { emailApiEndpointUrl } from "../constants/endpoints";

export default function SendEmail() {
    // Global Context
    const { userDetails } = useUserContext();
    const { setNotification } = useNotificationContext();

    // Local State
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const checkForm = () => {
        if (title.length < 10) {
            setError(
                "The title of your email is too short. Please make it at least 10 characters long."
            );
            return false;
        } else if (body.length < 50) {
            setError(
                "The body of your email is too short. Please make it at least 50 characters long."
            );
            return false;
        } else {
            return true;
        }
    };

    const handleFormSubmission = async (event: React.FormEvent) => {
        event.preventDefault();

        // Do Context Check
        const formChecked = checkForm();
        if (!formChecked) return;

        const data = {
            email: userDetails.email,
            title: title,
            emailBody: body,
        };

        setLoading(true);
        setError("");

        try {
            await axios.post(emailApiEndpointUrl, data);
            setNotification({
                show: true,
                type: "success",
                message: "Email sent successfully!",
                displayDuration: 5000,
            });
        } catch (error) {
            setError("An error occurred while sending the email.");
        } finally {
            setLoading(false);
            setTitle("");
            setBody("");
        }
    };

    return (
        <Panel className="panel--sendEmail">
            <h1>Why not send them an email right now?</h1>
            <form
                className="form form--sendEmail"
                name="sendEmail"
                onSubmit={handleFormSubmission}
            >
                <div className="form-group form-group--title">
                    <label className="form-group__label">Title</label>
                    <Input
                        placeholder="Hi, I want to learn chess..."
                        value={title}
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group form-group--email">
                    <label className="form-group__label">Email</label>
                    <Textarea
                        placeholder="Hi there..."
                        value={body}
                        name="body"
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <input type="submit" hidden />
                {error !== "" && <Error errorMessage={error} />}
                <div className="form-group from-group--send">
                    <Button
                        type="submit"
                        className="btn btn--green btn--submit"
                        disabled={loading}
                    >
                        {loading && (
                            <LoadingComponent size="small" color="#FFFFFF" />
                        )}
                        {!loading && <span className="btn__text">Send</span>}
                    </Button>
                </div>
            </form>
        </Panel>
    );
}
