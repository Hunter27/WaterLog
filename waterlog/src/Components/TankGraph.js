import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const TankGraph = (props) => {
  let labelX = props.props.dailytankgraph.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  let dataY = props.props.dailytankgraph.dataPoints.map(a => Math.round(a.y));
  /*var start = new Date(Date.now());
  var end = new Date(Date.now());
  var startT2 = start.setTime("00:00:01");
  var endT2 = end.setTime("23:59:00");
  let startTime = Math.floor(startT2/1000);
  let endTime =  Math.floor(endT2/1000);

  let forecast = [];
  for(let i = startTime; i <= endTime; i = i + 3600){
    forecast.push(1*i + 80);
  }*/
  
  let data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      /*{
        label: 'forecast',
        data: forecast,
        fill: true,
        borderColor: 'rgba(0,191,255,1)', 
        backgroundColor: 'rgba(255,23,68,0.4)',
        pointBackgroundColor: 'rgba(0,191,255,1)',
        pointRadius: 5,
        pointHitRadius: 5
      },*/
      {
        label: 'rands',
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
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: 'rgba(255,0,0,1)'
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
          labelString: 'forcastDaysPercent'
        },
        gridLines: {
          display: false
        }
      }]
    }
  }
  defaults.global.legend.display = false;
  return (
    <div className="Usage">
      <Line options={options} data={data} />
    </div>
  )
}

export default TankGraph; 
