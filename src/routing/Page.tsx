import React from 'react';

import { Formik, Form } from 'formik';
import { Link, Route } from 'react-router-dom';

type PageProps = {
  children: JSX.Element[];
  title: string;
  path: string;
};

export default function Page(props: PageProps): JSX.Element {
  const handleSubmit = () => {
    console.log('submiting');
  };

  return (
    <Route path={props.path}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>{props.title}</h1>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>{props.children}</Form>
        </Formik>
      </div>
    </Route>
  );
}
