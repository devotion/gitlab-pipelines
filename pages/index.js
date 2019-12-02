import { useState, useEffect } from "react";
import Router from "next/router";

import Layout from "../components/layout";
import ProjectForm from "../components/forms/project-form";
import LoadingPage from "../components/loading-page";

import "./index.scss";

const Home = () => {
  const [token, setToken] = useState();
  const [registry, setRegistry] = useState();

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
    <Layout title="Home">
      <div className="home">
        <div className="home__left">
          <ProjectForm registry={registry} token={token} />
          <div className="projects">Selected projects</div>
        </div>
        <div className="home__right">Pipelines</div>
      </div>
    </Layout>
  );
};

export default Home;
