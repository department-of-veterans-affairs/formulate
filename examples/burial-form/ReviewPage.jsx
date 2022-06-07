import React from 'react';
import { useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { VaOnThisPage } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

/**
 * Transforms fields value into value that is more readable
 * @param {boolean | object | string} field object value
 * @param {string} key object key name
 *
 * @beta
 */
const transformFieldValue = (key, field) => {
  if ( field.value === 'true' | field.value === true ) {
    return 'Yes';
  }
  if (field.value === 'false' | field.value === false ) {
    return 'No';
  }
  if (["from", "to", "veteranDateOfBirth", "deathDate", "burialDate"].indexOf(key) > -1) {
    const date = new Date(field.value);
    return date.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (["amountIncurred", "amountGovtContribution"].indexOf(key) > -1) {
    return `$${field.value}`;
  }
  return field.value;
}

/**
 * Loops through field objects and adds JSX to a buffer
 * to be rendered later
 * @param {objects} fields object value
 * @param {number} rank level number of recursion
 *
 * @beta
 */
const bufferFields = (fields, rank = 0) => {
  let buffer = [];
  for (const [key, field] of Object.entries(fields)) { 
    buffer.push(recurseField(key, field, rank));
  }
  return buffer;
}

/**
 * Recurses through field and either returns value or
 * uses bufferField to loop through object value
 * @param {string} key object key name
 * @param {boolean | object | string} field object value
 * @param {number} rank level number of recursion
 *
 * @beta
 */
const recurseField = (key, field, rank = 0) => {
  if (field.value === "" | field.value === 0 | field.value === null | field.value === undefined) return;
  const fieldLabel = field.label && <label className='vads-u-margin-top--1 review-page--page-info--label-text'>{field.label}:</label>

  if ((typeof field.value) === 'object') {
    return (<div className={`level-${rank}-field-${key}`} key={`level-${rank}-field-${key}`}> {bufferFields(field.value, rank+1)}</div>)
  }
  else {
    return (
      <div className={`level-${rank}-field-${key}`} key={`level-${rank}-field-${key}`}> 
        {fieldLabel} 
        <span className={`review-page--page-info--value-text field-value ${(rank > 0 && ` field-value-level-${rank}`)}`}> { transformFieldValue(key, field) }</span>
      </div>
    );
  }
}

export default function ReviewPage(props) {
  const state = useFormikContext();

  // mockup some data to review formik context
  const pageData = {
    pages: [
      {
        title: 'Claimant information',
        id: 'claimant-information',
        pageUrl: '/claimant-information',
        fields: {
          "fullName": {
            value: {
              first: {
                label: "First",
                value: state.values?.claimantFullName?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.claimantFullName?.middle
              },
              last: {
                label: "Last",
                value: state.values?.claimantFullName?.last
              }
            }
          },
          "relationship": {
            label: "Relationship to deceased Veteran",
            value: state.values?.relationship?.type
          }
        }
      },
      {
        title: 'Deceased Veteran Information',
        id: 'veteran-information',
        pageUrl: '/veteran-information',
        fields: {
          "veteranFullName": {
            label: "Veteran Name",
            value: {
              first: {
                label: "First",
                value: state.values?.veteranFullName?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.veteranFullName?.middle
              },
              last: {
                label: "Last",
                value: state.values?.veteranFullName?.last
              }
            }
          },
          "veteranSocialSecurityNumber": {
            label: "Social Security Number",
            value: state.values?.veteranSocialSecurityNumber
          },
          "vaFileNumber": {
            label: "File Number",
            value: state.values?.vaFileNumber
          },
          "veteranDateOfBirth": {
            label: "Date of Birth",
            value: state.values?.veteranDateOfBirth
          },
          "placeOfBirth": {
            label: "Place of Birth",
            value: state.values?.placeOfBirth
          }
        }
      },
      {
        title: 'Deceased Veteran Information: Death and Burial',
        id: 'veteran-information-burial',
        pageUrl: '/veteran-information/burial',
        fields: {
          "deathDate": {
            label: "Date of Death",
            value: state.values?.deathDate
          },
          "burialDate": {
            label: "Date of Burial",
            value: state.values?.burialDate
          },
          "locationOfDeath.location": {
            label: "Location of Death",
            value: state.values?.locationOfDeath.location
          },
          "locationOfDeath.other": {
            label: "If other, please specify",
            value: state.values?.locationOfDeath.other
          }

        }
      },
      {
        title: 'Military Service History',
        id: 'military-history-service-periods',
        pageUrl: '/military-history/service-periods',
        fields: {
          "toursOfDuty": {
            value: {
              "dateRange": {
                value: {
                  "from": {
                    label: "Service start date",
                    value: state.values?.toursOfDuty[0]?.dateRange.from
                  },
                  "to": {
                    label: "Service end date",
                    value: state.values?.toursOfDuty[0]?.dateRange.to
                  }
                }
              },
              "serviceBranch": {
                label: "Branch of service",
                value: state.values?.toursOfDuty[0]?.serviceBranch
              },
              "rank": {
                label: "Rank",
                value: state.values?.toursOfDuty[0]?.rank
              },
              "serviceNumber": {
                label: "Service number",
                value: state.values?.toursOfDuty[0]?.serviceNumber
              },
              "placeOfEntry": {
                label: "Place of entry",
                value: state.values?.toursOfDuty[0]?.placeOfEntry
              },
              "placeOfSeparation": {
                label: "Place of separation",
                value: state.values?.toursOfDuty[0]?.placeOfSeparation
              }
            }
          }
        }
      },
      {
        title: 'Military Service History: Previous Names',
        id: 'military-history-previous-names',
        pageUrl: '/military-history/previous-names',
        fields: {
          "previousNames" : {
            label: "Did the Veteran serve under another name?", 
            value: {
              first: {
                label: "First",
                value: state.values?.previousNames[0]?.first
              },
              middle: {
                label: "Middle",
                value: state.values?.previousNames[0]?.middle
              },
              last: {
                label: "Last",
                value: state.values?.previousNames[0]?.last
              }
            }
          }
        }
      },
      {
        title: 'Benefits Selection',
        id: 'benefits-selection',
        pageUrl: '/benefits/selection',
        fields: {
          "burialAllowance": {
            label: "Burial Allowance",
            value: state?.values?.benefitsSelection?.burialAllowance
          },
          "plotAllowance": {
            label: "Plot or interment allowance",
            value: state?.values?.benefitsSelection?.plotAllowance
          },
          "transportation": {
            label: "Transportation expenses",
            value: state?.values?.benefitsSelection?.transportation
          },
          "amountIncurred": {
            label: "Transportation amount incurred",
            value: state?.values?.amountIncurred
          }
        },
      },
      {
        title: 'Benefits Selection: Type of Burial Allowance',
        id: 'benefits-burial-allowance',
        pageUrl: '/benefits/burial-allowance',
        fields: {
          "burialAllowanceRequested": {
            label: "Type of Burial allowance requested",
            value: state?.values?.burialAllowanceRequested
          }
        },
      },
      {
        title: 'Benefits Selection: Plot or interment allowance',
        id: 'benefits-plot-allowance',
        pageUrl: '/benefits/plot-allowance',
        fields: {
          "placeOfRemains": {
            label: "Place of burial or deceased Veteran’s remains",
            value: state?.values?.placeOfRemains
          },
          "federalCemetery": {
            label: "Was the Veteran buried in a national cemetary, or one owned by the federal government?",
            value: state?.values?.federalCemetery
          },
          "stateCemetery":{
            label: "Was the Veteran buried in a state veteran’s cemetary?",
            value: state?.values?.stateCemetery
          },
          "govtContributions": {
            label: "Did a federal/state government or the Veteran’s employer contribute to the burial?  (Not including employer life insurance)",
            value: state?.values?.govtContributions
          },
          "amountGovtContribution": {
            label: "Amount of government or employer contribution",
            value: state?.values?.amountGovtContribution
          }
        },
      },
      {
        title: 'Claimant Contact Information',
        id: 'claimant-contact-information',
        pageUrl: '/claimant-contact-information',
        fields: {
          "claimantAddress": {
            label: "Claimant Address",
            value: {
              "street": {
                value: state?.values?.claimantAddress?.street,
              },
              "street2": {
                value: state?.values?.claimantAddress?.street2,
              },
              "city": {
                value: state?.values?.claimantAddress?.city,
              },
              "country": {
                value: state?.values?.claimantAddress?.country,
              },
              "state": {
                value: state?.values?.claimantAddress?.state,
              },
              "postalCode": {
                value: state?.values?.claimantAddress?.postalCode,
              }
            }
          },
          "claimantPhone": {
            label: "Claimant Phone Number",
            value: state?.values?.claimantPhone,
          }
        },
      },
      // {
      //   title: "Additional information",
      //   id: 'additional-information',
      //   pageUrl: '/additional-information',
      //   fields: {
      //     "transportationReceipts": {
      //       label: "Transportation Receipts?",
      //       value: state?.values?.transportationReceipts,
      //     }
      //   },
      // }
    ]
  }

  return (
    <>
      <article>
        <h1>{props.title}</h1>
        <VaOnThisPage></VaOnThisPage>

        { pageData.pages.map(page => (
          <section id={page.id} key={page.id} className="review-page--page-info">
            <div className='review-page--page-heading vads-u-justify-content--space-between vads-l-row vads-u-border-bottom--1px vads-u-border-color--link-default'>
              <h2 id={page.id} className='vads-u-font-size--h3 vads-u-flex--1 review-page--page-heading--text'>{page.title}</h2>
              <Link to={page.pageUrl+'?edit=true'} className='vads-u-margin-bottom--1p5 review-page--page-heading--link'>Edit</Link>
            </div>

            {bufferFields(page.fields)}
          </section>
        )) }
      </article>
    </>
  )
}