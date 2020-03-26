import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  useIntl,
} from "react-intl";
import messagesRO from "./l10n/ro.json";
import messagesRU from "./l10n/ru.json";

const cache = createIntlCache();

const languages = {
  ro: createIntl({ locale: "ro", messages: messagesRO }, cache),
  ru: createIntl({ locale: "ru", messages: messagesRU }, cache),
};

type ChangeLanguage = (lng: keyof typeof languages) => void;

type I18n = {
  changeLanguage: ChangeLanguage;
};

const I18nContext = React.createContext<I18n | undefined>(undefined);

export function I18nProvider(props: PropsWithChildren<{}>) {
  // TODO: add language detector
  // https://github.com/i18next/i18next-browser-languageDetector
  // https://github.com/i18next/i18next/blob/master/src/LanguageUtils.js
  const [intl, setIntl] = useState(languages.ro);
  const i18n = useMemo<I18n>(
    () => ({
      changeLanguage: (lng) => setIntl(languages[lng]),
    }),
    []
  );

  return (
    <I18nContext.Provider value={i18n}>
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}

// allowed keys for localization
export type Key = keyof typeof messagesRU & keyof typeof messagesRO;

export function useFormatMessage() {
  const { formatMessage } = useIntl();
  return useCallback((id: Key) => formatMessage({ id }), [formatMessage]);
}
