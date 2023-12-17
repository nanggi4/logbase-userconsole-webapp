/* global */
import { observable } from 'mobx';
import { sourceIndex } from '../data/convertIndex';

const utilStore = observable({
  getNowDate: new Date(),
  convertCommas: (number) => {
    if (number === null || number === '' || number === undefined) return;
    if (typeof number === String) {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");   
    }
  },
  distinctArr: (arr) => {
    if(Array.isArray(arr) === false) return;
    let returnArr = [];
    arr.forEach((data) => {
      if (!returnArr.includes(data)) {
          returnArr.push(data);
      }
    });
    return returnArr;
  },
  isEmptyObject: (obj) => {
    return Object.keys(obj).length === 0;
  },    
  setWindowTop: () => {
    window.scrollTo(0, 0);  
  },
  removeHtml: (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const sanitized = temp.textContent || temp.innerText;
    return sanitized;
  },
  replaceAll: (str, searchStr, replaceStr) => {
    if (str && typeof str === 'string')
      return str.split(searchStr).join(replaceStr);
      return '';
  },    
  getDateFormat: (value) => {
    if (value) {
      var date, year, month, day;
      if (typeof value === 'string')
        value = value.substring(0, 10);
        if (typeof value.getMonth === 'function' || typeof value === 'string' && utilStore.validatedDate(value.length)) {
          date = new Date(value);
          year = date.getFullYear();
          month = '' + (date.getMonth() + 1);
          day = '' + date.getDate();
          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2)
            day = '0' + day;
          return [year, month, day].join('-');
        }
    }
    return value;
  },
  validatedDate: (value) => {
    value = utilStore.replaceAll(value, '-', '');
    if (value && value.length >= 8 && Number(value)) {
      const year = Number(value.substr(0, 4));
      const month = Number(value.substr(4, 2));
      const day = Number(value.substr(6, 2));
      const dayCond = day > 0;
      const short = [1, 3, 5, 7, 8, 10, 12];
      const shorter = [4, 6, 9, 11];
      const shortest = [2];
      const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      const februaryDay = isLeapYear ? 29 : 28;
      
      if (short.indexOf(month) >= 0)
        dayCond = dayCond && day <= 31;
      else if (shorter.indexOf(month) >= 0)
        dayCond = dayCond && day <= 30;
      else if (shortest.indexOf(month) >= 0)
        dayCond = dayCond && day <= februaryDay;
      return year >= 1900 && year < 3000 && (month >= 1 && month <= 12) && dayCond;
    }
    return false;
  },
  getDate: (date) => {
    const returnValue = '';
    const now = date ? date : new Date();
    const dd = now.getDate();
    const mm = now.getMonth() + 1;
    const yyyy = now.getFullYear();

    if (dd < 10)
        dd = '0' + dd;

    if (mm < 10)
        mm = '0' + mm;

    returnValue = yyyy + '' + mm + '' + dd;
    return returnValue;
  },
  convertNumber: (str, options) => {
    const _this = utilStore;
    if (str === null || str === '' || str === undefined) return;
    if (typeof str === 'string')
      if (str.indexOf('원') !== -1) str = str.replace('원', '');
      if (str.indexOf(',') !== -1) str = str.replace(',', '');
      if (options === 'comma') {
        _this.convertCommas(str);
      } else {
        return parseInt(str, 10); 
      }
    if (typeof str === 'number')
      return str;
  },
  getSourcecode: (sourcecode) => {
    let result = {};
    let data = {};
    let section1Code = ['operation', 'maturity', 'care', 'cancer', 'cham', 'child', 'report'];
    let section2Code = ['golfplan', 'house', 'fire', 'drive', 'codrive'];
    let section3Code = ['main'];    
    let sourceName = [];
    let sourceArr = [];
    let sourceCount= [];
    let sourceCount1= [];
    let sourceCount2= [];
    let sourceCount3= [];
    let sourceCountFinal = sourcecode.length;
    sourcecode.map(code => {
      section1Code.forEach(data => {
        if(code.campaigncode === data) sourceCount1.push(utilStore.convertData(code.sourcecode, 'sourcecode'));
      });
      section2Code.forEach(data => {
        if(code.campaigncode === data) sourceCount2.push(utilStore.convertData(code.sourcecode, 'sourcecode'));
      });
      section3Code.forEach(data => {
        if(code.campaigncode === data) sourceCount3.push(utilStore.convertData(code.sourcecode, 'sourcecode'));
      });      
      let campaign = code.campaigncode;
      let source = utilStore.convertData(code.sourcecode, 'sourcecode');
      sourceArr.push(source);
      let setArr = new Set(sourceArr);
      sourceName = [...setArr];
      sourceName = sourceName.sort();
      if(!Object.keys(data).includes(campaign)) {
        data[campaign] = [];
        data[campaign].push(source);
      } else {
        data[campaign].push(source);
      }
    });
    sourceCount = utilStore.getCountArray(sourceArr);
    sourceCount1 = utilStore.getCountArray(sourceCount1);
    sourceCount2 = utilStore.getCountArray(sourceCount2);
    sourceCount3 = utilStore.getCountArray(sourceCount3);    
    Object.entries(data).forEach(([key, value]) => {
      let countValue = utilStore.sortObject(utilStore.getCountArray(value));
      sourceName.forEach(source => {
        if(countValue[source]===undefined) { 
          countValue[source] = 0;
        }
        if(sourceCount1[source]===undefined) { 
          sourceCount1[source] = 0;
        }
        if(sourceCount2[source]===undefined) { 
          sourceCount2[source] = 0;
        }
        if(sourceCount3[source]===undefined) { 
          sourceCount3[source] = 0;
        }        
      });
      data[key] = countValue;
    });
    data = utilStore.hanwhaSourcecode(data, section1Code, section2Code, section3Code);
    result['data'] = data;
    result['sourceName'] = sourceName;
    result['sourceCountTotal'] = sourceCount;
    result['sourceCount1'] = sourceCount1;
    result['sourceCount2'] = sourceCount2;
    result['sourceCount3'] = sourceCount3;
    result['sourceCountFinal'] = sourceCountFinal;
    return result;
  },
  hanwhaSourcecode: (data, section1Code, section2Code, section3Code) => {
    let section1 = {};
    let section2 = {};
    let section3 = {};
    Object.entries(data).forEach(([key, value]) => {
      section1Code.forEach(code => {
        if(key === code) section1[code] = value;
      });
      section2Code.forEach(code => {
        if(key === code) section2[code] = value;
      });      
      section3Code.forEach(code => {
        if(key === code) section3[code] = value;
      });          
    });
    data = {};
    data['section1'] = section1;
    data['section2'] = section2;
    data['section3'] = section3;
    return data;
  },
  getCountArray(arr, limit) {
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
    return count;
  },
  sortObject(object) {
    let sortedObject = {};
    let key = [];
    let array = [];
    for (key in object) {
      if (object.hasOwnProperty(key)) array.push(key);
    }
    array.sort();
    for (key=0; key<array.length; key++) {
        sortedObject[array[key]] = object[array[key]];
    }
    return sortedObject;    
  },
  convertData(data, type) {
    if(data !== null && data !== '') data = data.toLocaleLowerCase();
    switch (type) {
      case 'device':
        if(data === null || data === '') return '알수없음';
        if (data === 'mobile') {
          data = '모바일';
        } else if (data === 'desktop') {
          data = '피씨';
        }
        break;
      case 'sourcecode':
        Object.entries(sourceIndex).forEach(([key, value]) => {
          if (data === key) {
            data = value;
          }
        });
        if(data === null || data === '') data = '홈페이지 배너';
        break;        
      default:
    }
    return data;
  },
  getWeekend: () => {
    const day = new Date().getDay();
    let result = {};
    switch (day) {
      case 0:
        result.startDate = -2;
        result.endDate = 0;
        return result;
      case 1:
        result.startDate = -3;
        result.endDate = -1;
        return result;
      case 2:
        result.startDate = -4;
        result.endDate = -2;
        return result;
      case 3:
        result.startDate = -5;
        result.endDate = -3;
        return result;
      case 4:
        result.startDate = -6;
        result.endDate = -4;
        return result;
      case 5:
        result.startDate = -7;
        result.endDate = -5;
        return result;
      case 6:
        result.startDate = -8;
        result.endDate = -6;
        return result;
    }
  }
});
//

export { utilStore };