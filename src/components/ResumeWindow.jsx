import React from "react";
import XPExplorerWindow from "./XPExplorerWindow";

const ResumeWindow = ({ onClose }) => {
    const resumeContent = (
        <div className="w-full h-full">
            <iframe
                src="/AakarshResume_Final.pdf"
                title="Aakarsh Resume PDF"
                className="w-full h-[80vh] border-none"
            />
        </div>
    );


    return (
        <XPExplorerWindow title="My Resume" onClose={onClose} customContent={resumeContent} />
    );
};

export default ResumeWindow;
