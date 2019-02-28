import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import {Globals } from './../Globals';

const DailyWastageComponent = (props) => {
  console.log("ama props: ",props);
  var labelX = props.props.placeholder.map(a => (new Date(a).getHours() + ":00"));
  var dataY = props.props.dailyWaste.dataPoints.map(a => Math.round(a.y));
  var sum = dataY.reduce((a, b) => a + b, 0); 
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,
        borderColor: 'rgba(255,23,68,1)',
        backgroundColor: 'rgba(255,23,68,0.4)',
        pointBackgroundColor: 'rgba(255,23,68,1)',
        pointRadius: 5,
        pointHitRadius: 5
      }
    ]
  }
  var options = {
    defaultFontFamily: "Roboto",
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'hours'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: 'rgba(145, 145, 145, 1)'
          }
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'liters'
        },
        gridLines: {
          display: false
        }
      }]
    }
  }
  defaults.global.legend.display = false;
  return (
    <div className="wastage-graph"> 
      <div className="head"><b>R {(Math.round(sum * Globals.WATER_COST))}</b><b className="dailysubhead"> lost so far</b></div> 
      <Line options={options} data={data} />
    </div>
  )
}
export default DailyWastageComponent;
