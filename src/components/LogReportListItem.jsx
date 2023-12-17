/* global logger */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Chip, DialogContent, DialogContentText, DialogTitle, IconButton, Link, Button } from '@material-ui/core';
import { Block, GetApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//=========================================================================
const LogReportListItem = (props) => {
  const { logStore, connectionStore, paramStore } = useStore();
  const [isYongin] = useState(paramStore.queryString['basketId']==="b46h4397cf050k2490dm51eb"?true:false);
  // const [loadingState, setLoadingState] = useState(false);
  const [reportItem] = useState(props.reportItem);
  const [searchHistoryItem] = useState(props.searchHistoryItem);
  const [requestParams] = useState(props.requestParams);
  const [reportIndex] = useState(props.reportIndex);
  const [downloadable] = useState(reportItem.count<=30000?true:false);
  const [isSelected] = useState(logStore.selectedReportIndex===reportIndex?true:false);
  //========================================================================
  const getDownloadLink = (searchHistoryItem, yongin) => {
    if(downloadable)
    {
      logStore.getReportDownloadLink({
        connectionStore: connectionStore,
        setLoadingState: props.setLoadingState,
        data: {...searchHistoryItem, customer: yongin},
        callback:(_payload)=>{
          if(_payload.isSuccess&&_payload.isSuccess.fileLinkSet)
          {
            props.setDialogContent(
              <React.Fragment>
                <DialogTitle id={`dialogContentTitle-${_payload.isSuccess.fileLinkSet.fileName}`}>Download Link</DialogTitle>
                <DialogContent>
                  <DialogContentText id={`dialogContentText-${_payload.isSuccess.fileLinkSet.fileName}`}>
                    <Link className={clsx(props.classes.downloadLink)} href={_payload.isSuccess.fileLinkSet.preSignedURL}>
                      {_payload.isSuccess.fileLinkSet.fileName}
                    </Link>
                  </DialogContentText>
                </DialogContent>
              </React.Fragment>
            );
          }
          props.setLoadingState(false);
        }
      });
    }
    else
    {
      props.setDialogContent(
        <React.Fragment>
          <DialogTitle id={`dialogContentTitle-`}>Message</DialogTitle>
          <DialogContent>
            <DialogContentText id={`dialogContentText-`}>
              CSV 파일 다운로드는 3만건 이하만 가능합니다
            </DialogContentText>
          </DialogContent>
        </React.Fragment>
      );
    }
  };
  //========================================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  useEffect(() => {});
  //========================================================================
  useEffect(() => {}, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <div
        id={`log-report-${props.convertTimestamp(reportItem.timeBefore)}-${props.convertTimestamp(reportItem.timeStart)}`}
        className={isSelected ? clsx(props.classes.listItem, props.classes.selectedListItem) : clsx(props.classes.listItem,) }
        selected={isSelected}
        >
        <div className={props.classes.reportStyleCard}>
          <div className={props.classes.reportStyleCardContent} flexGrow={1}>
            <div className={clsx(props.classes.reportContent)}>
              <div className={clsx(props.classes.searchResultBox)}>
                <div className={clsx(props.classes.searchResultTime)}>
                  <p className={clsx(props.classes.timeTextBox, props.classes.timeTextBoxIn)}>{`${props.convertTimestamp(requestParams['time-start'])}`}</p>
                  <span> ~ </span>
                  <p className={clsx(props.classes.timeTextBox, props.classes.timeTextBoxIn)}>{`${props.convertTimestamp(requestParams['time-before'])}`}</p>
                </div>
                <p className={clsx(props.classes.countTextBox)}>{`${reportItem.count}`}</p>
                {(requestParams.options && requestParams.options.map((option, optionIndex) => (
                  <Chip
                    variant='outlined'
                    size='small'
                    label={`${option.target}-${option.value}-${option.rule}`}
                    style={{marginLeft:8}}
                  />
                )))}                
              </div>
            </div>
          </div>
          <div className={props.classes.reportStyleCardActions}>
            {isYongin&&(
              <IconButton
                aria-label='list' size='small'
                disabled={reportItem.count>0 ? false : true}
                className={clsx(props.classes.actionButton)}
                onClick={()=>props.selectYongin(reportIndex)}
                >
                <PlaylistAddCheckIcon />
              </IconButton>            
            )}
            <IconButton
              aria-label='list' size='small'
              disabled={reportItem.count>0 ? false : true}
              className={clsx(props.classes.actionButton)}
              onClick={()=>props.selectReport(reportIndex)}
              >
              <MenuIcon />
            </IconButton>
            {isYongin&&(
              <IconButton
                aria-label='csv download' size='small'
                disabled={reportItem.count>0 ? false : true}
                className={clsx(props.classes.actionButton)}
                onClick={(e)=>{getDownloadLink(searchHistoryItem, 'yongin')}}              
                >
                <GetAppOutlinedIcon />
              </IconButton>            
            )}            
            <IconButton
              aria-label='csv download' size='small'
              disabled={reportItem.count>0 ? false : true}
              className={clsx(props.classes.actionButton)}
              onClick={(e)=>{getDownloadLink(searchHistoryItem)}}
              >
              {downloadable?(<GetApp />):(<Block />)}
            </IconButton>
            <IconButton
              aria-label='chart' size='small'
              disabled={reportItem.count>0 ? false : true}
              className={clsx(props.classes.actionButton)}
              onClick={()=>props.selectReportChart(reportIndex)}
              >
              <EqualizerIcon />
            </IconButton>
            {(reportIndex===logStore.selectedReportIndex)&&(
              <React.Fragment>
                {props.isOpen ? (
                  <IconButton
                    aria-label='isOpen' size='small'
                    className={clsx(props.classes.actionButton)}
                    onClick={()=>props.handleIsOpen()}
                    >
                    <ExpandLessIcon />
                  </IconButton>              
                )
                  :
                (
                  <IconButton
                    aria-label='isOpen' size='small'
                    className={clsx(props.classes.actionButton)}
                    onClick={()=>props.handleIsOpen()}
                    >
                    <ExpandMoreIcon />
                  </IconButton>              
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  ));
};
//=========================================================================
const styles = theme => ({
  listItem: {
    // borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: 0,
    marginTop: -1,
    '&:nth-child(1)':{
      marginTop: 0,
    },
    listStyle: 'none',
    width: '100%',
    cursor: 'initial',
    borderBottom: '1px solid #ddd',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      padding: theme.spacing(1)
    }    
  },
  selectedListItem: {
    background: '#f2f2f2'
  },
  reportStyleCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    }    
  },
  reportStyleCardContent: {
    display: 'flex',
    alignItems: 'center'
  },
  reportStyleCardActions: {
    display: 'flex',
    flexDirection: 'row',
  },
  timeTextBox: {
    margin: 0,
    padding: 0,
    display:'inline-block'
  },
  searchResultBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    }    
  },
  countTextBox: {
    margin: 0,
    marginLeft:6,
    padding: 0,
    fontSize: '1.5em',
    fontWeight: '800',
    lineHeight: '.9em',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem'
    }        
  },
  actionButton: {
    margin: 0
  },
  downloadLink: {
    color: '#333!important'
  }
});
//=========================================================================
// export default withRouter(connect()(withStyles(styles)(LogReportListItem)));
export default withStyles(styles,{withTheme:true})(LogReportListItem);