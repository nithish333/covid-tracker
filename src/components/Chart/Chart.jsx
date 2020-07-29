import React from "react";
import "./Chart.css";
import { Bar } from "react-chartjs-2";

const Chart = ({ confirmed, recovered, deaths }) => {
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
  return (
    <div className="Chart">
      <Bar data={charData} width={70} height={40} options={{}} />
    </div>
  );
};

export default Chart;
