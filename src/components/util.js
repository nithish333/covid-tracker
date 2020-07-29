import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#cc1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country, index) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
      key={index}
    >
      <Popup>
        <div className="popup-container">
          <div
            className="popup-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="popup-country">
            <b>{country.country}</b>
          </div>
          <div className="popup-cases">
            Cases : {numeral(country.cases).format("0,0")}
          </div>
          <div className="popup-recovered">
            Recovered : {numeral(country.recovered).format("0,0")}
          </div>
          <div className="popup-deaths">
            Deaths : {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
