import { useContext, useEffect } from 'react'
import NotificationsOffIcon from 'react-ionicons/lib/MdNotificationsOff'

import { AuthContext } from '../contexts/auth'
import BranchIcon from 'react-ionicons/lib/MdGitBranch'
import HourglassIcon from 'react-ionicons/lib/MdTimer'
import convertSeconds from '../helpers/convert-seconds'
import useFetch from '../hooks/useFetch'

import './pipeline.scss'
import LoadingSpinner from './loading/loading-spinner'

const Pipeline = ({
  id,
  status,
  branch,
  gitlabUrl,
  setSingleFilter,
  projectId
}) => {
  const {
    credentials: { registry, token }
  } = useContext(AuthContext)
  // const notification = new Notification('Hi there')

  // console.log(notification)

  const [pipelineDetails, fetchingDetails, refetchDetails] = useFetch(
    `${registry}/projects/${projectId}/pipelines/${id}`,
    {
      headers: { 'Private-Token': token }
    },
    [id, registry, token, branch, status],
    {}
  )

  const { duration, detailed_status, created_at } = pipelineDetails

  if (fetchingDetails) {
    return (
      <div className="pipeline">
        <div className="pipeline__loading">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

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
          {convertSeconds(duration)}
        </div>
        <a
          href={gitlabUrl}
          target="_blank"
          className="pipeline__gitlab-url"
          rel="noreferrer noopener"
        >
          View on Gitlab
        </a>
        <div className={`pipeline__notifications-toggle`}>
          <NotificationsOffIcon />
        </div>
      </div>
    </div>
  )
}

export default Pipeline
