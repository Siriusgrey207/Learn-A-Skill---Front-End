import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Notification from "../quarks/Notification";
import PageSidebar from "../molecules/PageSidebar";
import AccountPanel from "../molecules/AccountPanel";

import { useParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Account: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const { userDetails } = useUserContext();

    console.log(userDetails.userId, userId);

    return (
        <div id="ndzn-app">
            <Header />
            <div className="page-main">
                <div className="container">
                    <PageSidebar />
                    <div className="page-content">
                        <AccountPanel userId={userId} />
                    </div>
                </div>
            </div>
            <Footer />
            <Notification />
        </div>
    );
};

export default Account;
