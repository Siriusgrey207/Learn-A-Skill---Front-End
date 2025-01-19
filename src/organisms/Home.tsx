import React from "react";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import PageSidebar from "../molecules/PageSidebar";
import SkillsList from "../molecules/SkillsList";
import Notification from "../quarks/Notification";

const Home: React.FC = () => {
    return (
        <div id="ndzn-app">
            <Header />
            <div className="page-main">
                <div className="container">
                    <PageSidebar />

                    <div className="page-content">
                        <SkillsList />
                    </div>
                </div>
            </div>
            <Footer />
            <Notification />
        </div>
    );
};

export default Home;
