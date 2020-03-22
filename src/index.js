import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
// if needed we can partial import
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import messages_ro from './i18n/ro.json';
import messages_ru from './i18n/ru.json';

import './index.css';

const language = 'ro';

const messages = {
  'ro': messages_ro,
  'ru': messages_ru
}

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App />
  </IntlProvider>
, document.getElementById('root'));
