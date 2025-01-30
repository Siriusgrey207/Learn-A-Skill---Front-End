import Panel from "../atoms/Panel";
import NotFoundIcon from "../icons/NotFoundIcon";

export default function NotFound() {
  return (
    <Panel className="panel--not-found">
      <NotFoundIcon />
      <b>Sorry, we couldn't find what you're looking for!</b>
    </Panel>
  );
}
