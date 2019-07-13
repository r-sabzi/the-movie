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
  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });
    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${this.state
        .currentPage + 1}`;
    } else {
      endpoint = `${API_KEY}search/movie/?api_key=${API_KEY}&query${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItem(endpoint);
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
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.result[0],
          currentPage: result.page,
          totalPages: result.total_pages
        });
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
