import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Notification from "../quarks/Notification";
import Panel from "../atoms/Panel";
import ExcalidrawWhiteboard from "../atoms/Excalidraw/ExcalidrawWhiteboard";

const Whiteboard: React.FC = () => {
  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main page-main--whiteboard">
        <div className="container">
          <div className="page-content page-content--whiteboard">
            <Panel className="panel--whiteboard">
              <h1 className="panel__title">Whiteboard</h1>
              <p className="panel__description">
                Collaborate with your peers in real-time
              </p>
            </Panel>
            <div className="whiteboard-container">
              <ExcalidrawWhiteboard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Notification />
    </div>
  );
};

export default Whiteboard;
