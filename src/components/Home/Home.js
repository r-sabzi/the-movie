import React, { Component } from "react";
import "./Home.css";
import { API_KEY, API_URL } from "../../config";

import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
// import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };
  componentDidMount() {
    this.setState({ loading: true });
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    this.fetchItem(endPoint);
  }
  fetchItem = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        this.setState({
          movies: [...this.state.movies, ...result.results]
        });
        console.log(this.state.movies);
      });
  };

  render() {
    return (
      <div className="rmdb-home">
        <HeroImage />
        <SearchBar />
        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }
}
