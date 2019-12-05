import Link from "next/link";
import { useContext } from "react";
import "./project-card.scss";
import { AuthContext } from "../contexts/auth";

const ProjectCard = ({ id, name, nameWithNamespace }) => {
  const {
    credentials: { token, registry }
  } = useContext(AuthContext);

  return (
    <div className="project-card">
      <Link
        href={`/project/[id]?token=${token}&registry=${registry}`}
        as={`/project/${id}`}
      >
        <h4 className="project-card__name">{name}</h4>
      </Link>
      <div className="project-card__namespace">{nameWithNamespace}</div>
    </div>
  );
};

export default ProjectCard;
