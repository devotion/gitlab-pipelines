import { useState, useEffect } from 'react'

function useNotificationsPermission() {
  const [notificationsPermission, setNotificationsPermission] = useState('')

  useEffect(() => {
    setNotificationsPermission(Notification.permission)
  }, [])

  return [notificationsPermission, setNotificationsPermission]
}

export default useNotificationsPermission
