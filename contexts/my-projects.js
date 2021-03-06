import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const MyProjectsContext = createContext({});

function MyProjectsProvider({ children }) {
  const [myProjects, setMyProjects] = useState([]);
  const router = useRouter();

  function addMyProject(id, name, nameWithNamespace) {
    const isDuplicateProject = !!myProjects.find(project => {
      return project.id === id;
    });

    if (!isDuplicateProject) {
      const projects = [...myProjects, { id, name, nameWithNamespace }];

      setMyProjects(projects);
      localStorage.setItem('gitlab-projects', JSON.stringify(projects));
    }
  }

  function deleteMyProject(id) {
    const projects = myProjects.filter(project => project.id !== id);

    if (!projects.length) router.push('/');

    setMyProjects(projects);
    localStorage.setItem('gitlab-projects', JSON.stringify(projects));
  }

  useEffect(() => {
    const projects = localStorage.getItem('gitlab-projects');

    if (projects) setMyProjects(JSON.parse(projects));
  }, []);

  return (
    <MyProjectsContext.Provider
      value={{
        myProjects,
        addMyProject,
        deleteMyProject
      }}
    >
      {children}
    </MyProjectsContext.Provider>
  );
}

export default MyProjectsProvider;
