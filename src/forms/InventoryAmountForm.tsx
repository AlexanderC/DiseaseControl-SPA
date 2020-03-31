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

type StringOrNumber = string | number;

type InventoryAmountFormTypes = {
  hospitalId: StringOrNumber;
  hospitalInventoryId: StringOrNumber;
  value: {
    quantity: StringOrNumber;
    total: StringOrNumber;
  };
  afterSubmit: () => any;
  onDismiss: () => any;
};

const requiredValidation = getRequiredValidation("required.error");

export const InventoryAmountForm: FunctionComponent<InventoryAmountFormTypes> = (props) => {
  const [loading, setLoading] = useState(false);
  const l10n = useFormatMessage();
  const user = getCurrentUser();

  const patchHospital = async (body: any) => {
    await axiosInstance.post(
      `/hospital/${props.hospitalId}/inventory/${props.hospitalInventoryId}?token=${user.token}`,
      body
    );
  };

  const onSubmit = async (formValue: any) => {
    setLoading(true);
    try {
      const { quantity, total }: any = formValue;
      await patchHospital({ total: Math.trunc(total), quantity: Math.trunc(quantity) });
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
          <Field name="total" type="number" min="0" label="total" component={TextField} validate={requiredValidation} />
          <Field
            name="quantity"
            type="number"
            min="0"
            label="quantity"
            component={TextField}
            validate={requiredValidation}
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
