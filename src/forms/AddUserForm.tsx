import React, { FunctionComponent, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { TextField } from "../shared";
import { Form, Button } from "reactstrap";
import { getRequiredValidation } from "../shared/validators";
import { useFormatMessage } from "../i18n/i18n.service";
import axiosInstance from "../services/Axios";
import { getCurrentUser } from "../actions/DataActions";
import Notify from "../services/Notify";

type AddUserFormTypes = {
  value: {
    username: string;
    role: string;
    password?: string;
  };
  afterSubmit: () => any;
  onDismiss: () => any;
};

export const AddUserForm: FunctionComponent<AddUserFormTypes> = (props) => {
  const [loading, setLoading] = useState(false);
  const l10n = useFormatMessage();
  const user = getCurrentUser();

  const submitUser = async (body: any) => {
    await axiosInstance.post(`/admin/identity/register?token=${user.token}`, body);
  };

  const onSubmit = async (formValue: any) => {
    setLoading(true);
    try {
      await submitUser(formValue);
      Notify.success(l10n("defaultSuccessMessage"));
      props.afterSubmit();
    } catch (e) {
      Notify.error(e?.response?.data?.message ?? l10n("defaultErrorMessage"));

      setLoading(false);
      return { [FORM_ERROR]: "required.error" };
    } finally {
      setLoading(false);
    }
  };

  const required = getRequiredValidation("required.error");

  return (
    <FinalForm onSubmit={onSubmit} initialValues={props.value}>
      {(form) => (
        <Form onSubmit={form.handleSubmit}>
          <Field name="username" type="text" label="username" component={TextField} validate={required} />
          <Field name="password" type="text" label="password" component={TextField} validate={required} />
          <Field name="role" type="text" label="role" component={TextField} validate={required} />
          <Button type="submit" className="mr-3" disabled={loading}>
            {l10n("submit")}
          </Button>
          <Button type="reset" color="danger" onClick={props.onDismiss} disabled={loading}>
            {l10n("reset")}
          </Button>
        </Form>
      )}
    </FinalForm>
  );
};
