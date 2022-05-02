import React from 'react';
import { IntroductionPage, Page } from '@department-of-veterans-affairs/va-forms-system-core';

export default function FormIntroductionPage() {
    return (
        <>
            <Page title="Introduction Page" nextPage="page-one">
                <IntroductionPage />
            </Page>
        </>
    )
}