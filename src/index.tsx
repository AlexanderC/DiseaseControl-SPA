// if needed we can partial import
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppComponent } from "./app.component";
import { I18nProvider } from "./i18n/i18n.service";
import "./index.css";
import { store } from "./store";

ReactDOM.render(
  <I18nProvider>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </ReduxProvider>
  </I18nProvider>,
  document.getElementById("root")
);
