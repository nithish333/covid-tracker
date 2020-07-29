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
        "https://api.covid19api.com/summary "
      );
      const countriesArray = await countriesResponse.json();
      // console.log(countriesArray.Countries);
      const countries = countriesArray.Countries.map(
        (country) => country.Country
      );
      // console.log(countries);
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
