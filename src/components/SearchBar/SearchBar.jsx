import React from "react";
import "./SearchBar.css";
import Countries from "../Countries/Countries";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }
  async componentDidMount() {
    try {
      const countriesResponse = await fetch(
        "https://covid19.mathdro.id/api/countries"
      );
      const countriesArray = await countriesResponse.json();

      const countries = countriesArray.countries.map((country) => country.name);

      this.setState({
        countries: countries,
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="SearchBar">
        <Countries
          countries={this.state.countries}
          handleCountryChange={this.props.handleCountryChange}
        />
      </div>
    );
  }
}

export default SearchBar;
