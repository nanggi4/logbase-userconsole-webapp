/* global */
import { observable } from 'mobx';

const logStore = observable({
  setStoreValue(key, value) {
    if(typeof key === 'object') return;
    if(key.includes('.'))
    {
      let keys = key.split('.');
      this[keys[0]][keys[1]] = value;
    }
    else
    {
      this[key] = value;
    }
  },
  items: [],
  recentItems: {},
  reports: [],
  recentReports: {},
  pagingItems: [],
  page: 1,
  timeResult: [],
  timeLable: [],
  timeData: [],
  countLogItems: 0,
  lastKeyItemPaging: false,
  selectedReportIndex: false,
  getLogItemList(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-log-list',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      setLoadingState: param.setLoadingState,
      callback: param.callback
    });
  },
  getLogReport(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-log-report',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      setLoadingState: param.setLoadingState,
      callback: param.callback
    });
  },
  getReportDownloadLink(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-report-download-link',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      setLoadingState: param.setLoadingState,
      callback: param.callback
    });
  },
  downloadCSV(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: '',
      method: 'post',
      data: param.data,
      setLoadingState: param.setLoadingState,
      callback: param.callback
    });
  },
  sortData(id, order){
    let _items = logStore.pagingItems.slice().sort((a, b) => {
        if (order === 'asc') {
          if(a[id] === null || a[id] > b[id]) { return 1; }
          if(b[id] === null || a[id] < b[id]) { return -1; }
        } else {
          if(a[id] === null || a[id] < b[id]) { return 1; }
          if(b[id] === null || a[id] > b[id]) { return -1; }
        }
        return 0;
    });
    logStore.setStoreValue('pagingItems', _items);
  },
  pagingData(page, count) {
    // init data
    const initItems = logStore.items;
    // console.log('initItems', initItems);
    logStore.setStoreValue('pagingItems', initItems);
    // 값 고정 시켜둠
    count = 1000;
    if (count === 'all') {
      
    } else {
      const seq = page * count;
      const firstSeq = (page === 1) ? 0 : seq - count;
      const pagingItems = initItems.slice(firstSeq, seq);      
      logStore.setStoreValue('page', page);    
      logStore.setStoreValue('pagingItems', pagingItems);      
    }
  },
  timeChart(times) {
    let _timeCount = {};
    let _timeResult = [];
    let _timeLable = [];
    let _timeData = [];
    times.forEach((x) => { 
      _timeCount[x] = (_timeCount[x] || 0) + 1; 
    });
    for (let time in _timeCount) {
        _timeResult.push([time, _timeCount[time]]);
    }
    logStore.setStoreValue('timeResult', _timeResult);
    _timeResult.map((data) => {
      _timeLable.push(data[0]+"시");
      _timeData.push(data[1]);
    });
    logStore.setStoreValue('timeLable', _timeLable);
    logStore.setStoreValue('timeData', _timeData);    
  },
});

export { logStore };