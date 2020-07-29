import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Cards from "./components/Cards/Cards";
import SearchBar from "./components/SearchBar/SearchBar";
import Map from "./components/Map/Map";
import "leaflet/dist/leaflet.css";
import Chart from "./components/Chart/Chart";
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
        mapZoom: 4,
      });
    } else {
      this.componentDidMount();
    }
  };
  render() {
    const { confirmed, recovered, deaths, lastUpdate, countries } = this.state;
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
        <Chart confirmed={confirmed} recovered={recovered} deaths={deaths} />
      </div>
    );
  }
}
export default App;
