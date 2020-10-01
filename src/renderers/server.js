import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Homepage from 'components/layouts/Homepage';
import AdminPage from 'components/layouts/AdminPage';
import { StaticRouter } from 'react-router-dom';


export async function serverRenderer(admin = false, url) {
  const initialData = {
    appName: 'Luggage Care Restaurant',
  };

  const pageData = {
    title: `${initialData.appName}`,
    admin
  };

  const context = {};

  return Promise.resolve({
    initialData,
    initialMarkup: admin
    ? ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <AdminPage />
      </StaticRouter>)
    : ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <Homepage mobile={false} />
      </StaticRouter>),
    pageData,
  });
}
