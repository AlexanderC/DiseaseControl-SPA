import { Key } from "../i18n/i18n.service";

export function required(value: string | undefined): Key | undefined {
  return value ? undefined : "login.inputError";
}
