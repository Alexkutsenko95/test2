import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import Search from './components/Search'
import Weather from './components/Weather'

const App =() => {

  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Search</Link>
                      </li>
                      <li>
                          <Link to="/locations">Weather list</Link>
                      </li>
                  </ul>
              </nav>
              <Switch>
                  <Route path="/locations">
                      <Weather />
                  </Route>
                  <Route path="/">
                      <Search />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
};

export default App;
