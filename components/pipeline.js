import BranchIcon from "react-ionicons/lib/MdGitBranch";

import "./pipeline.scss";

const Pipeline = ({ id, status, branch }) => {
  return (
    <div className="pipeline">
      <div className="pipeline__branch">
        <BranchIcon />
        {branch}
      </div>
      <div className={`pipeline__status pipeline__status--${status}`}>
        {status}
      </div>
    </div>
  );
};

export default Pipeline;
