/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
//=========================================================================
const LogChartTable = React.memo((props) => {
  const { chartStore } = useStore();
  //========================================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container>
        <Grid container spacing={3} style={{marginBottom: '0.75rem'}}>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>디바이스 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="device data table">
                  <TableBody>
                    {chartStore.deviceResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>          
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>호스트 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="host data table">
                  <TableBody>
                    {chartStore.hostResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>            
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>경로 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="path data table">
                  <TableBody>
                    {chartStore.pathResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>            
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>소스 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="source data table">
                  <TableBody>
                    {chartStore.sourceResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>          
          </Grid>          
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>미디어 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="medium data table">
                  <TableBody>
                    {chartStore.mediumResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>            
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} className={props.classes.chartinnerwrap}>
              <h5 className={props.classes.charttitle}>캠페인 현황</h5>
              <TableContainer component={Paper} className={props.classes.charttablewrap}>
                <Table className={props.classes.charttable} aria-label="campaign data table">
                  <TableBody>
                    {chartStore.campaignResult.map((row, index) => (
                      <TableRow className={props.classes.charttabletr} key={index}>
                        <TableCell className={props.classes.charttabletd}><span style={{color: '#095B9E'}}>{row[0]}</span></TableCell>
                        <TableCell className={props.classes.charttabletd}><strong>{row[1]}</strong></TableCell>
                      </TableRow>
                    ))}                
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>            
          </Grid>          
        </Grid>        
      </Grid>    
    </React.Fragment>    
  ));
});
//=========================================================================
const styles = theme => ({
  chartinnerwrap: {
    padding: theme.spacing(3),
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;',
    borderRadius: 16
  },
  charttitle: {
    fontSize: '1.035rem',
    margin: '0 0 1rem'
  },
  charttabletd: {
    padding: '0.5rem',
    fontSize: '1.035rem',
    textAlign: 'center',
    borderBottom: 'none'
  },
  charttablewrap: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    borderRadius: 4
  },
  charttabletr: {
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      borderBottom: 'none'
    }
  }
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(LogChartTable);