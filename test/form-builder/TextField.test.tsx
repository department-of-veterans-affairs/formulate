/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import TextField from '../../src/form-builder/TextField';

import { buildRenderForm, changeValue } from '../utils';

const renderForm = buildRenderForm();

const getInput = (container: HTMLElement) => {
  const input = container.querySelector('va-text-input') as HTMLInputElement;
  if (!input) throw new Error('No va-text-input found');
  return input;
};

describe('Form Builder - TextField', () => {
  test('renders', () => {
    const { container } = renderForm(
      <TextField name="thing" label="The Thing" />
    );
    const input = container.querySelector('va-text-input');
    expect(input?.getAttribute('label')).toEqual('The Thing');
    expect(input?.getAttribute('name')).toEqual('thing');
  });

  test('renders initial value', () => {
    const rf = buildRenderForm({ thing: 'asdf' });
    const { container } = rf(<TextField name="thing" label="The Thing" />);
    const input = container.querySelector('va-text-input');
    expect(input?.getAttribute('value')).toEqual('asdf');
  });

  test.skip('renders the default "required" validation error message', () => {
    const { container, getFormProps } = renderForm(
      <TextField name="thing" label="The Thing" required />
    );
    const input = container.querySelector('va-text-input');
    expect(input?.getAttribute('error')).toEqual('The Thing');
  });

  test('renders a custom "required" validation error message', () => {});

  /**
   * I'm not sure what to do here. When the event fires
   * - It's caught by the React wrapper
   *   - I verified this by changing the event handler to log something
   * - It runs the validation
   *   - I added a console.log() to the validation function in TextField that
   *     only fires after the event is dispatched
   *
   * Additionally, it works as expected in my sandbox project. I just don't know
   * how to test that it updates the state. I expect it's something to do with
   * the helper.
   */
  test('updates the formik state', async () => {
    const rf = buildRenderForm({ thing: 'foo' });
    const { container, getFormProps } = rf(
      <TextField name="thing" label="The Thing" />
    );
    const input = getInput(container);
    await changeValue(input, 'asdf');
    expect(getFormProps().values).toEqual({ thing: 'asdf' });
  });
});
