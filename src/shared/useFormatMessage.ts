import { useIntl } from "react-intl";
import RO from "../i18n/ro.json";
import RU from "../i18n/ru.json";
import { useCallback } from "react";

// allowed keys for localization
export type Key = keyof typeof RO & keyof typeof RU;

export function useFormatMessage() {
  const { formatMessage } = useIntl();
  return useCallback((id: Key) => formatMessage({ id }), [formatMessage]);
}
