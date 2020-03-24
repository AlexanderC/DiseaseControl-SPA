import React, { FunctionComponent } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { TextField, required } from "../shared";
import { Form } from "reactstrap";

export const EditTagForm: FunctionComponent<any> = (props) => {
  const onSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (e) {
      return { [FORM_ERROR]: "login.error" };
    }
  };

  return (
    <FinalForm onSubmit={onSubmit}>
      {(form) => (
        <Form onSubmit={form.handleSubmit}>
          <Field
            name="title"
            type="text"
            label="Title"
            component={TextField}
            validate={required}
          />
          <Field
            name="description"
            type="description"
            label="Description"
            component={TextField}
            validate={required}
          />
        </Form>
      )}
    </FinalForm>
  );
};
