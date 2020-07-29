import React from "react";
import "./ChartView.css";

const ChartView = ({ handleChartChange }) => {
  return (
    <div className="ChartView">
      <h3 className="chartHeading">Graph view</h3>
      <select className="charts" onChange={handleChartChange}>
        <option value="Bar">Select chart type</option>
        <option value="Bar">Bar</option>
        <option value="Line">Line</option>
        <option value="Doughnut">Doughnut</option>
        <option value="Polar">Polar</option>
        <option value="Radar">Radar</option>
      </select>
    </div>
  );
};
export default ChartView;
