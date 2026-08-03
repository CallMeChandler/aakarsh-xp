import React from "react";
import "../styles/LoginScreen.css";

const LoginScreen = ({ onLoginSuccess }) => {
  const handleLogin = () => {
    const audio = new Audio("/sounds/startup_sound.mp3");
    audio.volume = 0.6;
    audio.play(); // ✅ Now allowed due to click
    onLoginSuccess(); // your existing logic to load Desktop
  };
  return (
    <div className="login-container">
      <div className="login-top-glow"></div>

      <div className="login-main">
        {/* Left: Logo + text */}
        <div className="login-left">
          <img src="/assets/WindowsXP.png" alt="XP Logo" className="windows-logo" />
          <div className="login-text">
            <p className="microsoft">Microsoft</p>
            <p className="windows">Windows<span className="xp">XP</span></p>
            <p className="subtext">To begin, click your user name</p>
          </div>
        </div>

        {/* Divider */}
        <div className="login-divider"></div>

        {/* Right: User login box */}
        <div className="login-user" onClick={handleLogin} title="Click to login">
          <img src="/assets/UserProfileImg.jpeg" alt="User" />
          <p className="username">Aakarsh “Chandler” Agarwal</p>
        </div>
      </div>


      <div className="login-footer">
        <div className="shutdown">
          <img src="/assets/shutdown.png" alt="Shutdown" />
          <span>Turn off computer</span>
        </div>
        <p className="footer-tip">
          After you log on, you can add or change accounts. <br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
