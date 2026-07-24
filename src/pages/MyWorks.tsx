import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          Selected <span>Projects</span>
        </h1>
        <p>
          Engineering and machine learning first, supported by selected mobile
          and creative product work.
        </p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <article className="myworks-card" key={project.id}>
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                width="1200"
                height="675"
              />
            </div>
            <div className="myworks-card-info">
              <div className="myworks-card-meta">
                <span>{project.year}</span>
                <span>{project.status === "completed" ? "Completed" : "In progress"}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="myworks-card-subtitle">{project.subtitle}</p>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <div className="myworks-card-details">
                <span>{project.role}</span>
                <span>{project.teamType === "team" ? "Team project" : "Individual project"}</span>
              </div>
              <ul className="myworks-card-highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="myworks-card-tech">
                {project.technologies.join(" · ")}
              </p>
              <div className="myworks-card-actions">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
