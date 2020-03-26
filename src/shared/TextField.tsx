import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useFormatMessage } from "../i18n/i18n.service";

export function TextField(props: FieldRenderProps<string | undefined, HTMLInputElement>) {
  const { input, meta, ...rest } = props;
  const l10n = useFormatMessage();
  return (
    <FormGroup>
      <Label>{l10n(rest.label)}</Label>
      <Input {...(input as any)} {...rest} invalid={!!meta.error && meta.touched} />
      {meta.error && meta.touched && <FormFeedback valid={false}>{l10n(meta.error)}</FormFeedback>}
    </FormGroup>
  );
}
