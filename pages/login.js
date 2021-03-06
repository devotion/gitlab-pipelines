import { useContext } from 'react';
import Router from 'next/router';

import AuthForm from '../components/forms/auth-form';
import { AuthContext } from '../contexts/auth';

import './login.scss';

function Login() {
  const {
    credentials: { token, registry }
  } = useContext(AuthContext);

  if (token && registry) {
    Router.push('/');
  }

  return (
    <div className="login">
      <h1>Welcome to Gitlab Pipelines</h1>
      <AuthForm />
      <p>
        Gitlab&apos;s registry name and token are only stored on your
        browser&apos;s localStorage and nowhere else.
      </p>
    </div>
  );
}

export default Login;
