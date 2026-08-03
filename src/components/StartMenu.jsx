import "../styles/StartMenu.css";

const leftItems = [
  ["projects", "/assets/ProjectIcon.png", "My Projects", "See all portfolio projects"],
  ["contact", "/assets/ContactMe.png", "Contact Me", "Leave me a message"],
  ["resume", "/assets/ResumeIcon.png", "My CV", "Open my latest resume"],
  ["skills", "/assets/SkillsIcon.png", "Skills", "Browse my technical stack"],
  ["github", "/assets/GithubIcon.png", "GitHub", "Open inside Internet Explorer"],
  ["terminal", "/assets/CMDIcon.png", "Command Prompt", "Run Windows XP commands"],
];

const rightItems = [
  ["music", "/assets/Music.png", "My Music"],
  ["documents", "/assets/Folder.png", "My Documents"],
  ["pictures", "/assets/PhotosIcon.png", "My Pictures"],
  ["calculator", "/assets/Calculator.png", "Calculator"],
  ["games", "/assets/GameIcon.png", "Games"],
  ["notepad", "/assets/Notepad.png", "Notepad"],
  ["controlpanel", "/assets/WindowsXP.png", "Control Panel"],
];

export default function StartMenu({ onLaunch, onLogOff, onShutdown }) {
  return (
    <div className="start-menu" role="menu" aria-label="Start menu">
      <div className="start-menu-body">
        <div className="start-left">
          <div className="start-user">
            <img src="/assets/UserProfileImg.jpeg" alt="User" className="start-avatar" />
            <div className="start-user-copy">
              <span className="start-username">Aakarsh “Chandler”</span>
              <span className="start-username">Agarwal</span>
            </div>
          </div>

          <div className="start-left-list">
            {leftItems.map(([id, icon, title, sub]) => (
              <button key={id} className="start-item" onClick={() => onLaunch(id)}>
                <img src={icon} alt="" />
                <div>
                  <div className="item-title">{title}</div>
                  <div className="item-sub">{sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="start-right">
          {rightItems.map(([id, icon, title]) => (
            <button key={id} className="start-right-item" onClick={() => onLaunch(id)}>
              <img src={icon} alt="" />
              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-footer">
        <button className="footer-btn log-off" onClick={onLogOff}>
          <img src="/assets/shutdown.png" alt="" />
          <span>Log Off</span>
        </button>
        <button className="footer-btn turn-off" onClick={onShutdown}>
          <img src="/assets/shutdown.png" alt="" />
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
}
