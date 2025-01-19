import Panel from "../atoms/Panel";

export default function LoginWarningPanel() {
    return (
        <Panel className="panel--loginWarning">
            <h6>Please login to access this content.</h6>
            <div className="buttons">
                <a href="/login" className="btn btn--green btn--loginLink">
                    <span className="btn__text">Login</span>
                </a>
            </div>
        </Panel>
    );
}
