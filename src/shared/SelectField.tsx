import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useFormatMessage } from "../i18n/i18n.service";

export function SelectField(props: FieldRenderProps<string | undefined, HTMLSelectElement>) {
  const { input, meta, ...rest } = props;
  const l10n = useFormatMessage();
  return (
    <FormGroup>
      <Label>{l10n(rest.label)}</Label>
      <Input {...(input as any)} {...rest} type="select" invalid={!!meta.error && meta.touched}>
        {props.options.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Input>
      {meta.error && meta.touched && <FormFeedback valid={false}>{l10n(meta.error)}</FormFeedback>}
    </FormGroup>
  );
}
