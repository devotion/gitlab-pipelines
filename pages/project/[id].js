import { useContext } from "react";
import Layout from "../../components/layout";
import { AuthContext } from "../../contexts/auth";
import useFetch from "../../hooks/useFetch";
import useInterval from "../../hooks/useInterval";
import LoadingPage from "../../components/loading-page";

const Project = ({ id }) => {
  const {
    credentials: { registry, token }
  } = useContext(AuthContext);

  const [pipelines, refetchData] = useFetch(
    `${registry}/projects/${id}/pipelines`,
    {
      headers: {
        "Private-Token": token
      }
    },
    [id, registry, token],
    []
  );

  useInterval(refetchData, 10000);

  if (!pipelines || !pipelines.length)
    return (
      <Layout>
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout title={"GitLab project"}>
      <div>{JSON.stringify(pipelines, undefined, 2)}</div>
    </Layout>
  );
};

Project.getInitialProps = ({ query }) => {
  const { id } = query;

  return { id };
};

export default Project;
