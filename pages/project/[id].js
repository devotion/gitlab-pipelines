import fetch from "isomorphic-unfetch";
import Layout from "../../components/layout";

const Project = ({ pipelines }) => {
  return (
    <Layout title={"GitLab project"}>
      <div>{JSON.stringify(pipelines, undefined, 2)}</div>
    </Layout>
  );
};

Project.getInitialProps = async ({ query }) => {
  const { id, token, registry } = query;

  if (token && registry) {
    const response = await fetch(`${registry}/projects/${id}/pipelines`, {
      headers: {
        "Private-Token": token
      }
    });

    const pipelines = await response.json();

    return { pipelines };
  }

  return {};
};

export default Project;
