import useNotificationsPermission from '../../hooks/useNotificationsPermission';

function NotificationsFeature() {
  const [
    notificationsPermission,
    setNotificationsPermission
  ] = useNotificationsPermission();

  switch (notificationsPermission) {
    case 'granted':
      return (
        <>
          <p>
            You have <strong>enabled</strong> notifications for this app. You
            can change this anytime in your browser settings. You can also turn
            on/off individual notifications for each pipeline.
          </p>
          <p>
            By default, it will track <strong>master</strong> branch and your
            own pipelines if you selected to add the username.
          </p>
        </>
      );
    case 'denied':
      return (
        <p>
          You have <strong>disabled</strong> notifications for this app. You can
          change this anytime in your browser settings.
        </p>
      );
    default:
      return (
        <>
          <p>
            App can send you notifications when some of your monitored pipelines
            pass or fail. Since it is a browser feature, you need to enable by
            clicking here and then choosing `allow`
          </p>
          <p>
            You can edit to receive notifications for pipelines you like
            tracked. By default, you will get them for master branch and for a
            chosen username.
          </p>
          <button
            className="button button-full"
            onClick={() => {
              Notification.requestPermission(permission => {
                setNotificationsPermission(permission);
              });
            }}
          >
            Enable notifications
          </button>
        </>
      );
  }
}

export default NotificationsFeature;
