import { createContext, useState, useEffect } from "react";

export const MyProjectsContext = createContext({});

export default ({ children }) => {
  const [myProjects, setMyProjects] = useState([]);

  const addMyProject = (id, name, nameWithNamespace) => {
    const isDuplicateProject = !!myProjects.find(project => {
      return project.id === id;
    });

    if (!isDuplicateProject) {
      const projects = [...myProjects, { id, name, nameWithNamespace }];

      setMyProjects(projects);
      localStorage.setItem("gitlab-projects", JSON.stringify(projects));
    }
  };

  useEffect(() => {
    const projects = localStorage.getItem("gitlab-projects");

    if (projects) setMyProjects(JSON.parse(projects));
  }, []);

  return (
    <MyProjectsContext.Provider
      value={{
        myProjects,
        addMyProject
      }}
    >
      {children}
    </MyProjectsContext.Provider>
  );
};
