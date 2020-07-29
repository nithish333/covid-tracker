import React from "react";
import CountUp from "react-countup";
import "./Card.css";

const Card = ({ value, heading, name, lastUpdate }) => {
  return (
    <div className={`${name} Card`}>
      <p className="heading">{heading}</p>

      <p className="value">
        <b>
          <CountUp start={0} end={value} duration={2} separator="," />
        </b>
      </p>
      <p className="lastupdate">
        Last updated:{new Date(lastUpdate).toDateString()}
      </p>
    </div>
  );
};

export default Card;
