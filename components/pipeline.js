import { useContext, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import NotificationsOffIcon from 'react-ionicons/lib/IosNotificationsOffOutline'

import { AuthContext } from '../contexts/auth'
import BranchIcon from 'react-ionicons/lib/IosGitBranch'
import StopwatchIcon from 'react-ionicons/lib/IosStopwatchOutline'
import {
  convertPipelineDuration,
  convertPipelineCreatedAt
} from '../helpers/date.helpers'
import { spawnNotification } from '../helpers/notification.helpers'
import useFetch from '../hooks/useFetch'
import useTrackPropChange from '../hooks/useTrackPropChange'
import LoadingSpinner from './loading/loading-spinner'

import './pipeline.scss'

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

  useTrackPropChange(status, () => {
    if (status === 'success' || status === 'failed') {
      spawnNotification(status, branch)
    }
  })

  const [pipelineDetails, fetchingDetails] = useFetch(
    `${registry}/projects/${projectId}/pipelines/${id}`,
    {
      headers: { 'Private-Token': token }
    },
    [id, registry, token, branch, status],
    {}
  )

  const { duration, user, detailed_status, created_at } = pipelineDetails

  if (fetchingDetails || !user) {
    return (
      <div className="pipeline">
        <div className="pipeline__loading">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  const createdAtSecondsElapsed = dayjs().diff(created_at, 'second')

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
          <img src={detailed_status.favicon} alt="" align="middle" />
          {detailed_status.text}
        </div>
      </div>
      <div>
        <div className="pipeline__started-at">
          {convertPipelineCreatedAt(createdAtSecondsElapsed)}
        </div>
        <div className="pipeline__time-elapsed">
          <StopwatchIcon />
          {convertPipelineDuration(duration)}
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

      <div className="pipeline__user">
        <div
          className="pipeline__user-name"
          onClick={() => {
            setSingleFilter('username', user.username)
          }}
        >
          {user.name}
        </div>
        <div className="pipeline__user-avatar">
          <img src={user.avatar_url} alt="user avatar" />
        </div>
      </div>
    </div>
  )
}

export default Pipeline
