import React, { FunctionComponent, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { TextField } from "../shared";
import { Form, Button } from "reactstrap";
import { getRequiredValidation, getEmailValidation, composeValidations } from "../shared/validators";
import { useFormatMessage } from "../i18n/i18n.service";
import axiosInstance from "../services/Axios";
import { getCurrentUser } from "../actions/DataActions";
import Notify from "../services/Notify";
import { SelectField } from "../shared/SelectField";

const AVAILABLE_USER_ROLES = ["user", "supervisor", "admin"];

type AddUserFormTypes = {
  value: {
    username: string;
    role: string;
    password?: string;
  };
  afterSubmit: () => any;
  onDismiss: () => any;
};

const requiredValidation = getRequiredValidation("required.error");
const emailValidation = composeValidations(requiredValidation, getEmailValidation());

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

  return (
    <FinalForm onSubmit={onSubmit} initialValues={props.value}>
      {(form) => (
        <Form onSubmit={form.handleSubmit}>
          <Field name="username" type="text" label="email" component={TextField} validate={emailValidation} />
          <Field name="password" type="text" label="password" component={TextField} validate={requiredValidation} />
          <Field
            name="role"
            label="role"
            component={SelectField}
            validate={requiredValidation}
            options={AVAILABLE_USER_ROLES}
          />
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
