import { useState, useEffect } from "react";
import Router from "next/router";

import Layout from "../components/layout";
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
  }, []);

  if (!token) {
    return (
      <Layout title="Home">
        <LoadingPage />
      </Layout>
    );
  }

  return (
    <Layout title="Home">
      <div className="home">
        <h1>You have logged in</h1>
        <div>
          LocalStorage reads this:{token} <br /> registry: {registry}
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
