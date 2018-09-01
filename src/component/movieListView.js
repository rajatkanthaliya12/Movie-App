import React, { Component } from "react";

export default class MovieListView extends Component {
  render() {
    const movie = this.props.movie;
    return (
      <div onClick={() => this.props.onSelect(movie.movie_title)} className="col-sm-12 col-md-6 movie-card">
        <div className="movie-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center bg-light">
          <div className=" col-sm-6 col-md-6 position-relative border-gray border-right px-2 bg-white rounded-left">
            {movie.movie_title}
          </div>

          <div className="px-3 col-sm-6 col-md-6">
            <span className="movie-name text-dark d-block font-weight-bold">{"Year"}</span>

            <span className="movie-region text-secondary text-uppercase">{movie.title_year}</span>
          </div>
        </div>
      </div>
    );
  }
}
