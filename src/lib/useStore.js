/* global */
import { connectionStore } from '../stores/ConnectionStore';
import { logStore } from '../stores/LogStore';
import { chartStore } from '../stores/ChartStore';
import { paramStore } from '../stores/ParamStore';
import { themeStore } from '../stores/ThemeStore';
import { uiStore } from '../stores/UiStore';
import { utilStore } from '../stores/UtilStore';
import { yonginStore }  from '../stores/YonginStore';
import { hanwhaStore }  from '../stores/HanwhaStore';

const useStore = () => {
  return {
    connectionStore,
    logStore,
    chartStore,
    paramStore,
    themeStore,
    uiStore,
    utilStore,
    yonginStore,
    hanwhaStore
  };
};

export default useStore;