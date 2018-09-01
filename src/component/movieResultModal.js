import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";

export default class MovieResultModal extends Component {
  render() {
    const movie = this.props.selectedMovie;
    return (
      <div>
        <Modal show={movie.movie_title && true} onHide={this.props.clearMovie}>
          <Modal.Header>
            <Modal.Title>
              {movie.movie_title}- ({movie.title_year})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Director: </strong>
                <span>{movie.director_name}</span>
              </li>
              <li className="list-group-item">
                <strong>Actors: </strong>
                <span>
                  {movie.actor_1_name}, {movie.actor_2_name}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Genres: </strong>
                <span>{movie.genres}</span>
              </li>
              <li className="list-group-item">
                <strong>
                  <a href={movie.movie_imdb_link} target="blank">
                    More Details
                  </a>{" "}
                </strong>
              </li>
            </ul>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.clearMovie}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
