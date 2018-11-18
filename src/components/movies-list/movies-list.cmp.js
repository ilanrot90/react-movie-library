import React from 'react';
import { Col } from 'react-bootstrap';
import MovieCard from '../movie-card/movie.cmp';

const styles = {
  movieColumn: {
    marginBottom: 20
  }
}

const MoviesList = ({movies, isLoading}) => {
  const movieColumns = movies ? movies.map(movie => (
    <Col style={ styles.movieColumn } key={ movie.imdbID } className="col" sm={12} lg={3} bsClass="col">
      <MovieCard movie={movie} />
    </Col>
  )) : null;
  
  return (
    <React.Fragment>
      {movieColumns}
    </React.Fragment>
  );
}

export default MoviesList;
