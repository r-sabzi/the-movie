import React, { Component } from "react";
import { API_KEY, API_URL } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

export default class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });

    const endpoint = `${API_URL}movie/${
      this.props.match.params.movieId
    }?api_key=${API_KEY}`;
    this.fetchItems(endpoint);
  }
  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            const endpoint = `${API_URL}movie/${
              this.props.match.params.movieId
            }/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(
                  member => member.job === "Director"
                );
                this.setState({
                  actors: result.cast,
                  directors,
                  loading: false
                });
              });
          });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="rmdb-movie">
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
        <FourColGrid />
        <Spinner />
      </div>
    );
  }
}
