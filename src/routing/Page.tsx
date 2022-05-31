import React, { useContext, useEffect } from 'react';
import { useFormikContext, Form } from 'formik';
import { useNavigate, To, useLocation } from 'react-router-dom';
import { PageProps, IFormData } from './types';
import { RouterContext } from './RouterContext';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const { values } = useFormikContext();
  const formValues = values as IFormData;
  const { listOfRoutes, updateRoute } = useContext(RouterContext);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  useEffect(
    () =>
      updateRoute(
        currentLocation.pathname !== '' ? currentLocation.pathname : '/'
      ),
    [currentLocation]
  );

  return (
    <div>
      <h3>{props.title}</h3>
      <Form>
        {props.children}

        {props.prevPage && (
          <button
            className="btn prev"
            onClick={(event) => {
              event.preventDefault();
              navigate(props.prevPage as To);
            }}
          >
            {' '}
            Previous
          </button>
        )}

        {props.nextPage && (
          <button
            className="btn next"
            onClick={(event) => {
              event.preventDefault();
              navigate(props.nextPage as To);
            }}
          >
            {' '}
            Next
          </button>
        )}
      </Form>
    </div>
  );
}
