import React from 'react';
import {
  DateField,
  Page,
  TextField,
  SelectField,
} from '@department-of-veterans-affairs/va-forms-system-core';
import { useFormikContext } from 'formik';
import { isBeforeDate } from './utils';
import { VaButton } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

export default function MilitaryServiceHistory(props) {
  const state = useFormikContext();

  const { from, to } = state.values.toursOfDuty[0].dateRange;

  return (
    <>
      <Page
        {...props}
        fieldNames={[
          'toursOfDuty', // this needs to be updated to allow multiple field values
        ]}
      >
        <div className="usa-alert usa-alert-warning background-color-only">
          <span>
            <strong>Note:</strong> If you would rather upload a DD214 than enter
            dates here, you can do that later in the form.
          </span>
        </div>
        <h3>Service Periods</h3>
        <DateField
          name="toursOfDuty[0].dateRange.from"
          label="Service start date"
        />

        <DateField
          name="toursOfDuty[0].dateRange.to"
          label="Service end date"
          validate={isBeforeDate(
            to,
            from,
            'End of service must be after start of service'
          )}
        />

        <SelectField
          name="toursOfDuty[0].serviceBranch"
          label="Branch of service"
        >
          <option>Air Force</option>
          <option>Army</option>
          <option>Coast Guard</option>
          <option>Marine Corps</option>
          <option>Navy</option>
          <option>Space Force</option>
        </SelectField>

        <TextField name="toursOfDuty[0].rank" label="Rank" />
        <TextField name="toursOfDuty[0].serviceNumber" label="Service number" />
        <TextField name="toursOfDuty[0].placeOfEntry" label="Place of entry" />
        <TextField
          name="toursOfDuty[0].placeOfSeparation"
          label="Place of separation"
        />
        <VaButton disabled secondary text="Add another Service Period" />

        <br />
      </Page>
    </>
  );
}
