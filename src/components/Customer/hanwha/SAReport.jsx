/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import SAData from './SAData.json';
//=========================================================================
const SAReport = (props) => {
  //========================================================================
  // componentDidMount
  useEffect(() => {
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <div className={clsx(props.classes.optionWrap)}>
        <div>
          <TextField
            id='input-limit'
            variant='outlined' color='secondary' size='small' select
            label={'Limit'}
            value={'naver'}
            className={props.classes.limitSelectBox}
            // onChange={(e)=>{setLimitValue(e.target.value)}}
            SelectProps={{
              SelectDisplayProps: {style: {width: 40, paddingTop: 7, paddingBottom: 4}}
            }}
            InputProps={{
              classes: { root: props.classes.limitInput }
            }}                                
          >
            <MenuItem value="naver">
              naver
            </MenuItem>
            <MenuItem value="kakao">
              kakao
            </MenuItem>           
            <MenuItem value="google">
              google
            </MenuItem>
            <MenuItem value="facebook">
              facebook
            </MenuItem>                        
          </TextField>          
        </div>
        <div>
          <Button
            className={clsx(props.classes.gridButtonDefault)}
            variant='contained' color='secondary' size='small'
            style={{marginRight: 4}}
          >
            recall
          </Button>        
          <Button
            className={clsx(props.classes.gridButtonDefault)}
            variant='contained' color='secondary' size='small'
            style={{marginRight: 4}}
          >
            option
          </Button>                  
          <Button
            className={clsx(props.classes.gridButtonDefault)}
            variant='contained' color='secondary' size='small'
          >
            export
          </Button>                                            
        </div>
      </div> 
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        <TableHead className={props.classes.dataTableHead}>
          <TableRow>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                일자
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                캠페인
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                광고매체
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                광고목표
              </div>
            </TableCell>            
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                타겟팅
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                광고소재
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                노출수
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                클릭수
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                CTR
              </div>
            </TableCell>            
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                CPC
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                CPM
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                총비용
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                DB
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                전환율
              </div>
            </TableCell>
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                CPA
              </div>
            </TableCell>            
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                Score
              </div>
            </TableCell>            
            <TableCell className={clsx(props.classes.tableTH)}>
              <div className={clsx(props.classes.tableTHWrap)}>
                Status
              </div>
            </TableCell>                        
          </TableRow>
        </TableHead>
        <TableBody className={props.classes.dataTableBody}>
        {(SAData.map((row,idx) => {
          let background = "";
          if (row.Score === 100) {
            background = 'green'; 
          } else if (row.Score === 95) {
            background = '#2ebe2e';
          } else if (row.Score === 70) {
            background = '#ffca00';
          } else if (row.Score === 80) {
            background = 'blue';
          } else if (row.Score === 60) {
            background = 'red';
          } else if (row.Score === 50) {
            background = 'red';
          } else if (row.Score === 40) {
            background = 'red';
          } else if (row.Score === 0) {
            background = 'white';
          }
          return (
            <TableRow className={clsx(props.classes.tableTR)} key={idx}>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.일자}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.캠페인}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.광고매체}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.광고목표}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.타겟팅}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.광고소재}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.노출수}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.클릭수}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.CTR}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.CPC}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.CPM}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.총비용}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.DB}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.전환율}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.CPA}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.Score}</TableCell>
              <TableCell className={clsx(props.classes.tableTD)} align={'center'} style={{background}}>{row.Status}</TableCell>
            </TableRow>          
          );
        }))}
        </TableBody>
      </Table>
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
export default withStyles(styles,{withTheme:true})(SAReport);