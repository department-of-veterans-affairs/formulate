import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FieldProps } from './types';
import { validator } from '../utils/validation';
import { VaCheckbox } from 'web-components/react-bindings';

type CheckboxProps = FieldProps<string> & { checked: boolean };

const CheckboxField = (props: CheckboxProps): JSX.Element => {
  const withValidation = { ...props, validate: validator(props) };
  const [field, meta, helpers] = useField(
    withValidation as FieldHookConfig<boolean>
  );
  const id = props.id || props.name;
  console.log(field);

  return (
    <VaCheckbox
      id={id}
      label={props.label}
      required={!!props.required}
      {...field}
      onVaChange={(e: CustomEvent) => {
        helpers.setValue((e?.target as HTMLInputElement).checked);
      }}
      error={(meta.touched && meta.error) || undefined}
    />
  );
};

export default CheckboxField;
