/* global logger */
import React, { useEffect } from 'react';
import { Switch, Route, withRouter, useParams, useLocation } from 'react-router-dom';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react';
import QueryString from 'query-string';
import UserconsoleTheme from './Theme.js';
import useStore from '../lib/useStore';
import ContentContainer from './ContentContainer';
//====================================================================
// logger.debug(`${process.env.NODE_ENV} logbase !`);
// logger.debug(`UserconsoleApplication::Loaded`);
//====================================================================
const UserconsoleApplication = (props) => {
  const { paramStore, uiStore } = useStore();
  // const refOutWrap = useRef();
  //====================================================================
  useEffect(() => {
    // componentWillunmount
    return () => {};
  }, []);
  //====================================================================
  const RouteBlock = () => {
    paramStore.setStoreValue('location', useLocation());
    paramStore.setStoreValue('queryParams', useParams());
    paramStore.setStoreValue('queryString', QueryString.parse(paramStore.location.search));
    uiStore.setStoreValue('topAccountMenuOpen', false);
    return (
      <ContentContainer useStore={useStore} />
    );
  };
  //====================================================================
  return useObserver(() => (
    <React.Fragment>
      <MuiThemeProvider theme={UserconsoleTheme}>
        <Switch>
          <Route path='/:servicePath' component={withRouter(RouteBlock)}></Route>
          <Route path='/' component={withRouter(RouteBlock)}></Route>
        </Switch>
      </MuiThemeProvider>
    </React.Fragment>
  ));
};
//====================================================================
const styles = theme => ({
  disabled: {},
  selected: {},
});
//====================================================================
export default withStyles(styles, { withTheme: true })(UserconsoleApplication);