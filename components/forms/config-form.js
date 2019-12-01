import { Formik, Form } from "formik";
import * as Yup from "yup";
import Router from "next/router";

import TextInput from "../form/text-input";

import "./config-form.scss";

const validationSchema = Yup.object().shape({
  registry: Yup.string()
    .required("Required")
    .url(),
  // .matches(/(gitlab)/),
  token: Yup.string().required("Required")
});

const ConfigForm = () => {
  const onSubmit = values => {
    localStorage.setItem("gitlab-token", values.token);
    localStorage.setItem("gitlab-registry", values.registry);

    Router.push("/");
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

export default ConfigForm;
