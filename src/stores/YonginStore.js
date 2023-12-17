/* global */
import { observable } from 'mobx';

const params = new URLSearchParams(window.location.search);
const yonginStore = observable({
  setStoreValue(key, value) {
    if (typeof key === 'object') return;
    if (key.includes('.')) {
      let keys = key.split('.');
      this[keys[0]][keys[1]] = value;
    }
    else {
      this[key] = value;
    }
  },
  yonginHs: params.get('basketId')==="hs6h9310th0n0k2490dm31ar"?true:false,
  yonginSourceList: [],
  yonginReward: [],
  yonginPoten: [],  
  clearStorage: () => {
    yonginStore.yonginSourceList = [];
    yonginStore.yonginReward = [];
    yonginStore.yonginPoten = [];     
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
    yonginStore.setStoreValue(arrName, chart);
    if(arrName === 'sourceList') {
      yonginStore.sourceLoading = true;
    }    
  }  
});

export { yonginStore };