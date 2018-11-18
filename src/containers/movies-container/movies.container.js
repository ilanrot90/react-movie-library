import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row } from 'react-bootstrap';
import { AppBar } from 'material-ui';
import { loadMovies } from '../../store/actions/movies.action';
import { addMovie } from '../../store/actions/movies.action';
import MoviesList from '../../components/movies-list/movies-list.cmp';
import DeleteConfirm from '../../components/confirm-delete/confirm.cmp';
import { findMoviesToShow } from '../../services/api.service';
import MovieModal from '../movie-modal/modal.container';
import SearchBar from '../../components/searchbar/searchbar.cmp';
import './style.css';

class MovieContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    this.props.loadMovies();
  }

  handleInputChange = (value) => { 
    this.setState({ value })
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();

    let value = this.state.value;
    let movie = await findMoviesToShow(value)
    this.setState({
      value: ''
    })

    let isNew = this.props.movies.every( movieItem => movieItem.imdbID !== movie.imdbID )
    
    if(movie && isNew) {
      this.props.addMovie(movie)
    }
  }

  components = {
    modal: MovieModal,
    confirm: DeleteConfirm,
  }

  render() {
    const  { movies, isOpenModal }  = this.props
    const TagName = this.components[this.props.tag || 'modal'];

    return (
      <div>
        <AppBar title='Your oun movie library' />
        <Grid>
          <Row>
            <SearchBar handleInputChange= {(ev) => this.handleInputChange(ev.target.value)} handleSubmit={this.handleSubmit}/>
          </Row>
          <Row>
            <MoviesList movies={ movies } isLoading={ false } className="row"/>
          </Row>
        </Grid>

        { isOpenModal && <TagName/>}
      </div>
    );
  }
}
function mapStateToProps( state ) {
  return {
    movies: state.movies.moviesResult,
    isOpenModal: state.modalState.isOpen,
    tag: state.modalState.tag
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(loadMovies()),
    addMovie: (movie) => dispatch(addMovie(movie))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(MovieContainer);