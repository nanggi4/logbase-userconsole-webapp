/* global CryptoJS, logger,  */
import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
import clsx from 'clsx';
import URLSearchParams from '@ungap/url-search-params';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
//=========================================================================
const LotteInsContainer = (props) => {
  const { paramStore, connectionStore, logStore } = useStore();
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
      <span>LOTTEINS---</span>
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
});
//=========================================================================
// export default withRouter(connect()(withStyles(styles)(LotteInsContainer)));
export default withStyles(styles,{withTheme:true})(LotteInsContainer);