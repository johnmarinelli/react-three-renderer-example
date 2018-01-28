/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Perf from 'react-addons-perf';
import createHashHistory from 'history/createHashHistory';

import PageBrowser from './pages/PageBrowser';
const customHistory = createHashHistory();
window.Perf = Perf;

const App = () => (
  <Router history={customHistory}>
    <div>
      <Route path="/:slug?" component={PageBrowser} />
    </div>
  </Router>
);

export default App;
