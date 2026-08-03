import { Rnd } from 'react-rnd';
import { useState } from 'react';
import '../styles/XPBrowser.css';

export default function XPBrowser({url, title='Microsoft Internet Explorer', onClose, onMinimize, onFocus, zIndex=500}){
  const [current,setCurrent]=useState(url);
  const [input,setInput]=useState(url);
  const go=()=>{ let next=input.trim(); if(!/^https?:\/\//.test(next) && !next.startsWith('/')) next='https://'+next; setCurrent(next); };
  return <Rnd default={{x:110,y:55,width:900,height:620}} minWidth={650} minHeight={430} bounds="parent" style={{zIndex}} className="ie-window" onMouseDown={onFocus}>
    <div className="ie-titlebar"><span><img src="/assets/Link.png"/> {title}</span><div><button onClick={onMinimize}>_</button><button>□</button><button className="close" onClick={onClose}>×</button></div></div>
    <div className="ie-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Favorites&nbsp;&nbsp; Tools&nbsp;&nbsp; Help</div>
    <div className="ie-toolbar"><button onClick={()=>history.back()}>← Back</button><button onClick={()=>history.forward()}>→</button><button onClick={()=>setCurrent(current)}>⟳</button><button onClick={()=>setCurrent('about:blank')}>✕</button><button onClick={()=>setCurrent(url)}>⌂</button><span className="ie-brand">Internet Explorer</span></div>
    <div className="ie-address"><span>Address</span><img src="/assets/Link.png"/><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()}/><button onClick={go}>Go</button></div>
    <div className="ie-viewport">
      {current.endsWith('.pdf') || current.startsWith('/') ? <iframe src={current} title={title}/> : <iframe src={current} title={title}/>} 
    </div>
    <div className="ie-status"><span>🌐 Done</span><span>Internet</span></div>
  </Rnd>
}
