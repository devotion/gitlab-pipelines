export function spawnNotification(status, branch) {
  const permission = Notification.permission

  if (permission === 'default') {
    Notification.requestPermission()
  }

  const body = `Pipeline on branch ${branch} has ${
    status === 'success' ? 'passed' : 'failed'
  }`
  const title = `Pipeline status changed`

  const options = {
    silent: true,
    body
  }

  new Notification(title, options)
}
