/* global CryptoJS, logger */
import React, { useEffect } from 'react';
// import { Link, Switch, Route, Redirect, withRouter, useParams, useLocation, useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, } from '@material-ui/core';
//=========================================================================
const TopBar = (props) => {
  const useStore = props.useStore;
  //========================================================================
  // const { themeStore, paramStore, uiStore, accountStore } = useCommonStore();
  const { paramStore } = useStore();
  //========================================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  useEffect(() => {});
  //========================================================================
  useEffect(() => {}, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <AppBar className={clsx(props.classes.appbarTop, {})}>
        <Toolbar className={clsx(props.classes.toolbar)}>
          <div className={clsx(props.classes.titleBox)} flexGrow={1}>
            <Typography variant='title' className={clsx(props.classes.titleTypography)}>{paramStore.queryParams.servicePath?paramStore.queryParams.servicePath:''}</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
  appbarTop: {
    position: 'fixed',
    margin: 0,
    padding: 0,
    background: 'none',
    transition: theme.transitions.create(['margin', 'width', 'backgroundColor'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_LG)]: {
      // backgroundColor:'black',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_MD)]: {
      // backgroundColor:'green',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      // backgroundColor:'blue',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      position: 'static',
      // backgroundColor:'red',
    },
    zIndex: 2000
  },
  toolbar: {
    backgroundColor: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_DARK,
    minHeight: theme.spacing(parseInt(process.env.THEME_HEIGHT_TOPBAR,10)),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      
    },
  },
  titleBox: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  titleTypography: {
    display: 'inline-block',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontSize: '1.2em',
  },
  signin: {
    color: '#fff',
  },
  userName: {
    display: 'inline-block',
    padding: '0 10px'
  }
});
//=========================================================================
// export default withRouter(connect()(withStyles(styles)(TopBar)));
export default withStyles(styles,{withTheme:true})(TopBar);
