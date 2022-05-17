import React from 'react';
import { useFormikContext, Form } from 'formik';
import { useNavigate, Link, To } from 'react-router-dom';
import { PageProps, IFormData } from './types';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const { values, submitForm } = useFormikContext();
  const formValues = values as IFormData;

  const navigate = useNavigate();

  return (
    <div>
      <h3>{props.title}</h3>
      <Form>
        {props.children}

        {props.prevPage && (
          <button
            className="btn"
            onClick={(event) => {
              event.preventDefault();
              void submitForm();
              navigate(props.prevPage as To);
            }}
          >
            {' '}
            Previous
          </button>
        )}

        {props.nextPage && (
          <button
            className="btn"
            onClick={(event) => {
              event.preventDefault();
              void submitForm();
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
