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
  zipcode: '',
  phone: '',
  ssn: ''
};

const Main = () => {
  return (
    <>
      <ChapterForm basename="/" initialValues={ initialValues } />
      {/* <FormApp basename="/" initialValues={ initialValues } /> */}
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));
