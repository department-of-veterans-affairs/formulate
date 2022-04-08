import React from 'react';
import ReactDOM from 'react-dom';

import {
  TextField,
  CheckboxField,
  DebuggerView,
  Page,
  Router,
} from '@department-of-veterans-affairs/va-forms-system-core';

import { Link, Route } from 'react-router-dom';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void defineCustomElements();

const App = () => (
  <Router basename="multipage-form">
    <Page title="Example form" path="/one">
      <TextField name="foo" label="Example" required />
      <DebuggerView />
    </Page>

    <Page title="Second page" path="/two">
      <CheckboxField name="bar" label="Do you have pets?" required />
      <DebuggerView />
    </Page>

    {/* This Route is last because a Switch will render whichever component */}
    {/* is the first to match a path, and a `/` would be a match for any page */}
    {/* https://reactrouter.com/web/guides/quick-start */}
    <Route path="/">
      <Link to="one">Page one</Link>
      <br />
      <Link to="two">Page two</Link>
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
