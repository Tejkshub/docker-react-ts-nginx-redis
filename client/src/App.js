import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Fib from './screens/Fib';

export default () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Fib} />
      </Router>
    </div>
  );
};
