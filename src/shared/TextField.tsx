import React from "react";
import { useFormatMessage } from "./useFormatMessage";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { FieldRenderProps } from "react-final-form";

export function TextField(
  props: FieldRenderProps<string | undefined, HTMLInputElement>
) {
  const { input, meta, ...rest } = props;
  const l10n = useFormatMessage();
  return (
    <FormGroup>
      <Label>{l10n(rest.label)}</Label>
      <Input
        {...(input as any)}
        {...rest}
        invalid={!!meta.error && meta.touched}
      />
      {meta.error && meta.touched && (
        <FormFeedback valid={false}>{l10n(meta.error)}</FormFeedback>
      )}
    </FormGroup>
  );
}
