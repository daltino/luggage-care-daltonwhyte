import React from 'react';
import ReactDOM from 'react-dom';

import Homepage from 'components/layouts/Homepage';
import AdminPage from 'components/layouts/AdminPage';
import { BrowserRouter } from "react-router-dom";


import '../styles/index.scss';

window.__R_DATA.pageData.admin
?
  ReactDOM.hydrate(
    <BrowserRouter><AdminPage /></BrowserRouter>,
    document.getElementById('root')
  )
:
  ReactDOM.hydrate(
    <Homepage mobile={window.__R_DATA.initialData} />,
    document.getElementById('root')
  )

