/* global */
import { observable } from 'mobx';

const chartStore = observable({
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
  hourlyCount: [],
  deviceCount: [],
  sourceCount: [],
  selectReportDate: "",
  sourceList: [],
  sourceConvertList: [],
  sourceGroupOneList: [],
  sourceGroupOneConvertList: [],
  sourceGroupTwoList: [],
  sourceGroupTwoConvertList: [],
  clearStorage: () => {
    chartStore.hourlyCount = [];
    chartStore.deviceCount = [];
    chartStore.sourceCount = [];
    chartStore.sourceList = [];
    chartStore.sourceConvertList = [];
    chartStore.sourceGroupOneList = [];
    chartStore.sourceGroupOneConvertList = [];
    chartStore.sourceGroupTwoList = [];
    chartStore.sourceGroupTwoConvertList = [];
    chartStore.sourceLoading = false;
    chartStore.selectReportDate = "";
  },
  getChart(arr, arrName, limit) {
    if(limit === null) limit = 30;
    const list = arr;
    const count = {};
    let chart = [];
    list.forEach((x) => { 
      count[x] = (count[x] || 0)+1; 
    });
    for (let data in count) {
        chart.push([data, count[data]]);
    }
    chart.sort((a, b) => {
        return a[1] - b[1];
    });
    chart = chart.reverse().slice(0, limit);
    chartStore.setStoreValue(arrName, chart);
    if(arrName === 'sourceList') {
      chartStore.sourceLoading = true;
    }    
  }    
});

export { chartStore };