import { useState } from "react";
import "./app.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import Cli from "./components/windows/Cli";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";

const App = () => {
  const [windowState, setWindowState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
  });

  return (
    <main>
      <Nav />

      <div className="desktop-area">
        {windowState.github && (
          <Github windowName="github" setWindowState={setWindowState} />
        )}
        {windowState.note && (
          <Note windowName="note" setWindowState={setWindowState} />
        )}
        {windowState.resume && (
          <Resume windowName="resume" setWindowState={setWindowState} />
        )}
        {windowState.spotify && (
          <Spotify windowName="spotify" setWindowState={setWindowState} />
        )}
        {windowState.cli && (
          <Cli windowName="cli" setWindowState={setWindowState} />
        )}
      </div>

      <Dock windowState={windowState} setWindowState={setWindowState} />
    </main>
  );
};

export default App;
