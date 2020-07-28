import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = ({ confirmed, recovered, deaths, lastUpdate }) => {
  return (
    <div className="Cards">
      <Card
        value={confirmed}
        heading="Total no of confirmed cases"
        name="confirmed"
        lastUpdate={lastUpdate}
      />
      <Card
        value={recovered}
        heading="Total no of recovered cases"
        name="recovered"
        lastUpdate={lastUpdate}
      />
      <Card
        value={deaths}
        heading="Total no of death cases"
        name="deaths"
        lastUpdate={lastUpdate}
      />
    </div>
  );
};

export default Cards;
