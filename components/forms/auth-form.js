import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../form/text-input";
import { AuthContext } from "../../contexts/auth";

import "./auth-form.scss";

const validationSchema = Yup.object().shape({
  registry: Yup.string()
    .required("Required")
    .url(),
  // .matches(/(gitlab)/),
  token: Yup.string().required("Required")
});

const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const onSubmit = values => {
    login(values.token, values.registry);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        registry: "",
        token: ""
      }}
      validationSchema={validationSchema}
    >
      <Form className="config-form">
        <TextInput placeholder="Registry name" id="registry" name="registry" />
        <TextInput placeholder="Token" id="token" name="token" />

        <button type="submit" className="button button-full">
          Check your pipes
        </button>
      </Form>
    </Formik>
  );
};

export default AuthForm;
