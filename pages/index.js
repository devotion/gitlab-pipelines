import { useState, useEffect } from "react";
import Router from "next/router";

import Layout from "../components/layout";
import ProjectForm from "../components/forms/project-form";
import LoadingPage from "../components/loading-page";
import MyProjects from "../components/my-projects";
import Pipelines from "../components/pipelines";

import MyProjectsContext from "../contexts/my-projects";

import "./index.scss";

const Home = () => {
  const [token, setToken] = useState();
  const [registry, setRegistry] = useState();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("gitlab-token");
    const registry = localStorage.getItem("gitlab-registry");

    if (token) {
      setToken(token);
      setRegistry(registry);
    } else {
      Router.push("/config");
    }
  }, [token]);

  if (!token) {
    return (
      <Layout title="Home" showHeader={false}>
        <LoadingPage />
      </Layout>
    );
  }

  return (
    <MyProjectsContext>
      <Layout title="Home">
        <div className="home">
          <div className="home__left">
            <ProjectForm registry={registry} token={token} />
            <MyProjects setSelectedProject={setSelectedProject} />
            <div></div>
          </div>
          <div className="home__right">
            <Pipelines
              selectedProject={selectedProject}
              token={token}
              registry={registry}
            />
          </div>
        </div>
      </Layout>
    </MyProjectsContext>
  );
};

export default Home;
