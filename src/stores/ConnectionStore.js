/* global axios, logger, __SZKOITM */
import { observable } from 'mobx';

const connectionStore = observable({
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
  request(param) {
    // logger.debug('connectionStore:request - start ::', param);
    if(param.setLoadingState) param.setLoadingState(true);
    let _request = {method: param.method};
    if(param.currentAccount) _request['headers'] = {'Authorization': ``};
    if(param.method==='get'){
      _request.params = param.data;
      _request.url = `${process.env.URLPATH_PRODUCT_APIENDPOINT}${param.action}`;
      if(param.currentAccount) _request.headers.Authorization = `token ${process.env.TEMP_AUTH_TOKEN}`;
    }
    if(param.method==='post'){
      _request.data = param.data;
      _request.url = process.env.URLPATH_PRODUCT_APIENDPOINT;
      if(param.currentAccount) _request.headers.Authorization = `Basic ${process.env.TEMP_AUTH_TOKEN}`;
    }
    // logger.debug('connectionStore:request - end ::', _request);
    axios.request(_request).then(function(response) {
      param.callback(JSON.parse(response.data.Payload));
    });
  }
});

export { connectionStore };