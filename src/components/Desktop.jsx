import { useEffect, useMemo, useState } from 'react';
import DesktopIcon from './DesktopIcon';
import XPExplorerWindow from './XPExplorerWindow';
import XPBrowser from './XPBrowser';
import Games from './Games';
import SnakeGame from './SnakeGame';
import ContactWindow from './ContactWindow';
import Taskbar from './Taskbar';
import { xpSet } from './xpStore';
import { AboutPanel, ExperiencePanel, ProjectsPanel, SkillsPanel } from './PortfolioPanels';
import { TerminalApp,CalculatorApp,NotepadApp,MyDocumentsApp,PicturesApp,MusicApp,ControlPanelApp } from './SystemApps';
import { links } from '../data';
import '../styles/DesktopEnhanced.css';

const appMeta={
 about:['About Me','/assets/AboutMeIcon.png'],experience:['Work Experience','/assets/WorkExp.png'],projects:['My Projects','/assets/ProjectIcon.png'],skills:['Technical Skills','/assets/SkillsIcon.png'],contact:['Contact Me','/assets/ContactMe.png'],games:['Games','/assets/GameIcon.png'],snake:['Snake','/assets/snake.png'],terminal:['Command Prompt','/assets/CMDIcon.png'],calculator:['Calculator','/assets/Calculator.png'],notepad:['Untitled - Notepad','/assets/Notepad.png'],documents:['My Documents','/assets/Folder.png'],pictures:['My Pictures','/assets/PhotosIcon.png'],music:['Windows Media Player','/assets/Music.png'],controlpanel:['Control Panel','/assets/WindowsXP.png']
};
export default function Desktop(){
 const [openWindows,setOpenWindows]=useState([]); const [focusedId,setFocusedId]=useState(null); const [systemState,setSystemState]=useState(null);
 useEffect(()=>xpSet({windows:openWindows,activeId:focusedId}),[openWindows,focusedId]);
 const open=(id,title,icon,payload={})=>{setOpenWindows(prev=>{const old=prev.find(w=>w.id===id);return [...prev.filter(w=>w.id!==id),{...(old||{}),id,title,icon,minimized:false,...payload}]});setFocusedId(id)};
 const openApp=id=>{if(id==='github')return openBrowser(links.github,'GitHub - Aakarsh Agarwal');if(id==='linkedin')return openBrowser(links.linkedin,'LinkedIn - Aakarsh Agarwal');if(id==='leetcode')return openBrowser(links.leetcode,'LeetCode - ChandlerGoneHigh');if(id==='resume')return openBrowser(links.resume,'Aakarsh_July26CV.pdf');const key=id==='mydocuments'?'documents':id==='mypictures'?'pictures':id;const m=appMeta[key]||[key,'/assets/Folder.png'];open(key,m[0],m[1])};
 const openBrowser=(url,title='Microsoft Internet Explorer')=>open(`browser-${url}`,title,'/assets/Link.png',{type:'browser',url});
 const close=id=>{setOpenWindows(p=>p.filter(w=>w.id!==id));setFocusedId(f=>f===id?null:f)};
 const toggle=id=>setOpenWindows(p=>p.map(w=>w.id===id?{...w,minimized:!w.minimized}:w));
 const focus=id=>{setOpenWindows(p=>{const w=p.find(x=>x.id===id);return w?[...p.filter(x=>x.id!==id),{...w,minimized:false}]:p});setFocusedId(id)};
 useEffect(()=>{const t=e=>toggle(e.detail),f=e=>focus(e.detail);window.addEventListener('xp:toggle',t);window.addEventListener('xp:focus',f);return()=>{window.removeEventListener('xp:toggle',t);window.removeEventListener('xp:focus',f)}},[]);
 const icons=[['about','About Me','/assets/AboutMeIcon.png',70,70],['experience','Work Experience','/assets/WorkExp.png',70,185],['projects','Projects','/assets/ProjectIcon.png',70,300],['skills','My Skills','/assets/SkillsIcon.png',70,415],['documents','My Documents','/assets/Folder.png',70,530],['github','GitHub','/assets/GithubIcon.png',190,70],['linkedin','LinkedIn','/assets/LinkedInIcon.png',190,185],['resume','Resume','/assets/ResumeIcon.png',190,300],['pictures','My Pictures','/assets/PhotosIcon.png',190,415],['games','Games','/assets/GameIcon.png',190,530]];
 const z=useMemo(()=>Object.fromEntries(openWindows.map((w,i)=>[w.id,200+i])),[openWindows]);
 const content=w=>{switch(w.id){case'about':return <AboutPanel/>;case'experience':return <ExperiencePanel/>;case'projects':return <ProjectsPanel openBrowser={openBrowser}/>;case'skills':return <SkillsPanel/>;case'contact':return <ContactWindow onClose={()=>close(w.id)}/>;case'games':return <Games onLaunchSnake={()=>openApp('snake')}/>;case'snake':return <SnakeGame/>;case'terminal':return <TerminalApp openApp={openApp} openBrowser={openBrowser}/>;case'calculator':return <CalculatorApp/>;case'notepad':return <NotepadApp/>;case'documents':return <MyDocumentsApp openApp={openApp} openBrowser={openBrowser}/>;case'pictures':return <PicturesApp/>;case'music':return <MusicApp/>;case'controlpanel':return <ControlPanelApp/>;default:return null}};
 return <div className="xp-desktop-enhanced">
  <div className="desktop-watermark"><b>Aakarsh XP</b><span>Chandler Edition</span></div>
  {icons.map(([id,label,icon,x,y])=><DesktopIcon key={id} icon={icon} label={label} x={x} y={y} onDoubleClick={()=>openApp(id)}/>)}
  {openWindows.filter(w=>!w.minimized).map(w=>w.type==='browser'?<XPBrowser key={w.id} url={w.url} title={w.title} zIndex={z[w.id]} onClose={()=>close(w.id)} onMinimize={()=>toggle(w.id)} onFocus={()=>focus(w.id)}/>:w.id==='contact'?<div key={w.id} style={{position:'relative',zIndex:z[w.id]}} onMouseDown={()=>focus(w.id)}>{content(w)}</div>:<XPExplorerWindow key={w.id} id={w.id} title={w.title} zIndex={z[w.id]} onClose={()=>close(w.id)} onMinimize={()=>toggle(w.id)} onFocus={()=>focus(w.id)} customContent={content(w)} isActive={focusedId===w.id}/>) }
  <Taskbar openWindows={openWindows} onToggleWindow={toggle} onFocusWindow={focus} activeWindowId={focusedId} onLaunch={openApp} onLogOff={()=>setSystemState('logoff')} onShutdown={()=>setSystemState('shutdown')}/>
  {systemState&&<div className="xp-system-overlay"><img src="/assets/WindowsXP.png"/><h1>{systemState==='shutdown'?'Windows is shutting down...':'Logging off Aakarsh “Chandler” Agarwal...'}</h1><button onClick={()=>setSystemState(null)}>Return to desktop</button></div>}
 </div>
}
