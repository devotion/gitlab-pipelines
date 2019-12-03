import useFetch from "../hooks/useFetch";

const Pipelines = ({ selectedProject, token, registry }) => {
  if (!selectedProject) return null;

  const { id } = selectedProject;

  const [pipelines] = useFetch(
    `${registry}/projects/${id}/pipelines`,
    {
      headers: {
        "Private-Token": token
      }
    },
    []
  );
  return <div className="pipelines">{JSON.stringify(pipelines)}</div>;
};

export default Pipelines;
