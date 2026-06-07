import "./dock.scss";

const Dock = ({ setWindowState }) => {
  return (
    <footer className="dock">
      <div
        onClick={() => {
          setWindowState((state) => ({
            ...state,
            github: true,
          }));
        }}
        className="icon github"
      >
        <img src="../../public/doc-icon/github.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowState((state) => ({
            ...state,
            note: true,
          }));
        }}
        className="icon note"
      >
        <img src="../../public/doc-icon/note.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowState((state) => ({
            ...state,
            resume: true,
          }));
        }}
        className="icon pdf"
      >
        <img src="../../public/doc-icon/pdf.svg" alt="" />
      </div>

      <div
        onClick={() => {
          window.open(
            "https://calendar.google.com/calendar/u/0/r?pli=1",
            "_blank",
          );
        }}
        className="icon calender"
      >
        <img src="../../public/doc-icon/calender.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowState((state) => ({
            ...state,
            spotify: true,
          }));
        }}
        className="icon spotify"
      >
        <img src="../../public/doc-icon/spotify.svg" alt="" />
      </div>

      <div
        onClick={() => {
          window.open("mailto:cdivyanshu98@gmail.com", "_blank");
        }}
        className="icon mail"
      >
        <img src="../../public/doc-icon/mail.svg" alt="" />
      </div>

      <div
        onClick={() => {
          window.open("https://www.linkedin.com/in/divyanshu011/", "_blank");
        }}
        className="icon link"
      >
        <img src="../../public/doc-icon/link.svg" alt="" />
      </div>

      <div
        onClick={() => {
          setWindowState((state) => ({
            ...state,
            cli: true,
          }));
        }}
        className="icon cli"
      >
        <img src="../../public/doc-icon/cli.svg" alt="" />
      </div>
    </footer>
  );
};

export default Dock;
