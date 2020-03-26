import React, { FunctionComponent, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { TextField } from "../shared";
import { Form, Button } from "reactstrap";
import { getRequiredValidation } from "../shared/validators";
import { useFormatMessage } from "../i18n/i18n.service";

type ItemFormTypes = {
  item: {
    name: string;
    description: string;
  };
  onSubmit: (values: any) => any;
  onReset: () => any;
};

export const ItemForm: FunctionComponent<ItemFormTypes> = (props) => {
  const [loading, setLoading] = useState(false);
  const i10n = useFormatMessage();

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await props.onSubmit(values);
    } catch (e) {
      return { [FORM_ERROR]: "required.error" };
    }
    setLoading(false);
  };

  const required = getRequiredValidation("required.error");

  return (
    <FinalForm onSubmit={onSubmit} initialValues={props.item}>
      {(form) => (
        <Form onSubmit={form.handleSubmit}>
          <Field name="name" type="text" label="name" component={TextField} validate={required} />
          <Field name="description" type="description" label="description" component={TextField} validate={required} />
          <Button type="submit" className="mr-3" disabled={loading}>
            {i10n("submit")}
          </Button>
          <Button type="reset" color="danger" onClick={props.onReset} disabled={loading}>
            {i10n("reset")}
          </Button>
        </Form>
      )}
    </FinalForm>
  );
};
