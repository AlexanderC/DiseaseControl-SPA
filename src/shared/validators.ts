import { Key } from "../i18n/i18n.service";

export function required(value: string | undefined): Key | undefined {
  return value ? undefined : "login.inputError";
}

export function getRequiredValidation(errorMessage: Key) {
  return function (value: string | undefined): Key | undefined {
    return value ? undefined : errorMessage;
  };
}

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function getEmailValidation() {
  return function (value: string | undefined): Key | undefined {
    return emailRegExp.test(value || "") ? undefined : "email.error";
  };
}

export function composeValidations(...validations: any[]) {
  return (value: any) => {
    return validations.reduce((fail, validation) => {
      return fail || validation(value);
    }, undefined);
  };
}
