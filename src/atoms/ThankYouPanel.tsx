import Panel from "./Panel";
import Button from "../quarks/Button";

import { useUserContext } from "../hooks/useUserContext";

export default function ThankYouPanel() {
  const { userDetails } = useUserContext();

  return (
    <Panel className="panel--thankYou">
      <h1>Thank you</h1>

      {/* For when the user is premium */}
      {userDetails.isPremium && <p>Your support is greatly appreciated!</p>}

      <Button
        type="button"
        className="btn btn--red btn--cancelSubscription"
        onClick={() => console.log("Cancel sub")}
      >
        <span className="btn__text">Cancel Subscription</span>
      </Button>
    </Panel>
  );
}
