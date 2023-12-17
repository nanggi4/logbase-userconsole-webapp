import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import AppRouteContainer from './components/AppRouteContainer.jsx';
import UserconsoleApplication from './components/UserconsoleApplication.jsx';
import packageJson from '../package.json';
//=========================================================================
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route>
        <AppRouteContainer 
          application={UserconsoleApplication} 
          packageVersion={packageJson.version}
        />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById(process.env.CONST_REACT_APP_CONTAINER!)
);
//=========================================================================
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();