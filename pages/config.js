import Layout from "../components/layout";
import ConfigForm from "../components/forms/config-form";

import "./config.scss";

const Config = () => (
  <Layout title="Config">
    <div className="config">
      <h1>Welcome to Gitlab Pipelines</h1>
      <ConfigForm />
    </div>
  </Layout>
);

export default Config;
