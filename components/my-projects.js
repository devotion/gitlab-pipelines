import { useContext } from "react";
import { MyProjectsContext } from "../contexts/my-projects";
import ProjectCard from "./project-card";

import "./my-projects.scss";

const MyProjects = ({ setSelectedProject }) => {
  const { myProjects } = useContext(MyProjectsContext);
  // const repos = [
  //   {
  //     id: "1313313",
  //     name: "cash36-mrz",
  //     nameWithNamespace: "root / cash36 / cash36-mrz"
  //   },
  //   {
  //     id: "1313312",
  //     name: "cash36-frontend",
  //     nameWithNamespace: "root / cash36 / cash36-mrz"
  //   }
  // ];
  if (myProjects.length === 0) return null;

  return (
    <div className="repos">
      <h2>Projects</h2>
      {myProjects.map(project => (
        <ProjectCard
          setSelectedProject={setSelectedProject}
          key={project.id}
          {...project}
        />
      ))}
    </div>
  );
};

export default MyProjects;
