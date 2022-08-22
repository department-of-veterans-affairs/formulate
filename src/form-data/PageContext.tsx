import React, { useState } from 'react';
import { useLocation } from 'react-router-dom-v5-compat';
import { IPageContext, PageContextProps, PageObject } from './types';

const PageContextInitialValues = {
  listOfPages: [],
  setListOfPages: (pages: PageObject[]) => null,
  currentPath: '',
};

export const PageContext = React.createContext<IPageContext>(
  PageContextInitialValues
);

export function PageContextProvider(props: PageContextProps): JSX.Element {
  const [listOfPages, setListOfPages] = useState<PageObject[]>([]);
  const currentLocation = useLocation();

  const updatePages = (pages: PageObject[]) => {
    setListOfPages(pages);
  };

  return (
    <PageContext.Provider
      value={{
        listOfPages: listOfPages,
        setListOfPages: updatePages,
        currentPath: currentLocation.pathname,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
}
