import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Formik, FormikConfig, FormikProps } from 'formik';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const buildRenderForm = (
  initialValues: Record<string, unknown> = {}
) => {
  type Values = typeof initialValues;

  // Got this from Formik's Field tests
  const renderForm = (
    ui?: React.ReactNode,
    props?: Partial<FormikConfig<Values>>
  ) => {
    let injected: FormikProps<Values>;
    const { rerender, ...rest } = render(
      <Formik onSubmit={noop} initialValues={initialValues} {...props}>
        {(formikProps: FormikProps<Values>) =>
          (injected = formikProps) && ui ? ui : null
        }
      </Formik>
    );

    return {
      getFormProps: (): FormikProps<Values> => {
        return injected;
      },
      ...rest,
      rerender: () =>
        rerender(
          <Formik onSubmit={noop} initialValues={initialValues} {...props}>
            {(formikProps: FormikProps<Values>) =>
              (injected = formikProps) && ui ? ui : null
            }
          </Formik>
        ),
    };
  };
  return renderForm;
};

export const changeValue = async (
  el:
    | HTMLInputElement
    | HTMLVaTextInputElement
    | HTMLVaNumberInputElement
    | HTMLVaSelectElement,
  value: string | boolean,
  eventName = 'vaChange'
): Promise<void> => {
  if (typeof value === 'string') {
    el.value = value;
  } else if (typeof value === 'boolean') {
    (el as HTMLInputElement).checked = value;
  }

  await waitFor(() => {
    if (fireEvent.hasOwnProperty(eventName)) {
      fireEvent[eventName](el, { value });
    } else {
      fireEvent(el, new CustomEvent(eventName));
    }
  });
};
