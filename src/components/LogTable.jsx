/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//=========================================================================
const LogTable = (props) => {
  const { logStore, paramStore } = useStore();
  const [searchOptionList] = useState(props.reportOption?props.reportOption:[]);
  const [isHanhwa] = useState((paramStore.queryString['basketId']==="hF739i0wAb4PMXsd843Y60Lk"||paramStore.queryString['basketId']==="h1EKRskw3URWsmc8akd0A16A")?true:false);
  const [tableTHData, setTableTHData] = useState([
    {label: 'seq', order: 'asc', id: 'seq'},
    {label: 'time', order: 'asc', id: 'timestamp'},
    {label: 'ip', order: 'asc', id: 'ipaddress'},
    {label: 'device', order: 'asc', id: 'device'},
    {label: 'hostname', order: 'asc', id: 'hostname'},
    {label: 'pathname', order: 'asc', id: 'pathname'},
    {label: 'sourcecode', order: 'asc', id: 'sourcecode'},
    {label: 'mediumcode', order: 'asc', id: 'mediumcode'},
    {label: 'campaigncode', order: 'asc', id: 'campaigncode'},
    {label: 'termcode', order: 'asc', id: 'termcode'},
    {label: 'contentscode', order: 'asc', id: 'contentscode'},
    {label: 'userdata', order: 'asc', id: 'userdata'},
    {label: 'extradata', order: 'asc', id: 'extradata'},
  ]);
  const [tableOptionEl, setTableOptionEl] = useState(null);
  const [tableOptionOpen, setTableOptionOpen] = useState(false);
  const [options, setOptions] = useState({
    seq: false,
    time: true,
    ip: false,
    device: true,
    hostname: true,
    pathname: true,
    sourcecode: true,
    mediumcode: true,
    campaigncode: true,
    termcode: true,
    contentscode: true,
    userdata: true,
    extradata: true
  });
  //========================================================================
  const handleOptionChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };
  //========================================================================
  const handleTableOption = () => (event) => {
    setTableOptionEl(event.currentTarget);
    setTableOptionOpen(!tableOptionOpen);
  };   
  const sortData = (id, order) => {
    logStore.sortData(id, order);
    setTableTHData((tableTHData) =>
      tableTHData.map((data) => {
        return data.id === id ? { ...data, order: (order === 'asc') ? 'desc' : 'asc' } : data;
      }),
    );    
  };
  const searchString = (text, target) => {
    searchOptionList.map((option) => {
      if(text !== null && text !== '') {
        if(target === option.target) {
          const searchText = option.value;
          const regex = new RegExp(searchText, 'gi');          
          if(target === 'ipaddress') {
            text = text.replace(regex, '<span style="background: #F49E26; color: white">$&</span>');
          }else{
            text = text.replace(regex, '<span style="font-weight:800">$&</span>'); 
          }
        }
      }
    });
    return {__html: text};
  };
  //========================================================================
  // componentDidMount
  useEffect(() => {
    logStore.pagingData(1);
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <Button onClick={handleTableOption()} variant="contained" size="small" color="primary" style={{ marginBottom: '0.25rem' }}>table options</Button>
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        <colgroup>
          <col width='80px' />
          <col width='170px' />
          <col width='130px' />
          <col width='80px' />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        {logStore.pagingItems.length>0 && (
          <TableHead className={props.classes.dataTableHead}>
            <TableRow>
              {tableTHData.map((data, index) => {
                return (
                  <React.Fragment>
                    {options[data.label]&&(
                      <TableCell 
                      key={index} 
                      className={clsx(props.classes.tableTH)} 
                      onClick={(e) => sortData(data.id, data.order)}>
                        <div className={clsx(props.classes.tableTHWrap)}>                
                          {data.label}
                          {data.order === 'asc' ? <ArrowDownwardOutlinedIcon className={props.classes.tableOrderIcon} /> : <ArrowUpwardOutlinedIcon className={props.classes.tableOrderIcon} />}
                        </div>
                      </TableCell>                
                    )}
                  </React.Fragment>
                );
              })}
            </TableRow>
          </TableHead>
        )}
        <TableBody className={props.classes.dataTableBody}>
        {(logStore.pagingItems.map((row) => (
          <TableRow className={clsx(props.classes.tableTR)} key={row.seq} id={row.uuid}>
            {options.seq&&(<TableCell className={clsx(props.classes.tableTD)} align={'right'}>{row.seq}</TableCell>)}
            {options.time&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{props.convertTimestamp(row.timestamp)}</TableCell>)}
            {options.ip&&(<TableCell className={clsx(props.classes.tableTD,props.classes.safeTextColor)} align={'right'}><span dangerouslySetInnerHTML={searchString(row.ipaddress,'ipaddress')} /></TableCell>)}
            {options.device&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}><span dangerouslySetInnerHTML={searchString(row.device,'device')} /></TableCell>)}
            {options.hostname&&(<TableCell className={clsx(props.classes.tableTD)} style={{maxWidth:160}}><span dangerouslySetInnerHTML={searchString(row.hostname,'hostname')} /></TableCell>)}
            {options.pathname&&(<TableCell className={clsx(props.classes.tableTD)} style={{maxWidth:160}}>{row.pathname}</TableCell>)}
            {options.sourcecode&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.sourcecode,'sourcecode')} /></TableCell>)}
            {options.mediumcode&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.mediumcode,'mediumcode')} /></TableCell>)}
            {options.campaigncode&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.campaigncode,'campaigncode')} /></TableCell>)}
            {options.termcode&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.termcode,'termcode')} /></TableCell>)}
            {options.contentscode&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.contentscode,'contentscode')} /></TableCell>)}
            {options.userdata&&(<TableCell className={clsx(props.classes.tableTD)}><span dangerouslySetInnerHTML={searchString(row.userdata,'userdata')} /></TableCell>)}
            {(isHanhwa&&paramStore.queryString['basketId']==="hF739i0wAb4PMXsd843Y60Lk") ? (   
                <React.Fragment>
                  {options.extradata&&(<TableCell className={clsx(props.classes.tableTD)}>{row.extradata.substr(10, 5)}</TableCell>)}
                </React.Fragment>
              ) 
                :
              (
                <React.Fragment>
                  {options.extradata&&(<TableCell className={clsx(props.classes.tableTD)}>{row.extradata}</TableCell>)}
                </React.Fragment>
              )
            }
          </TableRow>
        )))}
        </TableBody>
      </Table>
      <Popper open={tableOptionOpen} anchorEl={tableOptionEl} transition className={props.classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={props.classes.options}>
              <FormGroup row>
                <FormGroup column style={{ marginRight: '0.5rem' }}>
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.seq}
                        onChange={handleOptionChange}
                        name="seq"
                        color="primary"
                      />
                    }
                    label="seq"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.time}
                        onChange={handleOptionChange}
                        name="time"
                        color="primary"
                      />
                    }
                    label="time"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.ip}
                        onChange={handleOptionChange}
                        name="ip"
                        color="primary"
                      />
                    }
                    label="ip"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.device}
                        onChange={handleOptionChange}
                        name="device"
                        color="primary"
                      />
                    }
                    label="device"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.hostname}
                        onChange={handleOptionChange}
                        name="hostname"
                        color="primary"
                      />
                    }
                    label="hostname"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.userdata}
                        onChange={handleOptionChange}
                        name="userdata"
                        color="primary"
                      />
                    }
                    label="userdata"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.pathname}
                        onChange={handleOptionChange}
                        name="pathname"
                        color="primary"
                      />
                    }
                    label="pathname"
                  />                    
                </FormGroup>
                <FormGroup column>
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.sourcecode}
                        onChange={handleOptionChange}
                        name="sourcecode"
                        color="primary"
                      />
                    }
                    label="sourcecode"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mediumcode}
                        onChange={handleOptionChange}
                        name="mediumcode"
                        color="primary"
                      />
                    }
                    label="mediumcode"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.campaigncode}
                        onChange={handleOptionChange}
                        name="campaigncode"
                        color="primary"
                      />
                    }
                    label="campaigncode"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.termcode}
                        onChange={handleOptionChange}
                        name="termcode"
                        color="primary"
                      />
                    }
                    label="termcode"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.contentscode}
                        onChange={handleOptionChange}
                        name="contentscode"
                        color="primary"
                      />
                    }
                    label="contentscode"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.extradata}
                        onChange={handleOptionChange}
                        name="extradata"
                        color="primary"
                      />
                    }
                    label="extradata"
                  />                     
                </FormGroup>
              </FormGroup>
            </Paper>
          </Fade>
        )}
      </Popper>      
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
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
export default withStyles(styles,{withTheme:true})(LogTable);