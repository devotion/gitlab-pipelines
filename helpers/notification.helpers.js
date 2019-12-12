export const spawnNotification = (status, branch) => {
  const permission = Notification.permission

  if (permission === 'default') {
    Notification.requestPermission()
  }

  const title = `Pipeline on branch ${branch} has ${
    status === 'success' ? 'passed' : 'failed'
  }`

  const options = {
    silent: true,
    icon: 'https://about.gitlab.com/images/new_logo/C.jpg'
  }

  new Notification(title, options)
}
