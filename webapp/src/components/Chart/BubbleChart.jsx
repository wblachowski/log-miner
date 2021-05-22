import React, { useRef } from "react";
import { Bubble } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { clusterClicked } from "../../actions/actionCreators";
import wrap from "word-wrap";
import _ from "lodash";

const transformToPoint = (log, minCount, maxCount) => {
  let {
    count,
    position: [x, y],
  } = log;

  return {
    x,
    y,
    r: ((count - minCount) / maxCount) * 50 + 8,
  };
};

const BubbleChart = ({ data: logs }) => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();

  const maxCount = Math.max(...logs.map((log) => log.count));
  const minCount = Math.min(...logs.map((log) => log.count));
  const parsedData = _.sortBy(logs.map((log) =>
    transformToPoint(log, minCount, maxCount)
  ),'r');
  

  const data = {
    labels: ["Clusters"],
    datasets: [
      {
        label: "cluster",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: parsedData,
      },
    ],
  };

  const options = {
    onClick: (e, item) => {
      if (item[0]) {
        const idx = item[0]._index;
        dispatch(clusterClicked(idx, true));
      }
    },
    hover: {
      onHover: function (e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = "pointer";
        else e.target.style.cursor = "default";
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      titleFontSize: 16,
      bodyFontSize: 16,
      displayColors: false,
      mode: "label",
      callbacks: {
        label: function (tooltipItem, data) {
          const idx = tooltipItem.index;
          return wrap(logs[idx].pattern, { width: 100 }).split(/\n/);
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            max: 1,
            min: -1,
            stepSize: 1,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            max: 1,
            min: -1,
            stepSize: 1,
          },
        },
      ],
    },
  };

  console.log(logs);

  return <Bubble ref={chartRef} data={data} options={options} />;
};

export default BubbleChart;
