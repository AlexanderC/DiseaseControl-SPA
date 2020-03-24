import { Key } from "./useFormatMessage";

export function required(value: string | undefined): Key | undefined {
  return value ? undefined : "login.inputError";
}
