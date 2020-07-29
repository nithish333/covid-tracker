import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Cards from "./components/Cards/Cards";
import SearchBar from "./components/SearchBar/SearchBar";
// import Map from "./components/Map/Map";
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
    };
  }
  async componentDidMount() {
    const responseFromUrl = await fetch("https://api.covid19api.com/summary");
    const data = await responseFromUrl.json();
    // console.log(data.Global);
    const confirmed = data.Global.TotalConfirmed;
    const recovered = data.Global.TotalRecovered;
    const deaths = data.Global.TotalDeaths;
    const lastUpdate = data.Date;
    // console.log(data.confirmed.value);
    // console.log(data);
    this.setState({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    });
  }
  handleCountryChange = async (event) => {
    if (event.target.value !== "Global") {
      const getCountryResponse = await fetch(
        `https://api.covid19api.com/live/country/${event.target.value}/status/confirmed
        `
      );
      const getCountryData = await getCountryResponse.json();
      // console.log(getCountryData);
      const confirmed = getCountryData[0].Confirmed;
      const recovered = getCountryData[0].Recovered;
      const deaths = getCountryData[0].Deaths;
      this.setState({
        confirmed,
        recovered,
        deaths,
      });
    } else {
      this.componentDidMount();
    }
  };
  render() {
    const { confirmed, recovered, deaths, lastUpdate } = this.state;
    return (
      <div className="App">
        <h2 className="Heading">covid-19 tracker</h2>

        <SearchBar
          handleCountryChange={(event) => this.handleCountryChange(event)}
        />
        <Cards
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          lastUpdate={lastUpdate}
        />
        <Chart confirmed={confirmed} recovered={recovered} deaths={deaths} />
        {/* <Map center={this.state.mapCenter} zoom={this.state.mapZoom} /> */}
      </div>
    );
  }
}
export default App;
