/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, Paper } from '@material-ui/core';
//=========================================================================
const LogChartHourTable = React.memo((props) => {
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
      <Paper elevation={3} className={props.classes.innerWrap}>
        <h5 className={props.classes.title}>시간대별 접속현황</h5>
        <Table className={props.classes.dataTable} aria-label="hourlyCount data table">
          <TableBody>
            {chartStore.hourlyCount.map(datas => (
              datas.map(data => {
                const hours = data['hours'] !== null ? `${data['hours']}시` : `${data['no']}시`;
                const count = data['count'] !== null ? `${data['count']}건` : `0건`;
                return (
                  <TableRow className={props.classes.tableTR} key={data['no']}>
                    <TableCell className={props.classes.tableTD} align={'center'}>{hours}</TableCell>
                    <TableCell className={props.classes.tableTD} align={'center'}><strong>{count}</strong></TableCell>
                  </TableRow>                  
                );
              })
            ))}                
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
export default withStyles(styles,{withTheme:true})(LogChartHourTable);