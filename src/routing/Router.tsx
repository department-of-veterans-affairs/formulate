import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { RouterProps } from './types';

import FormTitle from '../form-layout/FormTitle';
import FormFooter from '../form-layout/FormFooter';
import { RouterContextProvider } from './RouterContext';
import RouterProgress from './RouterProgress';

/**
 * Manages form pages as routes
 * Parent formik insance is rendered here
 * @beta
 */
export default function FormRouter(props: RouterProps): JSX.Element {
  const initialValues = props.formData;
  const [route, updateRoute] = useState('/');

  return (
    <div className="row">
      <div className="usa-width-two-thirds medium-8 columns">
        <BrowserRouter basename={props.basename}>
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              // This is where data is transformed if a custom transformForSubmit function is provided.
              // The wrapping onSubmit function will need updated in the future if the default case needs updated when users don't pass a transformForSubmit function
              if (props.transformForSubmit) {
                props.transformForSubmit(values, actions);
              }

              // you would want to set it to actually submit something if last route
              actions.setTouched({});
              actions.setSubmitting(false);
            }}
          >
            <RouterContextProvider routes={props.children}>
              <FormTitle title={props.title} subTitle={props?.subtitle} />
              <RouterProgress />
              <Routes>{props.children}</Routes>
              <FormFooter />
            </RouterContextProvider>
          </Formik>
        </BrowserRouter>
      </div>
    </div>
  );
}
