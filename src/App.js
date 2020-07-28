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
      lastUpdate: "",
      mapCenter: {
        lat: 34.80476,
        lng: -40.4796,
      },
      mapZoom: 3,
    };
  }
  async componentDidMount() {
    const responseFromUrl = await fetch("https://covid19.mathdro.id/api");
    const data = await responseFromUrl.json();
    const confirmed = data.confirmed.value;
    const recovered = data.recovered.value;
    const deaths = data.deaths.value;
    const lastUpdate = data.lastUpdate;
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
        `https://covid19.mathdro.id/api/countries/${event.target.value}`
      );
      const getCountryData = await getCountryResponse.json();
      // console.log(getCountryData);
      const confirmed = getCountryData.confirmed.value;
      const recovered = getCountryData.recovered.value;
      const deaths = getCountryData.deaths.value;
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
