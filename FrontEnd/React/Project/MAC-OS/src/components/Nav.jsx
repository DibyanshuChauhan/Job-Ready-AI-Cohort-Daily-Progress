import DateTimeDisplay from "./DateTimeDisplay";
import "./nav.scss";

const Nav = () => {
  return (
    <nav>
      <div className="left">
        <div className="apple-icon">
          <img src="../../public/navbar-icons/apple.svg" alt="" />
        </div>

        <div className="nav-item">
          <p>Divyanshu Chauhan</p>
        </div>

        <div className="nav-item">
          <p>File</p>
        </div>
        <div className="nav-item">
          <p>Window</p>
        </div>
        <div className="nav-item">
          <p>Terminal</p>
        </div>
      </div>

      <div className="right">
        <div className="nav-icon">
          <img src="../../public/navbar-icons/wifi.svg" alt="" />
        </div>
        <div className="nav-icon">
          <DateTimeDisplay />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
