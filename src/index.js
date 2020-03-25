import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
// if needed we can partial import
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import App from "./App";
import messages_ro from "./i18n/ro.json";
import messages_ru from "./i18n/ru.json";
import store from "./store";

import "./index.css";

const language = "ro";

const messages = {
  ro: messages_ro,
  ru: messages_ru,
};

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById("root")
);
