import { useEffect, useState } from "react";
import BootScreen from "./Bootscreen";
import LoginScreen from "./LoginScreen";

const IntroSequence = ({ onLoginSuccess }) => {
  const [phase, setPhase] = useState("boot");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhase("login"); // move to login screen
    }, 4000); // 4 sec boot

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {phase === "boot" && <BootScreen />}
      {phase === "login" && (
        <LoginScreen onLoginSuccess={onLoginSuccess} />
      )}
    </>
  );
};

export default IntroSequence;
