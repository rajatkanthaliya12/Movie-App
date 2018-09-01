import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./component/pagination";
import MovieListView from "./component/movieListView";
import MovieResultModal from "./component/movieResultModal";
import ReactAutocomplete from "react-autocomplete";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      allMovies: [],
      currentMovies: [],
      currentPage: null,
      totalPages: null,
      sortBy: null,
      selectedMovie: "",
      MovieResult: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://starlord.hackerearth.com/movieslisting")
      .then(response => {
        this.setState({ loading: false, allMovies: response.data });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  }

  onPageChanged = data => {
    const { allMovies } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentMovies = allMovies.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentMovies, totalPages });
  };

  compareBy = key => {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  sortBy = sortBy => {
    let allMovies = [...this.state.allMovies];
    allMovies.sort(this.compareBy(sortBy));
    this.setState({ sortBy, allMovies });
  };

  clearMovie = () => {
    this.setState({ MovieResult: {}, selectedMovie: "" });
  };

  onSelect = selectedMovie => {
    let movies = this.state.allMovies;
    movies = this.state.allMovies.find(obj => obj.movie_title === selectedMovie);
    if (movies) {
      movies = this.state.allMovies.find(obj => obj.movie_title === selectedMovie);
      this.setState({ selectedMovie: selectedMovie, MovieResult: movies });
    }
  };

  render() {
    const { allMovies, currentMovies, currentPage, totalPages } = this.state;
    const totalMovies = allMovies.length;
    const headerClass = ["text-dark py-2 pr-4 m-0", currentPage ? "border-gray border-right" : ""].join(" ").trim();

    return this.state.loading ? (
      <div id="loader" />
    ) : (
      <div id="App">
        {this.state.error ? (
          <div class="alert alert-danger">
            <strong>Error! </strong>
            <span>Network Error: Please Try again or check your internet connection.</span>
          </div>
        ) : (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalMovies}</strong> Movies
                  </h2>

                  {currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                      <span className="font-weight-bold">{totalPages}</span>
                    </span>
                  )}
                </div>

                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination
                    totalRecords={totalMovies}
                    pageLimit={18}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                    sortBy={this.state.sortBy}
                  />
                </div>
              </div>
              <div className="w-100 px-4  d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row flex-wrap align-items-center">
                  <h2>Sort By : </h2>
                  <button
                    className={this.state.sortBy === "movie_title" ? "btn btn-primary" : "btn"}
                    onClick={() => this.sortBy("movie_title")}>
                    Name
                  </button>
                  <button
                    className={this.state.sortBy === "title_year" ? "btn btn-primary" : "btn "}
                    onClick={() => this.sortBy("title_year")}>
                    Year
                  </button>
                </div>
                <div className="autocomplete d-flex flex-row flex-wrap align-items-center">
                  <h2>Search</h2>
                  <ReactAutocomplete
                    items={this.state.allMovies}
                    shouldItemRender={(item, value) => item.movie_title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.movie_title}
                    renderItem={(item, highlighted) => (
                      <div style={{ backgroundColor: highlighted ? "#eee" : "white" }}>{item.movie_title}</div>
                    )}
                    value={this.state.selectedMovie}
                    onSelect={selectedMovie => this.onSelect(selectedMovie)}
                    onChange={e => this.setState({ selectedMovie: e.target.value })}
                  />
                </div>
              </div>
              <div className="row movie-list">
                {currentMovies.map((movie, i) => (
                  <MovieListView onSelect={this.onSelect} key={i} movie={movie} />
                ))}
              </div>
            </div>
            {this.state.MovieResult.movie_title && (
              <MovieResultModal selectedMovie={this.state.MovieResult} clearMovie={this.clearMovie} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
