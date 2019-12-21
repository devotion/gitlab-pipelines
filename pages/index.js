import { useEffect, useContext } from 'react';
import Router from 'next/router';

import Layout from '../components/layout';
import LoadingPage from '../components/loading/loading-page';
import NotificationsFeature from '../components/home-page/notifications-feature';
import UsernameForm from '../components/forms/username-form';
import { AuthContext } from '../contexts/auth';

import './index.scss';

function Home() {
  const {
    credentials: { token }
  } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      Router.push('/login');
    }
  }, [token]);

  if (!token) {
    return (
      <Layout title="Home" showHeader={false}>
        <LoadingPage />
      </Layout>
    );
  }

  return (
    <Layout title="Home">
      <div className="home">
        <h1>Welcome to GitLab Pipelines</h1>
        <p>Choose a project and let&apos;s start</p>

        <div className="home__feature">
          <h2>Track your pipelines</h2>
          <p>
            This is an open source project meant to make it easier for you to
            track your GitLab pipelines.
          </p>
        </div>

        <div className="home__feature">
          <h2>We use browser notifications</h2>
          <NotificationsFeature />
        </div>
        <div className="home__feature">
          <h2>Add your username</h2>
          <p>
            You can add your gitlab username to enable notifications by default
            for the pipelines that you create
          </p>
          <UsernameForm />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
