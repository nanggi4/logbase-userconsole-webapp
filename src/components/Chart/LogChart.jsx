/* global logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
// import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import LogChartHour from './LogChartHour';
import LogChartSource from './LogChartSource';
import LogChartDevice from './LogChartDevice';
import LogChartHourTable from './LogChartHourTable';
import LogChartDeviceTable from './LogChartDeviceTable';
import LogChartSourceTable from './LogChartSourceTable';
import HanwhaSourceTable from '../Customer/hanwha/HanwhaSourceTable';
import HanwhaHour from '../Customer/hanwha/HanwhaHour';
import HanwhaHourTable from '../Customer/hanwha/HanwhaHourTable';
//=========================================================================
const LogChart = (props) => {
  const { chartStore, paramStore, hanwhaStore } = useStore();
  const [isHanhwa] = useState((paramStore.queryString['basketId']==="hF739i0wAb4PMXsd843Y60Lk"||paramStore.queryString['basketId']==="h1EKRskw3URWsmc8akd0A16A")?true:false);
  //========================================================================
  // componentDidMount
  useEffect(() => {
    console.log(hanwhaStore.hanwhaHourlyCount);
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      {props.viewType === "chart" ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LogChartHour />
          </Grid>
          {isHanhwa && (
            <Grid item xs={12}>
              <HanwhaHour />
            </Grid>          
          )}
          {chartStore.sourceCount && (
            <Grid item xs={12}>
              <LogChartSource />
            </Grid>            
          )}
          <Grid item xs={12} sm={4}>
            <LogChartDevice />
          </Grid>
        </Grid>      
      ) : 
      (
        <React.Fragment>
          <Grid container spacing={2}>
            {isHanhwa ? (
              <Grid item xs={12} sm={12} md={12}>
                <HanwhaSourceTable />
              </Grid>
            ) : (
              <Grid item xs={12} sm={3} md={3}>
                {/* <LogChartSourceTable data={chartStore.sourceList} title="소스 현황 (전체)" /> */}
                <LogChartSourceTable data={chartStore.sourceCount} title="소스 현황 (전체)" />
              </Grid>
            )}          
            <Grid item xs={12} sm={3} md={3}>
              <LogChartHourTable />
            </Grid>
            {isHanhwa && (
              <Grid item xs={12} sm={3} md={3}>
                <HanwhaHourTable />
              </Grid>
            )}            
            <Grid item xs={12} sm={3} md={3}>
              <LogChartDeviceTable />
            </Grid>            
          </Grid>
        </React.Fragment>      
      )}      
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(LogChart);