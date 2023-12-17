/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../lib/useStore';
import LogListContainer from './LogListContainer';
// import LotteInsContainer from './LotteInsContainer';
import { TextField, Button } from '@material-ui/core';
//====================================================================
// logger.debug(`ContentContainer::Loaded`);
//====================================================================
const ContentContainer = (props) => {
  const { paramStore, yonginStore } = useStore();
  const [code, setCode] = useState(false);
  //====================================================================
  const checkCode = () => {
    if(!code) { alert('입장코드를 입력하세요.'); return; }
    if(code!==process.env.HONORSTAR_CODE) { alert('입장코드가 맞지 않습니다.'); return; }
    if(code===process.env.HONORSTAR_CODE) yonginStore.setStoreValue('yonginHs', false);
  };
  //====================================================================
  useEffect(() => {
    return () => {};
  }, []);
  //====================================================================
  return useObserver(() => (
    <React.Fragment>
      <div className={clsx(props.classes.contentContainerOutBox)}>
        {paramStore.queryParams.servicePath===process.env.CONST_PRODUCTNAME_LOGBASE && (
          <React.Fragment>
            {!yonginStore.yonginHs?(
              <LogListContainer />
            ):(
              <div className={clsx(props.classes.codeWrap)}>
                <TextField
                  id="honorstar-password-input"
                  label="입장코드를 입력하세요."
                  type="password"
                  variant="outlined"
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => checkCode()}
                >
                  입력
                </Button>                
              </div>
            )}
          </React.Fragment>
        )}
        {/*paramStore.queryParams.servicePath===process.env.CONST_PRODUCTNAME_LOTTEINS && (<LotteInsContainer />)*/}
      </div>
    </React.Fragment>
  ));
};
//====================================================================
const styles = theme => ({
  disabled: {},
  selected: {},
  contentContainerOutBox: {
    width: '100%',
    height: `calc((100vh - ${theme.spacing(parseInt(process.env.THEME_HEIGHT_TOPBAR,10))}px))`
  },
  codeWrap: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  }
});
//====================================================================
export default withStyles(styles)(ContentContainer);
