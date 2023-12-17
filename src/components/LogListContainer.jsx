/* global logger */
import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../lib/useStore';
import LoadingIndicator from './LoadingIndicator';
import { groupIndex } from '../data/convertIndex';
import clsx from 'clsx';
import URLSearchParams from '@ungap/url-search-params';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Box, Button, Checkbox, Chip, Dialog, DialogActions, IconButton, InputLabel, MenuItem, Paper, Select, TableContainer, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { AddCircle, HighlightOff, ArrowDownward, TableChart, BarChart } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LogReportListItem from './LogReportListItem';
import LogTable from './LogTable';
import LogChart from './Chart/LogChart';
import DateFnsUtils from '@date-io/date-fns';
import dateFormat from 'dateformat';
import Pagination from '@material-ui/lab/Pagination';
//=========================================================================
import YonginTable from './Customer/yongin/YonginTable';
//=========================================================================
// logger.debug(`LogListContainer::Loaded`);
//=========================================================================
const searchOptionTargetList = ['','ip','device','hostname','sourcecode','mediumcode','campaigncode','termcode','contentscode','userdata'];
const searchOptionRuleList = ['match','include','not included','start','end'];
const limitValueList = [500, 300, 100, 50, 30, 10];
// const countValueList = ['all', 1000, 500, 300, 100, 50, 10];
//=========================================================================
const LogListContainer = (props) => {
  const { logStore, chartStore, connectionStore, paramStore, utilStore, yonginStore, hanwhaStore } = useStore();
  const history = useHistory();
  const today = new Date();
  const weekend = utilStore.getWeekend();
  const oneDayDateStart = dateFormat(new Date(today.getFullYear(),today.getMonth(),today.getDate()-1),'yyyy-mm-dd"T"00:00:00');
  const oneDayDateEnd = dateFormat(new Date(today.getFullYear(),today.getMonth(),today.getDate()-1),'yyyy-mm-dd"T"23:59:00');  
  const oneWeekDateStart = dateFormat(new Date(today.getFullYear(),today.getMonth(),today.getDate()+weekend.startDate),'yyyy-mm-dd"T"00:00:00');
  const oneWeekDateEnd = dateFormat(new Date(today.getFullYear(),today.getMonth(),today.getDate()+weekend.endDate),'yyyy-mm-dd"T"23:59:00');  
  const oneMonthDateStart = dateFormat(new Date(today.getFullYear(),today.getMonth()-1,1),'yyyy-mm-dd"T"00:00:00');
  const oneMonthDateEnd = dateFormat(new Date(today.getFullYear(),today.getMonth(),0),'yyyy-mm-dd"T"23:59:00');  
  const [loadingState, setLoadingState] = useState(false);
  const [basketId] = useState(paramStore.queryString['basketId']?paramStore.queryString['basketId']:false);
  const [isHanhwa] = useState((paramStore.queryString['basketId']==="hF739i0wAb4PMXsd843Y60Lk"||paramStore.queryString['basketId']==="h1EKRskw3URWsmc8akd0A16A")?true:false);
  const [timeBefore, setTimeBefore] = useState(paramStore.queryString['time-before']?paramStore.queryString['time-before']:dateFormat(new Date(),'yyyy-mm-dd"T"23:59:00'));
  const [timeStart, setTimeStart] = useState(paramStore.queryString['time-start']?paramStore.queryString['time-start']:dateFormat(new Date(),'yyyy-mm-dd"T"00:00:00'));
  const [timeStartChecked, setTimeStartChecked] = useState(paramStore.queryString['time-start']?true:true);
  const [timeBeforeChecked, setTimeBeforeChecked] = useState(paramStore.queryString['time-before']?true:true);
  const [limitValue, setLimitValue] = useState(paramStore.queryString['limit']?paramStore.queryString['limit']:500);
  const [countValue] = useState(1000);
  const [detailView] = useState(paramStore.queryString['detailView']?paramStore.queryString['detailView']:'');
  const [yonginOpen, setYonginOpen] = useState(false);
  const [logListOpen, setLogListOpen] = useState(false);
  const [logChartOpen, setLogChartOpen] = useState(false);
  const [linkGetNewReport, setLinkGetNewReport] = useState(false);
  const [reportCount, setReportCount] = useState(false);
  const [reportOption, setReportOption] = useState(false);
  const [dialogContent, setDialogContent] = useState(false);
  const [searchOptionListExpand, setSearchOptionListExpand] = useState(false);
  const [searchOptionList, setSearchOptionList] = useState(paramStore.queryString['options']?JSON.parse(paramStore.queryString['options']):[]);
  const [selectedOptionTarget, setSelectedOptionTarget] = useState(searchOptionTargetList[0]);
  const [typedOptionValue, setTypedOptionValue] = useState('');
  const [selectedOptionRule, setSelectedOptionRule] = useState(searchOptionRuleList[0]);
  const [viewType, setViewType] = useState('chart');
  const refTableContainer = useRef();
  const refChartContainer = useRef();
  const refSearchOptionListBox = useRef();
  const refSearchOptionTargetListBox = useRef();
  const [expanded, setExpanded] = useState(999);
  const [isOpen, setIsOpen] = useState(true);
  const [reportTab, setReportTab] = useState("defalut");
  //========================================================================
  const searchParams = new URLSearchParams(paramStore.location.search);
  if(paramStore.queryString['limit'] && limitValueList.indexOf(parseInt(paramStore.queryString['limit'],10))<0)
  {
    limitValueList.unshift(paramStore.queryString['limit']);
  }
  //========================================================================
  const convertTimestamp = (mysqlTimeString) => {
    const dateTime = mysqlTimeString;
    if(mysqlTimeString)
    {
      let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
      let convertedResult = `${dateTimeParts[0]}-${dateTimeParts[1]}-${dateTimeParts[2].replace('T',' ')}:${dateTimeParts[3]}`;
      return convertedResult;
    }
    else
    {
      return '';
    }
  };
  const handleTimeUpdate = (param) => {
    if(!isNaN(param.change.getTime()))
    {
      param.callback(dateFormat(param.change,'yyyy-mm-dd"T"HH:MM:00'));
    }
  };
  //========================================================================
  const handleGetReport = () => {
    history.push({
      pathname: '/logbase',
      search: linkGetNewReport      
    });
    getLogReport({
      basketId: basketId,
      limit: limitValue,
      timeStart: timeStart,
      timeBefore: timeBefore,
      searchOptionList: searchOptionList,
      details: detailView
    });
  };
  //========================================================================
  const pagingData = (page, count) => {
    logStore.pagingData(page, countValue);
  };
  //========================================================================
  const handleViewType = (event, viewType) => {
    setViewType(viewType);
  };
  //========================================================================
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  //========================================================================
  const handleSearchBtn = (range) => {
    switch (range) {
      case 'day':
        setTimeStart(oneDayDateStart);
        setTimeBefore(oneDayDateEnd);
        break;            
      case 'week':
        setTimeStart(oneWeekDateStart);
        setTimeBefore(oneWeekDateEnd);
        break;      
      case 'month':
        setTimeStart(oneMonthDateStart);
        setTimeBefore(oneMonthDateEnd);
        break;
    }
  };
  //========================================================================
  const getSAReport = (e) => {
    console.log('getSAReport');
    setReportTab("sa");
  };
  //========================================================================
  const getDAReport = (e) => {
    console.log('getDAReport');
    setReportTab("da");
  };  
  //========================================================================
  const selectYongin = (reportIndex) => {
    if (yonginOpen) setYonginOpen(false);
    if (logListOpen) setLogListOpen(false);
    if (logChartOpen) setLogChartOpen(false);
    logStore.setStoreValue('selectedReportIndex', reportIndex);
    let _yonginReward = [];
    let _yonginPoten = [];            
    let _yonginSource = [];
    console.log('logStore.reports[reportIndex].reportItem.yongin', logStore.reports[reportIndex].reportItem.yongin);
    logStore.reports[reportIndex].reportItem.yongin.map(data => {
      console.log(JSON.parse(data.userdata));
      if (JSON.parse(data.userdata).source === '2' && JSON.parse(data.userdata).status === '1') { 
        _yonginPoten.push(data);
      } else {
        if (data.hostname !== null && data.pathname !== null) {
          _yonginReward.push(data);
          _yonginSource.push(utilStore.convertData(data.sourcecode, 'sourcecode'));
        }
      }
    });
    yonginStore.setStoreValue('yonginReward', _yonginReward);
    yonginStore.setStoreValue('yonginPoten', _yonginPoten);
    yonginStore.getChart(_yonginSource, 'yonginSourceList', null);
    setExpanded(logStore.selectedReportIndex);
    setYonginOpen(true);
  };
  //========================================================================
  const selectReport = (reportIndex) => {
    let reportItem = logStore.reports[reportIndex].reportItem.basicInfo;
    let requestParams = logStore.reports[reportIndex].requestParams;
    setReportCount(reportItem.count);
    setReportOption(requestParams.options);
    if(!reportItem) return;
    logStore.setStoreValue('items', []);
    logStore.setStoreValue('pagingItems', []);
    logStore.setStoreValue('selectedReportIndex', reportIndex);
    setExpanded(reportIndex);
    if(!isOpen) setIsOpen(true);
    getLogItems({
      basketId: basketId,
      limit: limitValue,
      seqLast: reportItem.seqLast,
      seqFirst: reportItem.seqFirst,
      options: requestParams.options,
      page: logStore.page
    });
    setLinkGetNewReport(searchParams.toString());
  };
  //========================================================================
  const selectReportChart = (reportIndex) => {
    chartStore.clearStorage();
    let reportItem = logStore.reports[reportIndex].reportItem.basicInfo;
    let requestParams = logStore.reports[reportIndex].requestParams;
    if(!reportItem) return;
    if(isHanhwa) {
      let reportYSourcecode = logStore.reports[reportIndex].reportItem.sourcecode;
      hanwhaStore.clearStorage();
      if(reportYSourcecode.hasOwnProperty('result')) {
        hanwhaStore.setStoreValue('hanwhaSourceTable', 'limit over'); 
      } else {
        let _hanwhaSourceTable = utilStore.getSourcecode(reportYSourcecode);
        hanwhaStore.setStoreValue('hanwhaSourceTable', _hanwhaSourceTable);                          
      }
    }    
    logStore.setStoreValue('items', []);
    logStore.setStoreValue('pagingItems', []);
    logStore.setStoreValue('selectedReportIndex', reportIndex);
    setExpanded(reportIndex);
    if(!isOpen) setIsOpen(true);
    chartStore.setStoreValue('selectReportDate', reportItem['timeBefore'].slice(0, 10));
    getLogItems({
      basketId: basketId,
      limit: limitValue,
      seqLast: reportItem.seqLast,
      seqFirst: reportItem.seqFirst,
      options: requestParams.options,
      page: logStore.page,
      openChart: true
    });    
    let _hourlyCount = chartStore.hourlyCount;
    let _deviceCount = chartStore.deviceCount;
    let _sourceCount = chartStore.sourceCount;
    let _hanwhaHourlyCount = hanwhaStore.hanwhaHourlyCount;
    _hourlyCount.push(logStore.reports[reportIndex].reportItem.hourlyCount);
    _deviceCount.push(logStore.reports[reportIndex].reportItem.deviceCount);
    _sourceCount.push(logStore.reports[reportIndex].reportItem.sourcecodeCount);
    if (isHanhwa) _hanwhaHourlyCount.push(logStore.reports[reportIndex].reportItem.hanwha);
    chartStore.setStoreValue('hourlyCount', _hourlyCount);
    chartStore.setStoreValue('deviceCount', _deviceCount);
    chartStore.setStoreValue('sourceCount', _sourceCount);
    if (isHanhwa) hanwhaStore.setStoreValue('hanwhaHourlyCount', _hanwhaHourlyCount);
    if (logListOpen) setLogListOpen(false);
    if (!logChartOpen) setLogChartOpen(true);
  };
  //========================================================================
  const getLogReport = (param) => {
    if(!param.basketId) return;
    let _data = {basketId: param.basketId};
    let _details = param.details;
    if(param.timeStart&&timeStartChecked) _data['time-start'] = param.timeStart;
    if(param.timeBefore&&timeBeforeChecked) _data['time-before'] = param.timeBefore;
    if(param.searchOptionList.length>0) _data['options'] = param.searchOptionList;
    if(param.timeStartChecked&&param.timeBeforeChecked&&param.timeStart>=param.timeBefore) return;
    //------------------------------------------------------
    logStore.getLogReport({
      connectionStore: connectionStore,
      setLoadingState: setLoadingState,
      data: _data,
      callback:(_payload)=>{
        if(_payload.isSuccess)
        {
          let _reports = logStore.reports;
          _reports.push(_payload.isSuccess.reportPackage);
          logStore.setStoreValue('reports', _reports);
          if(_details==="loglist") selectReport(logStore.reports.length-1);
        }
        setLoadingState(false);
      }
    });
  };
  //========================================================================
  const getLogItems = (param) => {
    setExpanded(999);
    if(!param.basketId) return;
    let _data = {basketId: param.basketId};
    if(param.limit) _data['limit'] = param.limit;
    if(param.seqFirst) _data['seq-first'] = param.seqFirst;
    if(param.seqLast) _data['seq-last'] = param.seqLast;
    if(param.lastKey) _data['previous-last-key'] = param.lastKey;
    if(param.options) _data['options'] = param.options;
    if(param.seqFirst > param.seqLast) return;
    //------------------------------------------------------
    logStore.getLogItemList({
      connectionStore: connectionStore,
      setLoadingState: setLoadingState,
      data: _data,
      callback:(_payload)=>{
        if(_payload.isSuccess)
        {
          let _items = logStore.items;
          let _resultList = _payload.isSuccess.logList;
          let _page = logStore.page;
          // console.log('_payload !', _payload);
          if(_payload.isSuccess.log) _resultList = [_payload.isSuccess.log];
          // console.log('_resultList', _resultList);
          if(_items.length<1) _items = _resultList;
          else _items = _items.concat(_resultList);
          logStore.setStoreValue('items', _items);
          logStore.setStoreValue('countLogItems', _items.length);
          if (param.openChart) {
            let sourcecode = '';
            let convertSourcecode = '';
            let _sourceList = chartStore.sourceList;
            let _sourceConvertList = chartStore.sourceConvertList;
            let _sourceGroupOneList = chartStore.sourceGroupOneList;
            let _sourceGroupOneConvertList = chartStore.sourceGroupOneConvertList;
            let _sourceGroupTwoList = chartStore.sourceGroupTwoList;
            let _sourceGroupTwoConvertList = chartStore.sourceGroupTwoConvertList;
            const _limit = 30;
            _resultList.map(data => {
              if (isHanhwa&&paramStore.queryString['basketId']==="hF739i0wAb4PMXsd843Y60Lk") {
                Object.entries(groupIndex).forEach(([key, value]) => {
                  if (data['extradata'].substr(10, 5) === key) {
                    if (value === '건강종합') {
                      sourcecode = data['sourcecode'];
                      convertSourcecode = utilStore.convertData(sourcecode, 'sourcecode');
                      _sourceGroupOneList.push(sourcecode);                  
                      _sourceGroupOneConvertList.push(convertSourcecode);
                    } else if (value === '골프운전') {
                      sourcecode = data['sourcecode'];
                      convertSourcecode = utilStore.convertData(sourcecode, 'sourcecode');
                      _sourceGroupTwoList.push(sourcecode);                  
                      _sourceGroupTwoConvertList.push(convertSourcecode);
                    }
                  }
                });              
                convertSourcecode = utilStore.convertData(sourcecode, 'sourcecode');
                _sourceConvertList.push(convertSourcecode);
              }
              sourcecode = data['sourcecode'];
              _sourceList.push(sourcecode);
              chartStore.getChart(_sourceList, 'sourceList', _limit); 
            });
            if (isHanhwa) {
              chartStore.getChart(_sourceConvertList, 'sourceConvertList', _limit); 
              chartStore.getChart(_sourceGroupOneList, 'sourceGroupOneList', _limit);
              chartStore.getChart(_sourceGroupOneConvertList, 'sourceGroupOneConvertList', _limit);
              chartStore.getChart(_sourceGroupTwoList, 'sourceGroupTwoList', _limit);            
              chartStore.getChart(_sourceGroupTwoConvertList, 'sourceGroupTwoConvertList', _limit);                     
            }
          }
          isNaN(countValue) ? countValue = 1000 : countValue;
          isNaN(param.page) ? logStore.pagingData(_page, countValue) : logStore.pagingData(1, countValue);
          logStore.setStoreValue('lastKeyItemPaging', (param.limit&&(param.limit>_resultList.length))?false:_resultList[_resultList.length-1]);
        }
        if (param.openChart) {
          setYonginOpen(false);
          setLogListOpen(false);  
          setLogChartOpen(true);
        } else {
          setYonginOpen(false);
          setLogChartOpen(false);
          setLogListOpen(true);  
        }
        setExpanded(logStore.selectedReportIndex);
        setLoadingState(false);
      }
    });
  };
  //========================================================================
  useEffect(() => {
    getLogReport({
      basketId: basketId,
      limit: limitValue,
      timeStart: timeStart,
      timeBefore: timeBefore,
      searchOptionList: searchOptionList,
      details: detailView
    });
    return () => {
    };
  }, []);
  //========================================================================
  useEffect(() => {
  });
  //========================================================================
  useEffect(() => {
    const _page = logStore.page;
    isNaN(_page)?logStore.pagingData(_page, countValue):logStore.pagingData(1, countValue);
  }, [countValue]);  
  //========================================================================
  useEffect(() => {
    // searchParams.set('limit', limitValue);
    setSelectedOptionTarget(searchOptionTargetList[0]);
    setTypedOptionValue('');
    setSelectedOptionRule(searchOptionRuleList[0]);
    searchParams.set('options', JSON.stringify(searchOptionList));
    // console.log('searchOptionList : ', searchOptionList);
    if(searchOptionList.length){
      if(refSearchOptionListBox.current) refSearchOptionListBox.current.scrollTop = refSearchOptionListBox.current.scrollHeight;
      if(refSearchOptionTargetListBox.current) refSearchOptionTargetListBox.current.focus();
    }
    // console.log('timeStart:', timeStart);
    // console.log('timeBefore:', timeBefore);
    // console.log('timeStartChecked:', timeStartChecked);
    // console.log('timeBeforeChecked:', timeBeforeChecked);
    if(timeStartChecked) searchParams.set('time-start', timeStart); else searchParams.delete('time-start');
    if(timeBeforeChecked) searchParams.set('time-before', timeBefore); else searchParams.delete('time-before');
    setLinkGetNewReport(searchParams.toString());
  }, [timeStart, timeBefore, timeStartChecked, timeBeforeChecked, searchOptionList]);
  //========================================================================
  useEffect(() => {
    if(refSearchOptionListBox.current && !searchOptionListExpand) refSearchOptionListBox.current.scrollTop = refSearchOptionListBox.current.scrollHeight;
    if(refSearchOptionListBox.current && searchOptionListExpand) refSearchOptionListBox.current.scrollTop = 0;
  }, [searchOptionListExpand]);
  //========================================================================
  useEffect(() => {}, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <Box className={props.classes.outContainer}>
        <div className={props.classes.searchOptionContainer}>
          <form className={props.classes.searchForm} noValidate autoComplete='off'>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} lg={2}>
                <TextField
                  id='input-basketId'
                  variant='outlined'
                  size='small'
                  label={'Basket Id'}
                  value={basketId ? basketId : ''}
                  style={{margin:0, width: '100%'}}
                  InputProps={{
                    readOnly: true,
                    classes: {
                      root: props.classes.basketInput
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={6} className={props.classes.searchDateWrap}>
                <Box className={props.classes.searchDateBtnWrap}>
                  <Button
                    className={clsx(props.classes.searchDateBtn)}
                    variant='contained' color='secondary' size="small"
                    onClick={() => handleSearchBtn('day')}
                  >
                    1DAY
                  </Button>                                  
                  <Button
                    className={clsx(props.classes.searchDateBtn)}
                    variant='contained' color='secondary' size="small"
                    onClick={() => handleSearchBtn('week')}
                  >
                    WEEKEND
                  </Button>                  
                  <Button
                    className={clsx(props.classes.searchDateBtn)}
                    variant='contained' color='secondary' size="small"
                    onClick={() => handleSearchBtn('month')}
                  >
                    1MONTH
                  </Button>                                    
                </Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Checkbox
                    checked={timeStartChecked}
                    onChange={(e)=>setTimeStartChecked(event.target.checked)}
                    InputProps={{}}
                  />
                  <KeyboardDateTimePicker
                    id='input-timestart'
                    label='Time Start'
                    format="yyyy-MM-dd HH:mm"
                    value={timeStart}
                    onChange={(change)=>handleTimeUpdate({change: change, callback: setTimeStart})}
                    disabled={timeStartChecked ? false : true}
                    minDate={new Date("2019-01-01T00:00")}
                    ampm={false}
                    // onError={console.log}
                    InputProps={{}}
                    InputLabelProps={{style: {marginTop: -8}}}
                  />
                  <Checkbox
                    checked={timeBeforeChecked}
                    onChange={(e)=>setTimeBeforeChecked(event.target.checked)}
                    InputProps={{}}
                  />
                  <KeyboardDateTimePicker
                    id='input-timebefore'
                    label='Time Before'
                    format="yyyy-MM-dd HH:mm"
                    value={timeBefore}
                    onChange={(change)=>handleTimeUpdate({change: change, callback: setTimeBefore})}
                    disabled={timeBeforeChecked ? false : true}
                    minDate={new Date("2019-01-01T00:00")}
                    maxDate={new Date()}
                    ampm={false}
                    // onError={console.log}
                    InputProps={{}}
                    InputLabelProps={{style: {marginTop: -8}}}
                    showTodayButton
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              {searchOptionList.length>0 && (
                <Grid item xs={12} sm={12} md={4} lg={2}>
                  <Box className={clsx(props.classes.chipListBox,{[props.classes.chipListBoxExpand]: searchOptionListExpand})}>
                    <div className={clsx(props.classes.chipListScrollOutbox,{[props.classes.chipListScrollOutboxExpand]: searchOptionListExpand})} ref={refSearchOptionListBox}>
                      <div className={clsx(props.classes.chipListScrollInbox,{[props.classes.chipListScrollInboxExpand]: searchOptionListExpand})}>
                        <div className={clsx(props.classes.chipListPaddingInbox,{[props.classes.chipListPaddingInboxExpand]: searchOptionListExpand})}>
                          {searchOptionList.map((searchOptionItem, searchOptionItemIndex) => (
                            <Chip
                              variant='outlined'
                              size='small'
                              label={`${searchOptionItem.target}-${searchOptionItem.value}-${searchOptionItem.rule}`}
                              style={{marginRight:4,marginBottom:4,}}
                              onClick={()=>{}}
                              onDelete={(e)=>{
                                let _list = searchOptionList;
                                _list.splice(searchOptionItemIndex,1);
                                setSearchOptionList(list=>[..._list])}
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Box className={clsx(props.classes.searchOptionListButtonBox)}>
                      {searchOptionList.length>1 && (
                      <IconButton
                        aria-label='add' size='small'
                        className={clsx(props.classes.searchOptionListButtonExpand)}
                        onClick={(e)=>{setSearchOptionListExpand(searchOptionListExpand?false:true)}}
                        >
                        <ArrowDownward fontSize='small' className={clsx({[props.classes.iconArrowDownward]:searchOptionListExpand})}/>
                      </IconButton>
                      )}
                      <IconButton
                        aria-label='add' size='small'
                        className={clsx(props.classes.searchOptionListButtonClear)}
                        onClick={(e)=>setSearchOptionList([])}
                        >
                        <HighlightOff fontSize='small'/>
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
                )}
              <Grid item xs={12} sm={12} md={8} lg={4} className={clsx(props.classes.searchOptionWrap)}>
                <span className={clsx(props.classes.selectAlignBox)}>
                  <InputLabel shrink style={{marginTop:-8}}>
                    Option
                  </InputLabel>
                  <Select
                    ref={refSearchOptionTargetListBox}
                    className={clsx(props.classes.optionSelectBox)}
                    value={selectedOptionTarget}
                    onChange={(e)=>setSelectedOptionTarget(e.target.value)}
                  >
                    {searchOptionTargetList.map((searchOptionTarget, searchOptionTargetIndex) => (
                      <MenuItem style={{minHeight:36}} value={searchOptionTarget}>{searchOptionTarget}</MenuItem>
                    ))}
                  </Select>
                </span>
                <TextField
                  label='keyword'
                  className={clsx(props.classes.keywordInputBox)}
                  InputLabelProps={{style: {marginTop: -8},shrink: true}}
                  disabled={selectedOptionTarget==='' ? true : false}
                  value={typedOptionValue ? typedOptionValue : ''}
                  onChange={(e)=>setTypedOptionValue(e.target.value)}
                  InputProps={{
                    classes: {
                      root: props.classes.keywordInput
                    }
                  }}                  
                />
                <span className={clsx(props.classes.selectAlignBox)}>
                  <InputLabel shrink style={{marginTop:-8}}>
                    Rule
                  </InputLabel>
                  <Select
                    className={clsx(props.classes.selectOptionRuleBox)}
                    value={selectedOptionRule}
                    disabled={selectedOptionTarget==='' ? true : false}
                    onChange={(e)=>setSelectedOptionRule(e.target.value)}
                  >
                    {searchOptionRuleList.map((searchOptionRule, searchOptionRuleIndex) => (
                      <MenuItem style={{minHeight:36}} value={searchOptionRule}>{searchOptionRule}</MenuItem>
                    ))}
                  </Select>
                </span>
                <IconButton
                  aria-label='add'
                  className={clsx(props.classes.addIconButton)}
                  disabled={selectedOptionTarget==='' ? true : false}
                  onClick={(e)=>setSearchOptionList(list => [...list, {target: selectedOptionTarget, value: typedOptionValue, rule: selectedOptionRule}])}
                  >
                  <AddCircle />
                </IconButton>
                <Button
                  className={clsx(props.classes.gridButtonDefault, props.classes.gridButtonFromLeft)}
                  variant='contained' color='secondary'
                  onClick={() => handleGetReport()}
                  // component={Link} to={location=>({...location, search: linkGetNewReport})}
                  disabled={!linkGetNewReport ? true : false}
                >
                  {process.env.CONST_TEXT_REPORT}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className={clsx(props.classes.resultContainer)}>
          <Box className={clsx(props.classes.searchResultTableBox)}>
            {(logStore.reports.map((reportPackage, reportIndex) => (
              <Accordion square expanded={expanded === reportIndex} className={clsx(props.classes.searchResultAcco)}>
                <AccordionSummary 
                aria-controls={`${reportIndex}-content`} 
                id={`${reportIndex}-header`} 
                className={clsx(props.classes.searchResultAccoSummary)}
                classes={{ 
                  content: props.classes.searchResultAccoContent, 
                  expanded: props.classes.searchResultAccoExpanded
                }}
                >
                  <LogReportListItem
                    key={Math.random().toString(36).substr(2,16)}
                    basketId={basketId}
                    reportItem={reportPackage.reportItem.basicInfo}
                    searchHistoryItem={reportPackage.searchHistoryItem}
                    requestParams={reportPackage.requestParams}
                    reportIndex={reportIndex}
                    convertTimestamp={convertTimestamp}
                    reportsLength={logStore.reports.length}
                    selectReport={selectReport}
                    selectReportChart={selectReportChart}
                    selectYongin={selectYongin}
                    setLoadingState={setLoadingState}
                    setDialogContent={setDialogContent}
                    expanded={expanded}
                    handleIsOpen={handleIsOpen}
                    isOpen={isOpen}
                  />
                </AccordionSummary>
                {isOpen&&(
                  <React.Fragment>
                    {yonginOpen&&(
                      <TableContainer ref={refTableContainer} className={props.classes.tablecontainer}>
                        <YonginTable convertTimestamp={convertTimestamp} />
                      </TableContainer>
                    )}
                    {(expanded === logStore.selectedReportIndex)&& (
                      <AccordionDetails className={clsx(props.classes.searchResultAccoDetails)}>
                        {logListOpen && (
                          <React.Fragment>
                            <Box className={clsx(props.classes.searchResultTableBoxHeader)}>
                              {logListOpen && (
                                <React.Fragment>
                                  {/*
                                    <div>
                                      <Button
                                        className={clsx(props.classes.gridButtonDefault)}
                                        variant='contained' color='secondary' size='small'
                                        style={{marginRight: 4}}
                                        onClick={()=>setReportTab('defalut')}
                                      >
                                        LOG
                                      </Button>                                  
                                      <Button
                                        className={clsx(props.classes.gridButtonDefault)}
                                        variant='contained' color='secondary' size='small'
                                        style={{marginRight: 4}}
                                        onClick={(e)=>getSAReport(e)}
                                      >
                                        SA
                                      </Button>
                                      <Button
                                        className={clsx(props.classes.gridButtonDefault)}
                                        variant='contained' color='secondary' size='small'
                                        onClick={(e)=>getDAReport(e)}
                                      >
                                        DA
                                      </Button>                                    
                                    </div>                 
                                  */}
                                  <Paper className={props.classes.pagingButtonContainer}>
                                    <Pagination count={countValue === 'all' ? 1 : Math.ceil(logStore.countLogItems/countValue)} size="small" onChange={(e, page) => pagingData(page)} className={props.classes.pagingListContainer} />
                                    <TextField
                                      id='input-limit'
                                      variant='outlined' color='secondary' size='small' select
                                      label={'Limit'}
                                      value={limitValue}
                                      className={props.classes.limitSelectBox}
                                      onChange={(e)=>{setLimitValue(e.target.value)}}
                                      SelectProps={{
                                        SelectDisplayProps: {style: {width: 40, paddingTop: 7, paddingBottom: 4}}
                                      }}
                                      InputProps={{
                                        classes: { root: props.classes.limitInput }
                                      }}                                
                                    >
                                      {limitValueList.map((value) => (
                                        <MenuItem key={value} value={value}>
                                          {value}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                    <Button
                                      className={clsx(props.classes.gridButtonDefault, props.classes.gridButtonNext)}
                                      variant='contained' color='secondary' size='small'
                                      disabled={!logStore.lastKeyItemPaging ? true : false}
                                      onClick={(e)=>getLogItems({
                                        basketId: basketId,
                                        limit: limitValue,
                                        lastKey: logStore.lastKeyItemPaging.seq,
                                        seqLast: logStore.reports[logStore.selectedReportIndex].reportItem.basicInfo.seqLast,
                                        seqFirst: logStore.reports[logStore.selectedReportIndex].reportItem.basicInfo.seqFirst,
                                        options: logStore.reports[logStore.selectedReportIndex].requestParams.options,
                                      })}
                                    >
                                      {`GET NEXT ${limitValue}`}
                                    </Button>
                                  </Paper>
                                </React.Fragment>
                              )}
                            </Box>
                            <TableContainer ref={refTableContainer} className={props.classes.tablecontainer}>
                              {logStore.items.length>0 && (
                                <React.Fragment>
                                  <LogTable convertTimestamp={convertTimestamp} reportOption={reportOption} timeStart={timeStart} />
                                  <Box className={clsx(props.classes.floatingBottomButtonBox)}>
                                    <Chip
                                      label={logStore.countLogItems}
                                      className={clsx(props.classes.floatingCount)}
                                      variant='outlined'
                                    />
                                    <Button
                                      className={clsx(props.classes.gridButtonDefault, props.classes.floatingButton)}
                                      variant='contained' color='secondary' size='small'
                                      disabled={!logStore.lastKeyItemPaging ? true : false}
                                      onClick={(e)=>getLogItems({
                                        basketId: basketId,
                                        limit: limitValue,
                                        lastKey: logStore.lastKeyItemPaging.seq,
                                        seqLast: logStore.reports[logStore.selectedReportIndex].reportItem.basicInfo.seqLast,
                                        seqFirst: logStore.reports[logStore.selectedReportIndex].reportItem.basicInfo.seqFirst,
                                        options: logStore.reports[logStore.selectedReportIndex].requestParams.options,
                                      })}
                                    >
                                      {`GET NEXT ${limitValue}`}
                                    </Button>
                                  </Box>
                                </React.Fragment>
                              )}
                            </TableContainer>
                          </React.Fragment>
                        )}
                        {logChartOpen && (
                          <React.Fragment>
                            <Box className={clsx(props.classes.searchResultTableBoxHeader)}>
                              <ToggleButtonGroup
                                value={viewType}
                                exclusive
                                onChange={handleViewType}
                                aria-label="view type"
                                size="small"
                                className={clsx(props.classes.chartviewtype)}
                              >
                                <ToggleButton value="chart" aria-label="chart view" size="small" style={{ padding: 3, border: 'none' }}>
                                  <BarChart />
                                </ToggleButton>
                                <ToggleButton value="table" aria-label="table view" size="small" style={{ padding: 3, border: 'none' }}>
                                  <TableChart />
                                </ToggleButton>
                              </ToggleButtonGroup>                    
                            </Box>          
                            <Box ref={refChartContainer} className={props.classes.chartcontainer} component="div" display="block">
                              <LogChart viewType={viewType} />
                            </Box>
                          </React.Fragment>
                        )} 
                      </AccordionDetails>                
                    )}
                  </React.Fragment>
                )}
              </Accordion>             
            )))}          
          </Box>
        </div>
      </Box>
      <Dialog
        open={dialogContent===false?false:true}
        onClose={()=>setDialogContent(false)}
        aria-labelledby=""
        aria-describedby=""
      >
        {dialogContent}
        <DialogActions>
          <Button onClick={()=>setDialogContent(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {loadingState && (<LoadingIndicator backgroundLayer wholepage iconSize={80} />)}
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
  outContainer: {
    position: 'relative',
    height: '100%',
    borderBottom: '1px solid #eee',
    padding: theme.spacing(2)
  },
  searchOptionContainer: {
    // position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
  },
  chipListBox: {
    position: 'relative',
    display: 'inline-block',
    width: 300,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      display: 'block',
      margin: '0 auto 0.5rem'
    }     
  },
  chipListBoxExpand: {
    zIndex: 9999,
  },
  chipListScrollOutbox: {
    border: '1px solid #c4c4c4',
    borderRadius: theme.spacing(0.5),
    overflow: 'hidden',
    marginRight: theme.spacing(1),
    height: 40,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      margin: 0
    }    
  },
  chipListScrollOutboxExpand: {
    overflow: 'visible',
    border: 'none',
  },
  chipListScrollInbox: {
    width: 'calc(100% + 17px)',
    boxSizing: 'content-box',
    overflowY: 'scroll',
    backgroundColor: '#fff',
  },
  chipListScrollInboxExpand: {
    overflowY: 'visible',
    width: 'calc(100% - 2px)',
    border: '1px solid #c4c4c4',
    borderRadius: theme.spacing(0.5),
  },
  chipListPaddingInbox: {
    padding: theme.spacing(1),
    paddingBottom: 3,
  },
  chipListPaddingInboxExpand: {
    
  },
  selectAlignBox: {
    display: 'inline-block',
    verticalAlign: 'middle',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      width: '100%'
    }    
  },
  resultContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  searchHistoryListBox: {
    minWidth: 190,
    maxWidth: 190,
    marginRight: theme.spacing(1)
  },
  addIconButton: {
    padding: 9,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: '0.5rem 0 0'
    }     
  },
  searchOptionListButtonBox : {
    position: 'absolute',
    top: 7,
    right: 12,
  },
  iconArrowDownward: {
    transform: 'rotate(180deg)',
  },
  gridButtonNext: {
    marginLeft: theme.spacing(0.5),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: '0 0 0.5rem'
    }    
  },
  gridButtonFromLeft: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: '0.5rem 0 0',
      fontSize: '0.9rem',
      minHeight: 'auto'
    }
  },
  tablecontainer: {
    position: 'relative',
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid #ddd'    
  },
  searchResultTableBoxHeader: {
    display: 'flex',
    margin: theme.spacing(0, 0, 1),
    // padding: theme.spacing(0, 1),
    padding: theme.spacing(0),
    backgroundColor: '#fff',
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: theme.spacing(1, 0)
    }        
  },
  pagingListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: 0
    }    
  },
  pagingInfoContainer: {
    flexGrow: 1,
    textAlign: 'left',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
  },
  pagingButtonContainer: {
    textAlign: 'right',
    backgroundColor: 'transparent',
    display: 'flex',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      flexDirection: 'column',
      width: '100%'
    }       
  },
  reportCount: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '1.5em',
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: '1.2em',
  },
  groupListOut: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    // display: 'flex',
    // display: 'flex',
    // flexDirection: 'column-reverse',
  },
  floatingBottomButtonBox: {
    position: 'fixed',
    bottom: theme.spacing(5/2),
    right: theme.spacing(5),
    zIndex: 1,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      bottom: 15,
      right: 15
    }    
  },
  floatingCount: {
    display: 'block',
    border: 'none',
    margin: 0,
    padding: 0,
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: '1.2em',
    letterSpacing: -3,
    textAlign: 'center',
    height: 'auto',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      fontSize: '1.5rem'
    }     
  },
  floatingButton: {
    display: 'block',
    width: '100%',
  },
  chartcontainer: {
    padding: theme.spacing(0, 1, 1),
    borderBottom: '1px solid #ddd'
  },
  searchResultAcco: {
    margin: '0!important',
    '&::before': {
      display: 'none'
    }
  },
  searchResultAccoSummary: {
    padding: 0,
    margin: 0,
    minHeight: 'auto!important',
    cursor: 'initial'
  },
  searchResultAccoContent: {
    padding: 0,
    margin: 0    
  },
  searchResultAccoExpanded: {
    margin: '0!important'        
  },
  searchResultAccoDetails: {
    flexDirection: 'column',
    padding: 0
  },
  basketInput: {
    margin: 0
  },
  searchDateWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      margin: '0.5rem 0'
    }    
  },
  optionSelectBox: {
    width: 160,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      width: '100%',
      margin: 0
    }    
  },
  keywordInputBox: {
    width: 140,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      width: '100%',
      margin: '1rem 0'
    }        
  },
  keywordInput: {
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      marginRight: 0
    }
  },
  selectOptionRuleBox: {
    width: 100,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      width: '100%',
      margin: 0
    }            
  },
  limitSelectBox: {
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      width: '100%',
      margin: '0.5rem 0'
    }
  },
  limitInput: {
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      margin: 0
    }
  },
  searchOptionWrap: {
    display: 'flex',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      display: 'block'
    }    
  },
  searchDateBtn: {
    margin: '0 2px',
    padding: '2px 4px',
    fontSize: '0.6rem',
    minWidth: 'auto'
  }
});
//=========================================================================
// export default withRouter(connect()(withStyles(styles)(LogListContainer)));
export default withStyles(styles,{withTheme:true})(LogListContainer);