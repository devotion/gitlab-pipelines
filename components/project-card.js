import "./project-card.scss";

const ProjectCard = ({ id, name, nameWithNamespace, setSelectedProject }) => {
  return (
    <div
      className="project-card"
      onClick={() => {
        setSelectedProject({
          id,
          name,
          nameWithNamespace
        });
      }}
    >
      <h4 className="project-card__name">{name}</h4>
      <div className="project-card__namespace">{nameWithNamespace}</div>
    </div>
  );
};

export default ProjectCard;
