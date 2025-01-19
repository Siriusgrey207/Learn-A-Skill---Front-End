import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Notification from "../quarks/Notification";
import PageSidebar from "../molecules/PageSidebar";
import Panel from "../atoms/Panel";

const About: React.FC = () => {
    return (
        <div id="ndzn-app">
            <Header />
            <div className="page-main">
                <div className="container">
                    <PageSidebar />
                    <div className="page-content">
                        <Panel className="panel--aboutUs">
                            <h1>About Us</h1>
                            <p>
                                Here we can talk about us a bit idk. Here is a
                                picture of an HR lady.
                            </p>
                            <img
                                className="aboutUs__img"
                                src="https://i.imgur.com/QyI5eWG.png"
                            />
                        </Panel>
                    </div>
                </div>
            </div>
            <Footer />
            <Notification />
        </div>
    );
};

export default About;
