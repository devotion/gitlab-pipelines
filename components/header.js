import Router from "next/router";

import "./header.scss";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("gitlab-token");
    localStorage.removeItem("gitlab-registry");
    Router.push("/config");
  };
  return (
    <header className="header">
      <div>
        <div>GitLab Pipelines</div>
        <button className="button button-full" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
