import PropTypes from 'prop-types';
import { useContext, useEffect, memo } from 'react';
import dayjs from 'dayjs';
import NotificationsOffIcon from 'react-ionicons/lib/IosNotificationsOffOutline';
import NotificationsOnIcon from 'react-ionicons/lib/IosNotifications';
import { spawnNotification } from '../../helpers/notification.helpers';

import { AuthContext } from '../../contexts/auth';
import { NotificationsContext } from '../../contexts/notifications';
import BranchIcon from 'react-ionicons/lib/IosGitBranch';
import StopwatchIcon from 'react-ionicons/lib/IosStopwatchOutline';
import {
  convertPipelineDuration,
  convertPipelineCreatedAt
} from '../../helpers/date.helpers';
import useFetch from '../../hooks/useFetch';
import useNotificationsPermission from '../../hooks/useNotificationsPermission';

import LoadingSpinner from '../loading/loading-spinner';

import './pipeline.scss';

function Pipeline({
  id,
  status,
  branch,
  gitlabUrl,
  setSingleFilter,
  projectId
}) {
  const {
    credentials: { registry }
  } = useContext(AuthContext);

  const [notificationsPermission] = useNotificationsPermission();

  console.log(notificationsPermission);

  const {
    trackPipeline,
    untrackPipeline,
    isNotification,
    saveCurrentStatus,
    getCurrentStatus
  } = useContext(NotificationsContext);

  const [pipelineDetails, fetchingDetails] = useFetch(
    `${registry}/projects/${projectId}/pipelines/${id}`
  );

  useEffect(() => {
    if (!isNotification(id)) return;

    if (!getCurrentStatus(id)) {
      saveCurrentStatus(id, status);
      return;
    }

    if (getCurrentStatus(id) !== status) {
      if (status === 'success' || status === 'failed') {
        spawnNotification(status, branch);
      }
      saveCurrentStatus(id, status);
    }
  });

  const { duration, user, detailed_status, created_at } = pipelineDetails;

  if (fetchingDetails || !user) {
    return (
      <div className="pipeline">
        <div className="pipeline__loading">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const createdAtSecondsElapsed = dayjs().diff(created_at, 'second');

  return (
    <div className="pipeline">
      <div>
        <div
          className="pipeline__branch"
          onClick={() => {
            setSingleFilter('ref', branch);
          }}
        >
          <BranchIcon />
          {branch}
        </div>
        <div
          className={`pipeline__status pipeline__status--${status}`}
          onClick={() => {
            setSingleFilter('status', status);
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
        {notificationsPermission === 'granted' && (
          <div className={`pipeline__notifications-toggle`}>
            {isNotification(id) ? (
              <NotificationsOnIcon
                onClick={() => {
                  untrackPipeline(id);
                }}
              />
            ) : (
              <NotificationsOffIcon
                onClick={() => {
                  trackPipeline(id);
                  saveCurrentStatus(id, status);
                }}
              />
            )}
          </div>
        )}
      </div>

      <div className="pipeline__user">
        <div
          className="pipeline__user-name"
          onClick={() => {
            setSingleFilter('username', user.username);
          }}
        >
          {user.name}
        </div>
        <div className="pipeline__user-avatar">
          <img src={user.avatar_url} alt="user avatar" />
        </div>
      </div>
    </div>
  );
}

Pipeline.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  branch: PropTypes.string,
  gitlabUrl: PropTypes.string,
  setSingleFilter: PropTypes.func,
  projectId: PropTypes.string
};

export default memo(Pipeline);
