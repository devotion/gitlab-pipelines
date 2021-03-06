import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../form/text-input';
import { AuthContext } from '../../contexts/auth';

import './auth-form.scss';

const validationSchema = Yup.object().shape({
  registry: Yup.string()
    .required('Required')
    .url(),
  token: Yup.string().required('Required')
});

function AuthForm() {
  const { login } = useContext(AuthContext);

  function onSubmit(values) {
    login(values.token, values.registry);
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        registry: '',
        token: ''
      }}
      validationSchema={validationSchema}
    >
      <Form className="login-form" autoComplete="off">
        <TextInput placeholder="Registry name" id="registry" name="registry" />
        <TextInput placeholder="Token" id="token" name="token" />

        <button type="submit" className="button button-full">
          Sign in
        </button>
      </Form>
    </Formik>
  );
}

export default AuthForm;
