import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageLayout from './views/PageLayout';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/argon-dashboard-react.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/page" render={props => <PageLayout {...props} />} />
        <Redirect from="/" to="/page/home" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
