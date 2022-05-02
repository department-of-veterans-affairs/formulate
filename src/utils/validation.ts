import { FieldProps } from '../form-builder/types';
import { getMessage } from './i18n';
import { range } from 'lodash';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type ValidationFunctionResult<T> =
  | void
  | undefined
  | string
  | Promise<unknown>
  | T;
export type ValidationFunction<T> = (
  value: T,
  props: FieldProps<T>
) => ValidationFunctionResult<T>;

export const chainValidations = <T>(
  props: FieldProps<T>,
  validations: ValidationFunction<T>[]
): ((value: T) => ValidationFunctionResult<T>) => {
  return (value: T) => {
    // Return the error message from the first validation function that fails.
    const errorMessage = validations
      .map((v) => v(value, props))
      .filter((m) => m)[0];
    if (errorMessage) return errorMessage;

    // None of the built-in validation functions failed; run the validate
    // function passed to the component.
    return props.validate ? props.validate(value) : undefined;
  };
};

export const required = <T>(
  value: T,
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (props.required && !value) {
    const errorMessage =
      typeof props.required === 'string'
        ? props.required
        : getMessage('required.default');
    return errorMessage;
  }

  return props.validate ? props.validate(value) : undefined;
};

export const requiredValue = <T>(
  value: T,
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (props.required && !Object.values(value).find((v: boolean) => v)) {
    const errorMessage =
      typeof props.required === 'string'
        ? props.required
        : getMessage('required.default');
    return errorMessage;
  }

  return props.validate ? props.validate(value) : undefined;
};

/**
 * This function is used to validate an email address, while returning error messages if an email
 * is invalid. The logic is as follows:
 *
 *  1. Ensure the email address is a string. If it's not, return an error message
 *  2. Ensure that one of the following is true, else output an error message:
 *    2a. The field is not required -AND- the field has no entered value
 *    2b. The value in the field matches an email validation regular expression
 *
 * @param emailString
 * @param props
 */
export const isValidEmail = <T>(
  emailString: T,
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (typeof emailString !== 'string') {
    return 'Error: Email is not the correct type'; // This shouldn't happen
  }

  // Comes from StackOverflow: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const isValid =
    (!props.required && !emailString) || emailRegex.test(emailString);

  return isValid
    ? ''
    : 'Please enter an email address using this format: X@X.com';
};

/**
 * Conditions for valid SSN from the original 1010ez pdf form:
 * '123456789' is not a valid SSN
 * A value where the first 3 digits are 0 is not a valid SSN
 * A value where the 4th and 5th digits are 0 is not a valid SSN
 * A value where the last 4 digits are 0 is not a valid SSN
 * A value with 3 digits, an optional -, 2 digits, an optional -, and 4 digits is a valid SSN
 * 9 of the same digits (e.g., '111111111') is not a valid SSN
 */
export const isValidSSN = <T>(
  ssnString: T,
  props: FieldProps<T>
): ValidationFunctionResult<T> => {
  if (typeof ssnString !== 'string') {
    return 'Error: ssnString is not the correct type'; // This shouldn't happen
  }

  if (
    ssnString === '123456789' ||
    ssnString === '123-45-6789' ||
    /^0{3}-?\d{2}-?\d{4}$/.test(ssnString) ||
    /^\d{3}-?0{2}-?\d{4}$/.test(ssnString) ||
    /^\d{3}-?\d{2}-?0{4}$/.test(ssnString)
  ) {
    return '';
  }

  const noBadSameDigitNumber = range(0, 10).every((i) => {
    const sameDigitRegex = new RegExp(`${i}{3}-?${i}{2}-?${i}{4}`);
    return !sameDigitRegex.test(ssnString);
  });

  if (!noBadSameDigitNumber) {
    return 'Invalid SSN';
  }

  const isValid =
    /^\d{9}$/.test(ssnString) || /^\d{3}-\d{2}-\d{4}$/.test(ssnString);
  return isValid ? '' : 'Invalid SSN';
};
