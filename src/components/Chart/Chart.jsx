import React from "react";
import "./Chart.css";
import { Bar, Doughnut, Line, Radar, Polar } from "react-chartjs-2";

const Chart = ({ confirmed, recovered, deaths, chartType }) => {
  const charData = {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Total no of covid cases ",
        data: [confirmed, recovered, deaths],
        backgroundColor: ["#0a7ea2", "#60bea0", "#db565d"],
      },
    ],
  };

  const viewChartType = chartType;
  if (viewChartType === "Bar")
    return <Bar data={charData} width={70} height={30} options={{}} />;
  else if (viewChartType === "Doughnut")
    return <Doughnut data={charData} width={70} height={30} options={{}} />;
  else if (viewChartType === "Line")
    return <Line data={charData} width={60} height={20} options={{}} />;
  else if (viewChartType === "Polar")
    return <Polar data={charData} width={70} height={30} options={{}} />;
  else if (viewChartType === "Radar")
    return <Radar data={charData} width={70} height={30} options={{}} />;
  return <div className="Chart">{viewChartType}</div>;
};

export default Chart;

/* 
<Bar data={charData} width={70} height={40} options={{}} /> */
