import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Cards from "./components/Cards/Cards";
import SearchBar from "./components/SearchBar/SearchBar";
import Map from "./components/Map/Map";
import "leaflet/dist/leaflet.css";
import Chart from "./components/Chart/Chart";
import ChartView from "./components/ChartView/ChartView";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      newConfirmed: 0,
      newRecovered: 0,
      newDeaths: 0,
      lastUpdate: "",
      mapCenter: {
        lat: 34.80476,
        lng: -40.4796,
      },
      mapZoom: 3,
      countries: [],
      chartType: "Bar",
    };
  }
  async componentDidMount() {
    try {
      const responseFromUrl = await fetch("https://disease.sh/v3/covid-19/all");
      const data = await responseFromUrl.json();
      // console.log(data);
      const countriesResponse = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      const countryData = await countriesResponse.json();
      // console.log(countryData);
      // console.log(countries);

      const confirmed = data.cases;
      const recovered = data.recovered;
      const deaths = data.deaths;
      const lastUpdate = new Date();
      this.setState({
        confirmed,
        recovered,
        deaths,
        lastUpdate,
        mapCenter: {
          lat: 34.80476,
          lng: -40.4796,
        },
        mapZoom: 3,
        countries: countryData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //? Handle country change

  handleCountryChange = async (event) => {
    console.log(event.target.value);
    if (event.target.value !== "Global") {
      const getCountryResponse = await fetch(
        `https://disease.sh/v3/covid-19/countries/${event.target.value}
        `
      );
      const getCountryData = await getCountryResponse.json();
      // console.log(getCountryData);
      const confirmed = getCountryData.cases;
      const recovered = getCountryData.recovered;
      const deaths = getCountryData.deaths;
      this.setState({
        confirmed,
        recovered,
        deaths,
        mapCenter: {
          lat: getCountryData.countryInfo.lat,
          lng: getCountryData.countryInfo.long,
        },
        mapZoom: 5,
      });
    } else {
      this.componentDidMount();
    }
  };

  //? Handle chart change

  handleChartChange = (event) => {
    this.setState({
      chartType: event.target.value,
    });
  };
  render() {
    const {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      countries,
      chartType,
    } = this.state;
    return (
      <div className="App">
        <h2 className="Heading">covid-19 tracker</h2>

        <SearchBar
          handleCountryChange={(event) => this.handleCountryChange(event)}
          countries={countries}
        />
        <Cards
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          lastUpdate={lastUpdate}
        />
        <Map
          center={this.state.mapCenter}
          zoom={this.state.mapZoom}
          countries={countries}
        />
        <p className="more">
          (Click on the circles to know more about the country.)
        </p>
        <ChartView
          handleChartChange={(event) => this.handleChartChange(event)}
        />
        <Chart
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          chartType={chartType}
        />
        <p
          className="footer"
          style={{
            textAlign: "center",
            width: "100%",
            marginTop: "50px",
            borderTop: "1px solid #f3f3f3",
            padding: "20px",
            fontSize: "25px",
          }}
        >
          Created by <b>Nithish Kommineni</b>
        </p>
      </div>
    );
  }
}
export default App;
