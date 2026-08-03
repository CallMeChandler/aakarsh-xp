import { Rnd } from "react-rnd";
import "../styles/XPExplorerWindow.css";

export default function XPExplorerWindow({
  id,
  title,
  onClose,
  onMinimize,
  onFocus,
  sections = [],
  folders = null,
  customContent = null,
  onGameLaunch,
  zIndex = 101,
  isActive = false,
}) {
  return (
    <Rnd
      default={{ x: 150, y: 100, width: 750, height: 500 }}
      minWidth={600}
      minHeight={400}
      bounds="parent"
      className="explorer-window"
      style={{ display: "flex", flexDirection: "column", zIndex }}
      onMouseDown={onFocus}
    >
      {/* Top blue bar */}
      <div
        className={`flex justify-between items-center px-2 py-1 text-sm font-bold
                    ${isActive ? "bg-blue-700 text-white" : "bg-blue-600 text-white/90"}`}
      >
        <span className="flex gap-2 items-center">
          <img src="/assets/Folder.png" alt="folder" className="w-4 h-4" />
          {title}
        </span>
        <div className="flex">
          <button
            onClick={onMinimize}
            className="hover:bg-blue-500 px-2"
            title="Minimize"
          >
            ▃
          </button>
          <button
            onClick={onClose}
            className="hover:bg-red-600 px-2"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="explorer-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="explorer-toolbar">
        <button className="toolbar-btn">
          <img src="/assets/Back.png" alt="Back" />
        </button>
        <button className="toolbar-btn">
          <img src="/assets/Forward.png" alt="Forward" />
        </button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn">
          <img src="/assets/Up.png" alt="Up" />
        </button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn">
          <img src="/assets/Search.png" alt="Search" />
          <span>Search</span>
        </button>
        <button className="toolbar-btn">
          <img src="/assets/Folder.png" alt="Folders" />
          <span>Folders</span>
        </button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn">
          <img src="/assets/Views.png" alt="Views" />
          <span>Views</span>
        </button>
      </div>

      {/* Address bar */}
      <div className="address-bar">
        <label htmlFor={`address-${id}`} className="address-label">
          Address
        </label>
        <div className="address-input-wrapper">
          <img src="/assets/Address.png" alt="folder" className="address-icon" />
          <input
            id={`address-${id}`}
            className="address-input"
            value={`C:\\Documents and Settings\\Aakarsh\\${title}`}
            readOnly
          />
          <button className="address-go">Go</button>
        </div>
      </div>

      {/* Body */}
      <div className="explorer-body">
        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <div className="sidebar-section">
              <h4>System Tasks</h4>
              <ul>
                <li>View System Info</li>
                <li>Add/Remove Programs</li>
                <li>Change Settings</li>
              </ul>
            </div>
            <div className="sidebar-section">
              <h4>Other Places</h4>
              <ul>
                <li>My Network Places</li>
                <li>My Documents</li>
                <li>Shared Docs</li>
                <li>Control Panel</li>
              </ul>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Details</h4>
            <ul>
              <li>My Github</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="explorer-content">
          {customContent ? (
            customContent
          ) : sections && sections.length > 0 ? (
            <>
              {sections.map((section, idx) => (
                <div key={idx} className="explorer-section">
                  <h3 className="section-title">{section.title}</h3>
                  <div className="folder-grid">
                    {section.folders.map((folder, index) => (
                      <div
                        key={index}
                        className="folder"
                        onClick={() => {
                          if (title === "Games" && onGameLaunch && folder.id) {
                            onGameLaunch(folder.id);
                          }
                        }}
                      >
                        <img
                          src={folder.icon || "/assets/Folder.png"}
                          alt={folder.name}
                          className="folder-icon"
                        />
                        <span>{folder.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : folders && folders.length > 0 ? (
            <div className="folder-grid">
              {folders.map((folder, index) =>
                folder.onClick ? (
                  <div key={index} className="folder" onClick={folder.onClick}>
                    <img
                      src={folder.icon || "/assets/Folder.png"}
                      alt={folder.name}
                      className="folder-icon"
                    />
                    <span>{folder.name}</span>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={folder.url || "#"}
                    target={folder.url ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="folder"
                  >
                    <img
                      src={folder.icon || "/assets/Folder.png"}
                      alt={folder.name}
                      className="folder-icon"
                    />
                    <span>{folder.name}</span>
                  </a>
                )
              )}
            </div>
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </Rnd>
  );
}
