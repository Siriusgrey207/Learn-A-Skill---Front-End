import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import initialData from "./initialData"

const ExcalidrawWhiteboard: React.FC = () => {
  
  return (
    <>
      {/* <div style={{ height: "500px", width: "500px" }}> */}
      <div className="panel--whiteboard">
        <Excalidraw
        initialData={initialData} />
      </div>
    </>
    );
};

export default ExcalidrawWhiteboard;
