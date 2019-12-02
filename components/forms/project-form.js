import { Formik, Form } from "formik";
import * as Yup from "yup";
import fetch from "isomorphic-unfetch";

import TextInput from "../form/text-input";

import "./project-form.scss";

const validationSchema = Yup.object().shape({
  project: Yup.string().required("Required")
});

const ProjectForm = ({ registry, token }) => {
  const onSubmit = async values => {
    try {
      const res = await fetch(
        `${registry}/search?scope=projects&search=${values.project}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Private-Token": token
          }
        }
      );

      const data = await res.json();

      localStorage.setItem("gitlab-projects", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        project: ""
      }}
      validationSchema={validationSchema}
    >
      <Form className="project-form">
        <TextInput
          placeholder="Enter your project name"
          id="project"
          name="project"
        />

        <button type="submit" className="button button-full">
          +
        </button>
      </Form>
    </Formik>
  );
};

export default ProjectForm;
