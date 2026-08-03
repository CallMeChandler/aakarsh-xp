import { useEffect, useMemo, useRef, useState } from 'react';
import { projects, skillGroups, experiences, links } from '../data';
import '../styles/SystemApps.css';

export function TerminalApp({ openApp, openBrowser }) {
  const prompt = 'C:\\Documents and Settings\\Aakarsh>';
  const [lines, setLines] = useState([
    { type: 'out', text: 'Microsoft Windows XP [Chandler Edition 1.0]' },
    { type: 'out', text: '(C) Copyright 1985-2001 Microsoft Corp.' },
    { type: 'out', text: 'Type "help" to see available commands.' },
  ]);
  const [value, setValue] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const execute = (rawValue) => {
    const command = rawValue.trim();
    if (!command) return;

    const parts = command.split(/\s+/);
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);
    const rest = args.join(' ');
    let response = null;

    if (base === 'clear' || base === 'cls') {
      setLines([]);
      return;
    }

    switch (base) {
      case 'help':
        response = 'Commands: help, whoami, nickname, about, projects, experience, skills, dir, date, time, echo, open <app>, github, linkedin, leetcode, resume, calc, notepad, games, photos, clear';
        break;
      case 'whoami':
        response = 'aakarsh-agarwal  |  Software Engineer  |  BIT Mesra AIML';
        break;
      case 'nickname':
        response = 'Call me Chandler. Yes, like Chanandler Bong.';
        break;
      case 'about':
        response = 'Aakarsh builds full-stack systems, backend automation, AI products and low-level software.';
        break;
      case 'projects':
        response = projects.map((project, index) => `${index + 1}. ${project.name} — ${project.kind}`).join('\n');
        break;
      case 'experience':
        response = experiences.map((item) => `${item.role} @ ${item.company} (${item.date})`).join('\n');
        break;
      case 'skills':
        response = skillGroups.map(([group, skills]) => `${group}: ${skills.join(', ')}`).join('\n');
        break;
      case 'dir':
        response = 'ABOUT.TXT\nPROJECTS\nEXPERIENCE\nSKILLS\nMY PICTURES\nAakarsh_July26CV.pdf';
        break;
      case 'date':
        response = new Date().toLocaleDateString();
        break;
      case 'time':
        response = new Date().toLocaleTimeString();
        break;
      case 'echo':
        response = rest;
        break;
      case 'github':
        openBrowser(links.github, 'GitHub - Aakarsh Agarwal');
        break;
      case 'linkedin':
        openBrowser(links.linkedin, 'LinkedIn - Aakarsh Agarwal');
        break;
      case 'leetcode':
        openBrowser(links.leetcode, 'LeetCode - ChandlerGoneHigh');
        break;
      case 'resume':
        openBrowser(links.resume, 'Aakarsh Resume');
        break;
      case 'calc':
        openApp('calculator');
        break;
      case 'notepad':
        openApp('notepad');
        break;
      case 'games':
        openApp('games');
        break;
      case 'photos':
        openApp('pictures');
        break;
      case 'open':
        if (rest) openApp(rest.toLowerCase().replace(/\s+/g, ''));
        else response = 'Usage: open <app>';
        break;
      default:
        response = `'${base}' is not recognized as an internal or external command.`;
    }

    setLines((currentLines) => [
      ...currentLines,
      { type: 'cmd', text: `${prompt}${command}` },
      ...(response === null ? [] : [{ type: 'out', text: response }]),
    ]);
  };

  const submit = (event) => {
    event.preventDefault();
    const command = value;
    setValue('');
    execute(command);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="terminal-app" onMouseDown={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {lines.map((line, index) => (
          <pre key={`${line.type}-${index}`} className={line.type}>{line.text}</pre>
        ))}
        <form className="terminal-line" onSubmit={submit}>
          <span>{prompt}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}

export function CalculatorApp() {
  const [display, setDisplay] = useState('0'); const [stored, setStored] = useState(null); const [op, setOp] = useState(null); const [fresh, setFresh] = useState(true);
  const press = (v) => { if (v === 'C') { setDisplay('0'); setStored(null); setOp(null); setFresh(true); return } if (v === '±') { setDisplay(String(Number(display) * -1)); return } if (v === '.') { if (!display.includes('.')) setDisplay(display + '.'); return } if (['+', '−', '×', '÷'].includes(v)) { setStored(Number(display)); setOp(v); setFresh(true); return } if (v === '=') { if (stored === null || !op) return; const n = Number(display); let r = op === '+' ? stored + n : op === '−' ? stored - n : op === '×' ? stored * n : n === 0 ? 'Error' : stored / n; setDisplay(String(r)); setStored(null); setOp(null); setFresh(true); return } setDisplay(fresh || display === '0' ? v : display + v); setFresh(false) };
  const keys = ['C', '±', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'];
  return <div className="calculator-app"><div className="calc-display">{display}</div><div className="calc-grid">{keys.map(k => <button key={k} className={k === '=' ? 'equals' : k === '0' ? 'zero' : ''} onClick={() => press(k)}>{k}</button>)}</div></div>
}

export function NotepadApp() {
  const [text, setText] = useState(() => localStorage.getItem('aakarsh-xp-notepad') || 'Welcome to Windows XP Notepad!\n\nWrite anything here. Your notes are saved automatically in this browser.');
  useEffect(() => localStorage.setItem('aakarsh-xp-notepad', text), [text]);
  return <div className="notepad-app"><div className="notepad-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Format&nbsp;&nbsp; View&nbsp;&nbsp; Help <span>Autosaved</span></div><textarea value={text} onChange={e => setText(e.target.value)} spellCheck="false" /></div>
}

const docs = [
  { name: 'About Aakarsh.txt', icon: '📄', body: 'Software Engineer · Full Stack · Backend · AI · Low-Level Systems\n\nNickname: Chandler' },
  { name: 'Current Focus.txt', icon: '📄', body: 'SDE internships, backend engineering, AI systems and ambitious build-in-public projects.' },
  { name: 'Projects', icon: '📁', app: 'projects' }, { name: 'Experience', icon: '📁', app: 'experience' }, { name: 'Skills', icon: '📁', app: 'skills' },
  { name: 'Aakarsh_July26CV.pdf', icon: '📕', url: links.resume },
];
export function MyDocumentsApp({ openApp, openBrowser }) {
  const [selected, setSelected] = useState(null);
  return <div className="file-app"><div className="file-grid">{docs.map(d => <button key={d.name} onDoubleClick={() => d.app ? openApp(d.app) : d.url ? openBrowser(d.url, d.name) : setSelected(d)} onClick={() => setSelected(d)}><span>{d.icon}</span><b>{d.name}</b></button>)}</div>{selected?.body && <div className="file-preview"><h3>{selected.name}</h3><pre>{selected.body}</pre></div>}</div>
}

export const pictureItems = [
  ['Neon City', '/photos/neon-city.svg'], ['Mountain Boot', '/photos/mountain-boot.svg'], ['Retro Setup', '/photos/retro-setup.svg'], ['Night Drive', '/photos/night-drive.svg'], ['Pixel Coast', '/photos/pixel-coast.svg'], ['Blue Horizon', '/photos/blue-horizon.svg']
];
export function PicturesApp() { const [active, setActive] = useState(null); return <div className="pictures-app"><div className="picture-grid">{pictureItems.map(([n, s]) => <button key={n} onClick={() => setActive([n, s])}><img src={s} /><span>{n}.jpg</span></button>)}</div>{active && <div className="lightbox" onClick={() => setActive(null)}><img src={active[1]} /><b>{active[0]}.jpg</b><small>Click anywhere to close</small></div>}</div> }

export function MusicApp() {
  const tracks = useMemo(() => ['Boot Sequence.mp3', 'Kernel Dreams.wav', 'Chandler Theme.mid', 'Late Night Compile.mp3'], []); const [playing, setPlaying] = useState(null); const [progress, setProgress] = useState(0);
  useEffect(() => { if (playing === null) return; const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 1), 300); return () => clearInterval(t) }, [playing]);
  return <div className="music-app"><div className="music-visual"><div className={playing !== null ? 'disc spinning' : 'disc'}>XP</div><h2>{playing === null ? 'Windows Media Player' : tracks[playing]}</h2><div className="progress"><i style={{ width: `${progress}%` }} /></div><button onClick={() => setPlaying(playing === null ? 0 : null)}>{playing === null ? '▶ Play' : '⏸ Pause'}</button></div><div className="playlist">{tracks.map((t, i) => <button className={playing === i ? 'active' : ''} key={t} onClick={() => { setPlaying(i); setProgress(0) }}>♫ {t}</button>)}</div></div>
}

export function ControlPanelApp() { return <div className="control-panel-app"><h2>Pick a category</h2><div className="control-grid"><div>🎨<b>Appearance and Themes</b><p>Windows XP Luna Blue</p></div><div>👤<b>User Accounts</b><p>Aakarsh “Chandler” Agarwal</p></div><div>💻<b>System</b><p>Portfolio Edition · React powered</p></div><div>🌐<b>Network Connections</b><p>Internet Explorer enabled</p></div><div>🎮<b>Game Controllers</b><p>Snake and Tic-Tac-Toe ready</p></div><div>🕒<b>Date and Time</b><p>{new Date().toLocaleString()}</p></div></div></div> }
