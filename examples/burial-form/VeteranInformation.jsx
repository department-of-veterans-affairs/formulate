import React from 'react';
import {
  DateField,
  FullNameField,
  Page,
  SSNField,
  TextField
} from '@department-of-veterans-affairs/va-forms-system-core';

export default function VeteranInformation(props) {
  return (
    <>
      <Page {...props} nextPage="/" prevPage="/claimant-information">
        <FullNameField name="veteranFullName"
          label="" />
        <SSNField name="veteranSocialSecurityNumber"
          label="Social Security number (must have this or a VA file number)"
          required />
        <TextField name="vaFileNumber"
          label="VA file number (must have this or a Social Security number)"
          required />
        <DateField name="veteranDateOfBirth"
          label="Date of birth"
          required />
        <TextField name="placeOfBirth"
          label="Place of birth (city and state or foreign country)" />
      </Page>
      {/* <DebuggerView /> */}
    </>
  )
}