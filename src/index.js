import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './index.css';
import App from './App';
import messages_ro from './i18n/ro.json';
import messages_ru from './i18n/ru.json';

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
