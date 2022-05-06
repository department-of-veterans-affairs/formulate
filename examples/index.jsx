import React from 'react';
import ReactDOM from 'react-dom';
import FormApp from './multi-page';
import ChapterForm from './chapter-form/index';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import { Link, Route, Routes } from 'react-router-dom';
void defineCustomElements();

const initialValues = {
  firstName: '', 
  lastName: '', 
  email: '', 
  street: '', 
  streetTwo: '', 
  streetThree: '', 
  state: '', 
  zipcode: ''
};

const Main = () => {
  return (
    <>
      <FormApp basename="/" initialValues={ initialValues } />

      <ChapterForm basename="/" initialValues={ initialValues } />
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));
