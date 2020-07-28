import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Cards from "./components/Cards/Cards";
import SearchBar from "./components/SearchBar/SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lastUpdate: "",
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
        <Cards
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          lastUpdate={lastUpdate}
        />
        <SearchBar
          handleCountryChange={(event) => this.handleCountryChange(event)}
        />
      </div>
    );
  }
}
export default App;
