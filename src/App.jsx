import { useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Desktop from './components/Desktop';
import { WindowsProvider } from './components/WindowsContent';
import './App.css';
export default function App(){const [introFinished,setIntroFinished]=useState(false);const [isLoggedIn,setIsLoggedIn]=useState(false);if(!introFinished)return <IntroSequence onLoginSuccess={()=>{setIsLoggedIn(true);setIntroFinished(true)}}/>;return isLoggedIn?<WindowsProvider><Desktop/></WindowsProvider>:null}
