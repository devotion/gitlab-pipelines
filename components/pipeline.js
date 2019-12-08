import dayjs from 'dayjs'

import BranchIcon from 'react-ionicons/lib/MdGitBranch'
import HourglassIcon from 'react-ionicons/lib/MdTimer'
import convertSeconds from '../helpers/convert-seconds'
import './pipeline.scss'

const Pipeline = ({
  id,
  status,
  branch,
  gitlabUrl,
  createdAt,
  updatedAt,
  setSingleFilter
}) => {
  const secondsElapsed = dayjs(updatedAt).diff(dayjs(createdAt), 'seconds')

  return (
    <div className="pipeline">
      <div>
        <div
          className="pipeline__branch"
          onClick={() => {
            setSingleFilter('ref', branch)
          }}
        >
          <BranchIcon />
          {branch}
        </div>
        <div
          className={`pipeline__status pipeline__status--${status}`}
          onClick={() => {
            setSingleFilter('status', status)
          }}
        >
          {status}
        </div>
      </div>
      <div>
        <div className="pipeline__time-elapsed">
          <HourglassIcon />
          {convertSeconds(secondsElapsed)}
        </div>
        <a
          href={gitlabUrl}
          target="_blank"
          className="pipeline__gitlab-url"
          rel="noreferrer noopener"
        >
          View on Gitlab
        </a>
      </div>
    </div>
  )
}

export default Pipeline
