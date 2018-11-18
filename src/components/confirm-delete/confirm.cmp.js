import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { closeMovieModal } from '../../store/actions/modal.action';
import { updateMovie } from '../../store/actions/movies.action';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeleteConfirm extends Component {

  handleDelete = (movieId, fn) => {
      let movies = this.props.movies.filter( movie => movie.imdbID !== movieId );

      this.props.updateMovie(movies);
      //close modal
      fn();
  }

  render() {
    const { handleCloseModal, movieId, isOpen, movies } = this.props;
    const selectedMovie = movies.find( movieItem => movieItem.imdbID === movieId ).Title;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Slide in alert dialog</Button>
        <Dialog
          open={ isOpen }
          TransitionComponent={Transition}
          keepMounted
          onClose={ () => handleCloseModal }
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Delete movie
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You are about to delete { selectedMovie } from your movie library,
              to continue press Delete, else press Cencel.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseModal } color="primary">
              Cancel
            </Button>
            <Button onClick={ () => this.handleDelete(movieId, handleCloseModal)} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps( state ) {
    return {
      isOpen: state.modalState.isOpen,
      movieId: state.modalState.movieId,
      movies: state.movies.moviesResult
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleCloseModal: () => dispatch(closeMovieModal()),
      updateMovie: (movies) => dispatch(updateMovie(movies)),
    }
  }
    
  export default connect( mapStateToProps, mapDispatchToProps )(DeleteConfirm);