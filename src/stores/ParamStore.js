/* global */
import { observable } from 'mobx';

const paramStore = observable({
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
  location: false,
  queryParams: false,
  queryString: false,
});

export { paramStore };
