/* global */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SvgIcon, Typography } from '@material-ui/core';
import clsx from 'clsx';
const loadingIconSVG = 'M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z';
//=========================================================================
class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);
    const min = 10000;
    const max = 99999;
    this.loadingIconDegree = 0;
    this.hashNumber = Math.floor(Math.random() * (max - min)) + min;
    this.iconSize = { fontSize: 60, };
    if (this.props.iconSize) this.iconSize.fontSize = this.props.iconSize;
    if (this.props.boxPadding || this.props.boxPadding == 0) this.iconSize.padding = this.props.boxPadding;
  }
  //=========================================================================
  render() {
    const _this = this;
    return (
      <React.Fragment>
        <div className={clsx(_this.props.classes.loadingContainer,{[_this.props.classes.loadingContainerWholepage]: _this.props.wholepage})}>
          <div className={clsx(_this.props.classes.loadingContainerInbox)}>
          <div className={clsx(_this.props.classes.loadingBackgroundBox,{[_this.props.classes.loadingBackgroundBoxActive]: _this.props.backgroundLayer})}></div>
          <div className={clsx(_this.props.classes.loadingContentBox)}>
            {(_this.props.message) && (
              <Typography className={clsx(_this.props.classes.loadingTypography)}>{_this.props.message}</Typography>
            )}
            <div className={clsx(_this.props.classes.loadingIconBox)}>
              <div style={_this.iconSize} className={clsx(_this.props.classes.loadingIconInBox)}>
                <SvgIcon id={'loading-icon-'+_this.hashNumber} className={clsx(_this.props.classes.loadingIcon)}>
                  <path fill='#333' d={loadingIconSVG} />
                </SvgIcon>
              </div>
            </div>
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
//=========================================================================
const styles = theme => ({
  disabled: {},
  selected: {},
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainerWholepage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loadingContainerInbox: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBackgroundBox: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loadingBackgroundBoxActive: {
    background: 'rgba(0, 0, 0, 0.2)',
  },
  loadingContentBox: {},
  loadingTypography: {
    margin: theme.spacing(0.5),
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '-40px',
  },
  loadingIconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: `$rotate 2s infinite linear`,
    position: 'relative',
    zIndex: 1000
  },
  "@keyframes rotate": {
    "100%": {
      transform: 'rotate(-360deg)'
    },
  },  
  loadingIconInBox: {
    padding: theme.spacing(2),
    width: 120,
    height: 120
  },
  loadingIcon: {
    display: 'block',
    fontSize: 'inherit',
    width: '100%!important',
    height: '100%!important'
  },
});
//=========================================================================
export default withStyles(styles)(LoadingIndicator);