import { useContext } from "react";
import AuthForm from "../components/forms/auth-form";
import { AuthContext } from "../contexts/auth";
import Router from "next/router";

import "./config.scss";

const Config = () => {
  const {
    credentials: { token, registry }
  } = useContext(AuthContext);

  if (token && registry) {
    Router.push("/");
  }

  return (
    <div className="config">
      <h1>Welcome to Gitlab Pipelines</h1>
      <AuthForm />
    </div>
  );
};

export default Config;
