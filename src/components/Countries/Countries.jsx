import React from "react";

import "./Countries.css";

const Countries = ({ countries, handleCountryChange }) => {
  return (
    <select className="Countries" onChange={handleCountryChange}>
      <option value="Global">Global</option>
      {countries.map((country, index) => {
        return (
          <option value={country} key={index}>
            {country}
          </option>
        );
      })}
    </select>
  );
};

export default Countries;
