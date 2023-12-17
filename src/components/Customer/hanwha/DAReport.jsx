/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
//=========================================================================
const DAReport = (props) => {
  //========================================================================
  // componentDidMount
  useEffect(() => {
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <h1>DA REPORT</h1>
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
  optionWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingTop: 4
  },
  dataTable: {
  },
  dataTableHead: {
  },
  dataTableBody: {
    borderLeft: '1px solid #eee',
  },
  tableTR: {
    '&:hover':{
      backgroundColor: '#eee',
    },
    '&:hover td':{
      color: 'rgba(0, 0, 0, 0.87)',
    }
  },
  tableTH: {
    padding: '3px 6px',
    borderRight: '1px solid #eee',
    backgroundColor: '#333',
    cursor: 'pointer',
    color: '#fff',
    textAlign: 'center',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_LG)]: {
    },
    fontSize: '0.9rem'
  },
  tableTHWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableOrderIcon: {
    marginLeft: theme.spacing(0.25),
    padding: 4
  },
  tableTD: {
    textOverflow:'ellipsis',
    overflow:'hidden',
    whiteSpace:'nowrap',
    padding: '4px 6px 3px',
    borderRight: '1px solid #eee',
    lineHeight: '1.1em',
    letterSpacing: -1,
    '&:hover':{
      overflow: 'visible !important',
      textOverflow:'ellipsis',
    },
    fontSize: '0.9rem'
  },
  safeTextColor: {
    color: '#f9f9f9',
  },
  popper: {
    zIndex: 1000
  },
  options: {
    padding: theme.spacing(0, 1.5),
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
  },
  popperLabel: {
    marginRight: 0
  }
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(DAReport);