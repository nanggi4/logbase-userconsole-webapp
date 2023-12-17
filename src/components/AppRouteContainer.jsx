/* global */
import React from 'react';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import clsx from 'clsx';
import UserconsoleTheme from './Theme.js';
import TopBar from './TopBar';
import useStore from '../lib/useStore';
//=========================================================================
const HEIGHT_TOPBAR = 40;
//=========================================================================
const AppRouteContainer = (props) => {
  const ServiceWrapperBlock = () => {
    return (
      <React.Fragment>  
        <MuiThemeProvider theme={UserconsoleTheme}>
          <CssBaseline /><style /><span/>
          <TopBar useStore={useStore} />
          <main className={clsx(props.classes.mainContainer)}>
            <span className={clsx(props.classes.mainVersion)} id="mainVersion">v{props.packageVersion}</span>
            <props.application />
          </main>        
        </MuiThemeProvider>
      </React.Fragment>
    );
  };
  return (
    <ServiceWrapperBlock />
  );
};
//=========================================================================
const styles = theme => ({
  disabled: {},
  selected: {},
  mainContainer: {
    width: 'auto',
    display: 'block',
    margin: 0,
    /*padding: theme.spacing(1, 0, 0, 0),*/
    marginTop: 40,
    position: 'relative',
    overflowX: 'hidden'
  },
  mainVersion: {
    position: 'absolute',
    top: 8,
    right: 10,
    fontSize: '0.8rem'
  },
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(AppRouteContainer);