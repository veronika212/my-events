import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { store } from './store/store';
import App from './App';
import LandingPage from './pages/landing-page/LandingPage';
import EventDetail from './pages/event-detail/EventDetail';

import registerServiceWorker from './registerServiceWorker';
import Users from './pages/users/Users';
import UserDetail from './pages/user-detail/UserDetail';

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact={true} path="/" component={LandingPage} />
          <Route exact={true} path="/event/:id" component={EventDetail} />
          <Route exact={true} path="/users" component={Users} />
          <Route exact={true} path="/user/:id" component={UserDetail} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
