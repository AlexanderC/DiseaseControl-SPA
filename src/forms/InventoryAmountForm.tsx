import React, { FunctionComponent, useState, useEffect } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { TextField } from "../shared";
import { Form, Button, Row, Col } from "reactstrap";
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
    detailed: object | null;
    total: StringOrNumber;
  };
  afterSubmit: () => any;
  onDismiss: () => any;
  hideTotalAmount?: boolean;
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

  const [detailedOptions, setDetailedOptions] = useState<any>({});

  const getRandomKey = () => Math.random().toString(36).substring(7);

  useEffect(() => {
    if (props.value.detailed) {
      const data = Object.entries(props.value.detailed).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [getRandomKey()]: {
            name: key,
            value,
          },
        }),
        {}
      );
      setDetailedOptions(data);
    } else {
      setDetailedOptions({
        [getRandomKey()]: {
          name: "",
          value: "",
        },
      });
    }
  }, [props.value.detailed]);

  const addNewKey = () => setDetailedOptions({ ...detailedOptions, [getRandomKey()]: { name: "", value: "" } });
  const deleteItem = (key: any) => {
    const data = { ...detailedOptions };
    delete data[key];
    setDetailedOptions(data);
  };

  const onSubmit = async (formValue: any) => {
    setLoading(true);
    try {
      const { detailed, total }: any = formValue;

      const detailedParsed = Object.keys(detailed).reduce((acc: any, key: any) => {
        if (typeof detailedOptions[key] !== "undefined") {
          return {
            ...acc,
            [detailed[key].name]: Math.trunc(detailed[key].value),
          };
        } else {
          return acc;
        }
      }, {});

      const body: any = {
        detailed: detailedParsed,
      };

      if (!props.hideTotalAmount) {
        body.total = Math.trunc(total);
      }

      await patchHospital(body);
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
          {!props.hideTotalAmount && (
            <Field
              name="total"
              type="number"
              min="0"
              label="total"
              component={TextField}
              validate={requiredValidation}
            />
          )}
          {Object.keys(detailedOptions).map((key: string) => (
            <Row key={key}>
              <Col md={6}>
                <Field
                  name={`detailed.${key}.name`}
                  type="text"
                  min="0"
                  label="name"
                  defaultValue={detailedOptions[key].name as any}
                  component={TextField}
                  validate={requiredValidation}
                />
              </Col>
              <Col md={4}>
                <Field
                  name={`detailed.${key}.value`}
                  type="number"
                  min="0"
                  label="quantity"
                  defaultValue={detailedOptions[key].value as any}
                  component={TextField}
                  validate={requiredValidation}
                />
              </Col>
              <Col md={2}>
                <Button color="danger" style={{ marginTop: "30px" }} onClick={() => deleteItem(key)}>
                  X
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="my-2">
            <Col md={12}>
              <Button color="primary" onClick={addNewKey}>
                {l10n("addNew")}
              </Button>
            </Col>
          </Row>
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
