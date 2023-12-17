/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
//=========================================================================
const LogChartSource = React.memo((props) => {
  const { chartStore } = useStore();
  const chartLable = [];
  const chartData = [];
  /*
  const getChartData = () => {
    chartStore.sourceList.map(data => {
      data['hours'] !== null ? chartLable.push([`${data[0]}`,`${data[1]}건`]) : chartLable.push(`${data[0]}`);
      data['count'] !== null ? chartData.push(data[1]) : chartData.push('');
    });
  };
  */
  const getChartData = () => {
    chartStore.sourceCount[0].map(data => {
      //========================================================================
      const sourcecode = data['sourcecode'] === null ? 'null' : data['sourcecode'];
      const count = data['count'] === null ? 'null' : data['count'];
      //========================================================================
      sourcecode !== null ? chartLable.push([`${sourcecode}`,`${count}건`]) : chartLable.push(`${data[0]}`);
      count !== null ? chartData.push(count) : chartData.push('');
    });
  };    
  //========================================================================
  const data = {
    labels: chartLable,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };  
  //========================================================================
  // componentDidMount
  useEffect(() => {
    getChartData();
    return () => { // componentWillunmount
    };
  }, []);
  //========================================================================
  return useObserver(() => (
    <React.Fragment>
      <Paper elevation={3} className={props.classes.innerWrap}>
        <h5 className={props.classes.title}>소스 현황</h5>
        <div className={props.classes.canvasWrap}>
          <Bar data={data} options={options} height={190} width={1000} />
        </div>
      </Paper>      
    </React.Fragment>    
  ));
});
//=========================================================================
const styles = theme => ({
  innerWrap: {
    padding: theme.spacing(2),
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;',
    borderRadius: 16,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      padding: theme.spacing(1.5),
    }    
  },
  canvasWrap: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '1rem',
    margin: '0 0 0.5rem'
  }
});
//=========================================================================
export default withStyles(styles,{withTheme:true})(LogChartSource);
