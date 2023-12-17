/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import dateFormat from 'dateformat';
import { Bar } from 'react-chartjs-2';
//=========================================================================
const HanwhaHour = React.memo((props) => {
  const { hanwhaStore, chartStore } = useStore();
  const now = new Date();
  const today = dateFormat(new Date(),'yyyy-mm-dd');
  const nowHour = now.getHours();
  //========================================================================
  const chartLable = [];
  const chartData = [];
  const chartBg = [];
  const chartBorder = [];
  let lastIndex = nowHour;
  const getChartData = () => {
    hanwhaStore.hanwhaHourlyCount.map(datas => {
      datas.map((data,index) => {
        if (data['hours'] === lastIndex) {
          if (data['count'] === null) lastIndex--;
        }
        data['hours'] !== null ? chartLable.push([`${data['hours']}시`,`${data['count']}건`]) : chartLable.push(`${data['no']}시`);
        data['count'] !== null ? chartData.push(data['count']) : chartData.push('');
      });
    });
    for (let i = 0; i <= 23; i++) {
      if ((i === lastIndex && i !== 23) && (chartStore.selectReportDate === today)) {
        chartBg.push("rgba(54, 162, 235, 0.2)");
        chartBorder.push("rgb(54, 162, 235)");
      } else {
        chartBg.push("rgba(201, 203, 207, 0.2)");
        chartBorder.push("rgb(201, 203, 207)");
      }
    }
  };
  //========================================================================
  const data = {
    labels: chartLable,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartBg,
        borderColor: chartBorder,
        borderWidth: 1
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
        <h5 className={props.classes.title}>시간대별 접속현황 (추가)</h5>
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
export default withStyles(styles,{withTheme:true})(HanwhaHour);