import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

export default class SearchBar extends Component {
  state = {
    value: ""
  };
  timeout = null;
  doSearch = event => {
    console.log("dosearch");
    this.setState({
      value: event.target.value
    });
    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}
