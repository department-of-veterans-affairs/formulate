import React from 'react';
import { render } from '@testing-library/react';
import { Route } from 'react-router-dom';
import FormRouter from '../../src/routing/Router';
import FormFooter from '../../src/form-layout/FormFooter';


describe('FormFooter', () => {

  test('Renders footer', () => {
    const { container } = render(
      <FormFooter />
    );
    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });

  test('Renders footer from router', () => {
    const { container } = render(
      <FormRouter basename="/" title="hello world" formData={{firstName: ''}}>
        <Route path="/" element={<div>Hello World</div>} />
      </FormRouter>
    );

    const footerContainer = container.querySelector('.help-footer-box');

    expect(footerContainer).toBeTruthy();
  });
});