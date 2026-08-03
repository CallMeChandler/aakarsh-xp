import React from "react";
import "./startmenu.css";

export default function StartButton({ onClick }) {
  return (
    <div className="xp-start-button" onClick={onClick}>
      <img
        src="/icons/windows-xp-logo.png"
        alt="Windows XP Logo"
        className="xp-start-logo"
      />
      <span className="xp-start-text">start</span>
    </div>
  );
}
