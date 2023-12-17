/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, Box, Paper } from '@material-ui/core';
//=========================================================================
const HanwhaSourceTable = React.memo((props) => {
  const { hanwhaStore } = useStore();
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
        <h5 className={props.classes.title}>소스코드</h5>    
        {hanwhaStore.hanwhaSourceTable!=='limit over'?(
          <Box className={props.classes.tableContainer}>
            <Table aria-label="hanwha sourcecode data table" stickyHeader size='small' className={props.classes.dataTable}>
              <TableBody>
                <TableRow className={props.classes.tableTR} style={{ background: '#333' }}>
                  <TableCell className={props.classes.tableTD}></TableCell>
                  {hanwhaStore.hanwhaSourceTable.sourceName.map(data => (
                    <TableCell className={props.classes.tableTD} align={'center'}><strong style={{ color: '#fff' }}>{data}</strong></TableCell>
                  ))}
                  <TableCell className={props.classes.tableTD} align={'center'}><strong style={{ color: '#fff' }}>total</strong></TableCell>
                </TableRow>
                {Object.entries(hanwhaStore.hanwhaSourceTable.data.section1).map(([key, value], index, array) => {
                  let total = 0;
                  return (
                    <TableRow className={props.classes.tableTR}>
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{key}</strong></TableCell>
                      {Object.entries(array[index][1]).sort().map(([key2, value2]) => {
                        total += Number(value2);
                        return (
                          <TableCell className={props.classes.tableTD} align={'center'}>{value2}</TableCell>
                        );
                      })}
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{total}</strong></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className={props.classes.tableTR} style={{ background: '#f2f2f2' }}>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong>total</strong></TableCell>
                  {Object.entries(hanwhaStore.hanwhaSourceTable.sourceCount1).sort().map(([key2, value2]) => (
                    <TableCell className={props.classes.tableTD} align={'center'}><strong>{value2}</strong></TableCell>
                  ))}
                  <TableCell className={props.classes.tableTD} align={'center'}></TableCell>
                </TableRow>                                     
                {Object.entries(hanwhaStore.hanwhaSourceTable.data.section2).map(([key, value], index, array) => {
                  let total = 0;
                  return (
                    <TableRow className={props.classes.tableTR}>
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{key}</strong></TableCell>
                      {Object.entries(array[index][1]).sort().map(([key2, value2]) => {
                        total += Number(value2);
                        return (
                          <TableCell className={props.classes.tableTD} align={'center'}>{value2}</TableCell>
                        );
                      })}
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{total}</strong></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className={props.classes.tableTR} style={{ background: '#f2f2f2' }}>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong>total</strong></TableCell>
                  {Object.entries(hanwhaStore.hanwhaSourceTable.sourceCount2).sort().map(([key2, value2]) => (
                    <TableCell className={props.classes.tableTD} align={'center'}><strong>{value2}</strong></TableCell>
                  ))}
                  <TableCell className={props.classes.tableTD} align={'center'}></TableCell>
                </TableRow>                      
                {Object.entries(hanwhaStore.hanwhaSourceTable.data.section3).map(([key, value], index, array) => {
                  let total = 0;
                  return (
                    <TableRow className={props.classes.tableTR}>
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{key}</strong></TableCell>
                      {Object.entries(array[index][1]).sort().map(([key2, value2]) => {
                        total += Number(value2);
                        return (
                          <TableCell className={props.classes.tableTD} align={'center'}>{value2}</TableCell>
                        );
                      })}
                      <TableCell className={props.classes.tableTD} align={'center'}><strong>{total}</strong></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className={props.classes.tableTR} style={{ background: '#f2f2f2' }}>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong>total</strong></TableCell>
                  {Object.entries(hanwhaStore.hanwhaSourceTable.sourceCount3).sort().map(([key2, value2]) => (
                    <TableCell className={props.classes.tableTD} align={'center'}><strong>{value2}</strong></TableCell>
                  ))}
                  <TableCell className={props.classes.tableTD} align={'center'}></TableCell>
                </TableRow>              
                <TableRow className={props.classes.tableTR} style={{ background: '#333' }}>
                  <TableCell className={props.classes.tableTD} align={'center'}><strong style={{ color: '#fff' }}>TOTAL</strong></TableCell>
                  {Object.entries(hanwhaStore.hanwhaSourceTable.sourceCountTotal).sort().map(([key2, value2]) => (
                    <TableCell className={props.classes.tableTD} align={'center'}><strong style={{ color: '#fff' }}>{value2}</strong></TableCell>
                  ))}
                  <TableCell className={props.classes.tableTD} align={'center'}><strong style={{ color: '#fff' }}>{hanwhaStore.hanwhaSourceTable.sourceCountFinal}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )
          :
        (
          <p style={{ margin: 0 }}>데이터양이 많아 sourcecode table을 불러 올 수 없습니다.</p>
        )}        
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
  tableContainer: {
    marginBottom: '0.5rem',
    overflowX: 'scroll'    
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
export default withStyles(styles,{withTheme:true})(HanwhaSourceTable);