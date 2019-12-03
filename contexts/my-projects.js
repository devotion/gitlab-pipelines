import { createContext, useState } from "react";

export const MyProjectsContext = createContext({});

export default ({ children }) => {
  const [myProjects, setMyProjects] = useState([]);

  const addMyProject = (id, name, nameWithNamespace) => {
    const isDuplicateProject = !!myProjects.find(project => {
      return project.id === id;
    });

    if (!isDuplicateProject) {
      setMyProjects([...myProjects, { id, name, nameWithNamespace }]);
    }
  };

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
