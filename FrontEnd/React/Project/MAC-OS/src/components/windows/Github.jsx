import "./github.scss";
import MacWindow from "./MacWindow";
import githubData from "../../assets/github.json";

const GitCard = ({ data }) => {
  return (
    <article className="card">
      <img className="card-image" src={data.image} alt={data.title} />

      <div className="card-content">
        <h2>{data.title}</h2>

        <p className="description">{data.description}</p>

        <div className="tags">
          {data.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="urls">
          <a href={data.repoLink} target="_blank" rel="noreferrer">
            Repository
          </a>

          {data.demoLink && (
            <a href={data.demoLink} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Github = ({ windowName, setWindowState }) => {
  return (
    <MacWindow setWindowState={setWindowState} windowName={windowName}>
      <div className="cards">
        {githubData.map((project) => (
          <GitCard key={project.id} data={project} />
        ))}
      </div>
    </MacWindow>
  );
};

export default Github;
