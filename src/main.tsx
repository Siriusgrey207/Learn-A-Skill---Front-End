import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { UserProvider } from "./hooks/useUserContext.tsx";
import { NotificationProvider } from "./hooks/useNotificationContext.tsx";

import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/notification.css";
import "./styles/navigation.css";
import "./styles/homepage.css";
import "./styles/page-learnASkill.css";
import "./styles/page-loginAndSignUp.css";
import "./styles/page-teachASkill.css";
import "./styles/page-donations.css";
import "./styles/page-promote.css";
import "./styles/page-account.css";
import "./styles/page-aboutUs.css";
import "./styles/page-skillInfo.css";
import "./styles/excalidraw.css";
import "./styles/whiteboard.css";
import "./styles/component-pagination.css";

// Set Excalidraw asset path
window.EXCALIDRAW_ASSET_PATH = "/assets/excalidraw-assets/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NotificationProvider>
  </StrictMode>
);
