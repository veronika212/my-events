import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { store } from './store/store';
import App from './App';
import LandingPage from './pages/landing-page/LandingPage';
import EventDetail from './pages/event-detail/EventDetail';
import EventForm from './components/event-form/EventForm';
import registerServiceWorker from './registerServiceWorker';

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact={true} path="/" component={LandingPage} />
          <Route exact={true} path="/event/create" component={EventForm} />
          <Route exact={true} path="/event/:id" component={EventDetail} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
