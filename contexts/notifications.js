import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import { removeObjectPropertyByKey } from '../helpers/general.helpers'

export const NotificationsContext = createContext({})

function notificationsReducer(state, action) {
  switch (action.type) {
    case 'TRACK_PIPELINE':
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case 'UNTRACK_PIPELINE':
      return removeObjectPropertyByKey(state, action.payload.id)
    case 'RECORD_PREVIOUS_VALUE':
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          previousValue: action.payload.previousValue
        }
      }
    default:
      return state
  }
}

function NotificationsProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationsReducer, {})

  function trackPipeline(id) {
    dispatch({
      type: 'TRACK_PIPELINE',
      payload: {
        id
      }
    })
  }

  function untrackPipeline(id) {
    dispatch({
      type: 'UNTRACK_PIPELINE',
      payload: {
        id
      }
    })
  }

  function recordPreviousValue(id, previousValue) {
    dispatch({
      type: 'RECORD_PREVIOUS_VALUE',
      payload: {
        id,
        previousValue
      }
    })
  }

  function getPreviousValue(id) {
    if (!notifications[id]) return null
    return notifications[id].previousValue
  }

  function isNotification(id) {
    return Object.prototype.hasOwnProperty.call(notifications, id)
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        trackPipeline,
        untrackPipeline,
        isNotification,
        recordPreviousValue,
        getPreviousValue
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default NotificationsProvider
