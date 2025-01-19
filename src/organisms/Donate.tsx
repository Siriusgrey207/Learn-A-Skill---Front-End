import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Notification from "../quarks/Notification";
import PageSidebar from "../molecules/PageSidebar";
import Panel from "../atoms/Panel";

import paypalImage from "../assets/paypal.png";

const Donate: React.FC = () => {
    return (
        <div id="ndzn-app">
            <Header />
            <div className="page-main">
                <div className="container">
                    <PageSidebar />

                    <div className="page-content">
                        <div className="donate-page">
                            <Panel className="panel--donations">
                                <h1>Donations are appreciated</h1>
                                <p>
                                    Your generous donations are vital to our
                                    mission. We deeply appreciate your support.
                                </p>
                                <a
                                    target="_blank"
                                    href="https://www.paypal.com/donate/?hosted_button_id=BNJJR5S4YXWEQ"
                                    className="link-paypal"
                                >
                                    <img src={paypalImage} alt="Paypal" />
                                </a>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Notification />
        </div>
    );
};

export default Donate;
