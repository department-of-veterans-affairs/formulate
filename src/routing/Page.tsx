import React, { useContext, useEffect } from 'react';
import { Form, FormikContextType, useField, useFormikContext } from 'formik';
import { useNavigate, To, useSearchParams } from 'react-router-dom';
import { PageProps } from './types';
import { RouterContext } from './RouterContext';
import { forEach, isArray } from 'lodash';

const validatePage = (
  children: Element[],
  state: FormikContextType<unknown>
) => {
  const requiredChildren = getChildrenFields(children);
  const formikStateKeys = getFormikStateKeys(state);

  if (requiredChildren.length > 0) {
    requiredChildren.forEach((childField) => {
      Object.entries(childField.props).map(([key, value]) => {
        const strippedValue = String(value).split('.')[0];
        if (key === 'name' || key === 'id') {
          if (formikStateKeys.indexOf(strippedValue) > -1) {
            console.log(state.errors);
            return false;
          }
        }
      });
    });
  } else {
    console.log('When does this happen');
    return true;
  }
};

const getFormikStateKeys = (state: FormikContextType<unknown>) => {
  const stateKeys: string[] = [];
  Object.entries(state).find(([key, value]) => {
    if (key === 'values') {
      if (typeof value === 'object') {
        Object.keys(value).map((v) => {
          stateKeys.push(v);
        });
      }
    }
  });

  return stateKeys;
};

const getChildrenType = (childElement: JSX.Element) => {
  const { props } = childElement;

  if (props?.type?.name === 'RadioGroup') {
    // does it have a name? then its probably a form element
  }
  return null;
};

const getChildrenFields = (
  children: (Element | JSX.Element)[],
  buffer: JSX.Element[] = []
) => {
  const requiredChildFields: JSX.Element[] = [];

  if (children.length > 0) {
    children.forEach((child) => {
      if (child && typeof child.props === 'object') {
        const childPropsKeys = Object.keys(child.props);

        if (childPropsKeys.indexOf('required') > -1) {
          requiredChildFields.push(child);
        }
      }
    });
  }

  return requiredChildFields;
};

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const state = useFormikContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');
  const { nextRoute, previousRoute } = useContext(RouterContext);

  return (
    <div>
      <h3>{props.title}</h3>
      <Form
        onSubmit={(e) => {
          console.log(state.touched['veteranServedUnderAnotherName']);
          if (!state.touched['veteranServedUnderAnotherName'] ) {
            state.setTouched({
              ...state.touched,
              veteranServedUnderAnotherName: true,
            });
          } else if (
            state.isSubmitting === false &&
            Object.keys(state?.errors).length === 0
          ) {
            navigate(nextRoute as To);
          }
          e?.preventDefault();
        }}
      >
        {props.children}

        {editPage && (
          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                navigate('/review-and-submit' as To);
              }}
              className="btn next"
            >
              Back to Review page
            </button>
          </div>
        )}
        {previousRoute && (
          <button
            className="btn usa-button-primary prev"
            onClick={(event) => {
              event.preventDefault();
              navigate(previousRoute as To);
            }}
          >
            <i className="fas fa-angle-double-left"></i> Previous
          </button>
        )}

        {nextRoute && (
          <button
            className="btn usa-button-primary next"
            disabled={state.isSubmitting}
            type="submit"
            onClick={(event) => {
              // const startingBuffer: (Element | JSX.Element)[] = isArray(props.children)? props.children : [props.children];
              // const fields = getChildrenFields(startingBuffer);
              // let fieldNames: string[] = [];
              // fields.forEach(field => {
              //   if (Object.keys(field).length > 0) {
              //     fieldNames = [...fieldNames, field.props.name]
              //   }
              // });
              // fieldNames.forEach(fieldName => {
              //   const fieldP = state.getFieldProps(fieldName);
              //   state.setFieldTouched(fieldName);
              // });
              // if (Object.keys(state?.errors).length === 0) {
              // }
              // state.setTouched(true);
              // const setTouched = state.setTouched({
              //   'veteranServedUnderAnotherName': true},
              //   true
              // );
              // if (Object.keys(state?.errors).length === 0) {
              // }
            }}
          >
            Next <i className="fas fa-angle-double-right"></i>
          </button>
        )}
      </Form>
    </div>
  );
}
