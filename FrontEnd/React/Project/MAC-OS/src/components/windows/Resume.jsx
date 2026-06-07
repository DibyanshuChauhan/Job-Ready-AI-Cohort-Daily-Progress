import MacWindow from "./MacWindow";
import "./resume.scss";

const Resume = ({ windowName, setWindowState }) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState}>
      <div className="resume-windows">
        <embed type="application/pdf" src="/resume.pdf" title="Resume"></embed>
      </div>
    </MacWindow>
  );
};

export default Resume;
