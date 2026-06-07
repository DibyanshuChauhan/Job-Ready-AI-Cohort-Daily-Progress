import MacWindow from "./MacWindow";
import TerminalModule from "react-console-emulator";
import "./cli.scss";

const Cli = ({ windowName, setWindowState }) => {
  const Terminal = TerminalModule.default;

  const commands = {
    whoami: {
      description: "Display current user",
      fn: () => "divyanshuchauhan",
    },

    about: {
      description: "About me",
      fn: () => `
Hi, I'm Divyanshu Chauhan.

Frontend Developer focused on React.js.

Currently pursuing MCA and building modern web applications.

Passionate about:
• React
• JavaScript
• UI/UX
• Performance Optimization
• Problem Solving
      `,
    },

    skills: {
      description: "Technical skills",
      fn: () => `
Frontend:
- HTML5
- CSS3
- JavaScript
- React.js
- Redux Toolkit
- SCSS
- Tailwind CSS

Tools:
- Git
- GitHub
- VS Code
- Vercel

Currently Learning:
- Advanced React
- Full Stack Development
- System Design
      `,
    },

    projects: {
      description: "Featured projects",
      fn: () => `
1. Media Vault
   AI-powered media management platform

2. Expense Tracker
   Personal finance management application

3. MacOS Portfolio
   Interactive portfolio inspired by macOS

4. AI Progress Tracker
   Daily learning & progress tracking application
      `,
    },

    education: {
      description: "Educational background",
      fn: () => `
Master of Computer Applications (MCA)
IMS Unison University

Bachelor of Science in Information Technology
HNB Garhwal University
      `,
    },

    resume: {
      description: "Resume information",
      fn: () => `
Resume available in the Resume application.

Open the Resume icon from the Dock to view it.
      `,
    },

    contact: {
      description: "Contact information",
      fn: () => `
Email:
your-email@example.com

Location:
Dehradun, Uttarakhand

Available For:
- Frontend Development
- Freelance Projects
- Internships
      `,
    },

    socials: {
      description: "Social media profiles",
      fn: () => `
GitHub:
https://github.com/DibyanshuChauhan

LinkedIn:
https://linkedin.com/in/divyanshuchauhan
      `,
    },

    date: {
      description: "Show current date and time",
      fn: () => new Date().toString(),
    },

    echo: {
      description: "Echo a passed string",
      usage: "echo <text>",
      fn: (...args) => args.join(" "),
    },
  };

  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState}>
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={`
╔══════════════════════════════════════╗
║      Divyanshu Chauhan Portfolio     ║
╚══════════════════════════════════════╝

Welcome to my interactive terminal.

Type "help" to view all available commands.

Quick Start:
• about
• skills
• projects
• education
• resume
• contact
• socials

Happy Exploring 🚀
          `}
          promptLabel={"divyanshu@macbook:~$"}
          promptLabelStyle={{
            color: "#00ff88",
            fontWeight: "bold",
          }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
