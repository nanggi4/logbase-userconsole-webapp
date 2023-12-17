/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, Paper } from '@material-ui/core';
//=========================================================================
const LogChartSourceTable = React.memo((props) => {
  const { } = useStore();
  const [totalNum, setTotalNum] = useState(0);
  //========================================================================
  // componentDidMount
  useEffect(() => {
    let sum = 0;
    props.data.forEach(row => {
      sum += row[1];
    });    
    setTotalNum(sum);
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <Paper elevation={3} className={props.classes.innerWrap}>
        {/*<h5 className={props.classes.title}><span>{props.title}</span> <span><strong style={{color: '#095B9E'}}>{totalNum}</strong>건</span></h5>*/}
        <h5 className={props.classes.title}><span>{props.title}</span></h5>
        <Table className={props.classes.charttable} aria-label="hourlyCount data table">
          <TableBody>
            {/*
            {props.data.map((row, index) => {
              return (
                <TableRow className={props.classes.tableTR} key={index}>
                  <TableCell className={props.classes.tableTD} align={'center'}>{row[0]}</TableCell>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong>{row[1]}건</strong></TableCell>
                </TableRow>
              );
            })}
            */}
            {props.data[0].map((row, index) => {
              //========================================================================
              const sourcecode = row['sourcecode'] === null ? 'null' : row['sourcecode'];
              const count = row['count'] === null ? 'null' : row['count'];
              //========================================================================
              return (
                <TableRow className={props.classes.tableTR} key={index}>
                  <TableCell className={props.classes.tableTD} align={'center'}>{sourcecode}</TableCell>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong>{count}건</strong></TableCell>
                </TableRow>
              );
            })}            
          </TableBody>
        </Table>
      </Paper>    
    </React.Fragment>    
  ));
});
//=========================================================================
const styles = theme => ({
  innerWrap: {
    padding: theme.spacing(2),
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;',
    borderRadius: 16,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      padding: theme.spacing(1.5),
    }    
  },
  title: {
    fontSize: '1rem',
    margin: '0 0 0.5rem',
  },
  tableTR: {
    '&:hover':{
      backgroundColor: '#eee',
    },
    '&:hover td':{
      color: 'rgba(0, 0, 0, 0.87)',
    }
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
  }
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(LogChartSourceTable);