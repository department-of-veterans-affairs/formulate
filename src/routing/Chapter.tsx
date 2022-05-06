import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ChapterProps } from './types';

/**
 * Renders the chapter contents
 *
 * @beta
 */
export default function Chapter(props: ChapterProps): JSX.Element {
  return (
    <div className="chapter">
      {props.children}
      <Outlet />
    </div>
  );
}
