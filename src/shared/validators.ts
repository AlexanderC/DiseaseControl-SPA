import { Key } from "../i18n/i18n.service";

export function required(value: string | undefined): Key | undefined {
  return value ? undefined : "login.inputError";
}

export function getRequiredValidation(errorMessage: Key) {
  return function (value: string | undefined): Key | undefined {
    return value ? undefined : errorMessage;
  };
}
