import React from 'react';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import { closeMovieModal } from '../../store/actions/modal.action';
import { updateMovie } from '../../store/actions/movies.action';
import { FormErrors } from '../../components/form-errors/form.cmp';
import Slide from '@material-ui/core/Slide';
import { validator } from '../../services/validation.service';
import IntegrationReactSelect from '../../components/auto-complete/genre-picker.cmp'
import './modal.css';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const styles = {
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10
  })
}

class MovieModal extends React.Component {
  constructor({props}) {
    super(props) 
      this.state = {
        Title: '',
        Genre: '',
        Runtime: '',
        Year: '',
        Director: '',

        errors: false,

        formErrors: {
          Title: {
            haveError: false,
            errors: []
          },
          Year: {
            haveError: false,
            errors: []
          },
          Genre: {
            haveError: false,
            errors: []
          },
          Runtime: {
            haveError: false,
            errors: []
          },
          Director: {
            haveError: false,
            errors: []
          },
        }
      }
    this.moviesTitles = undefined
  }

  componentDidMount() {
    let { Title, Director, Runtime, Year, Genre } = this.props.movies.find( movie => movie.imdbID === this.props.movieId);
    Genre = Genre.split(', ').map( genre => ({
      label: genre,
      value: genre
    }))

    this.setState({
      Title,
      Director,
      Runtime,
      Year,
      Genre,
    })

    this.moviesTitles = this.props.movies.map( movie => movie.Title )
  }

  validate = (value, type) => {
    let errors = validator(value, type, this.moviesTitles);
    let formErrors = JSON.parse(JSON.stringify(this.state.formErrors));
    
    formErrors[type] = errors;

    this.setState({
      formErrors
    }, this.setErrors())
  }

  setErrors() {
    let errors = Object.keys(this.state.formErrors).every(type => 
      this.state.formErrors[type].haveError !== true
    );
    this.setState({
      errors
    })
  }

  handleChange = (value, type) => {
    this.setState({
      [type]: value
    }, () => { this.validate(value, type) })
  }

  submitChanges = () => {
    console.log(this.state.errors);
    if( this.state.errors === true) return;

    let { Title, Director, Runtime, Year, Genre } = this.state;
    Genre = Genre.map( (genre, idx) => {
      if(idx !== 0) {
        return ` ${genre.label}`
      }
      return genre.label
    }).toString();

    let movies = this.props.movies.map( movie => {
      if( movie.imdbID === this.props.movieId ) {
        return {
          ...movie,
            Title, 
            Director, 
            Runtime, 
            Year,
            Genre
        }
      } 

      return movie
    })

    this.props.updateMovie(movies);
    this.props.handleCloseModal();
  }

  render() {
    const { isOpen, handleCloseModal, movieId, movies } = this.props;
    const poster = movies.find( movie => movie.imdbID === movieId).Poster;
    const runtime = this.state.Runtime.split(' ')[0];

    return (
      <Dialog
        autoScrollBodyContent={true}
        TransitionComponent={Transition}
        title='Edit movie'
        modal={false}
        open={isOpen}
        onClose={ () => handleCloseModal }
      >

          <div style={styles.dialogContent(poster)}>

            <FormErrors formErrors={this.state.formErrors} />

            <FormControl className= "form-controll">
              <InputLabel className="label" htmlFor="component-simple">Title</InputLabel>
              <Input 
                  className="input"                   
                  autoFocus  
                  error= { this.state.formErrors.Title.haveError } 
                  value={this.state.Title} 
                  onChange={ (ev) => this.handleChange(ev.target.value, 'Title') } 
              />
            </FormControl>

            <FormControl className= "form-controll">
              <InputLabel className="label" htmlFor="component-simple">Runtime in minutes</InputLabel>
              <Input 
                  className="input" 
                  error= { this.state.formErrors.Runtime.haveError } 
                  value={runtime} 
                  onChange={ (ev) => this.handleChange(ev.target.value, 'Runtime') } 
              />
            </FormControl>

            <FormControl className= "form-controll">
              <InputLabel className="label" htmlFor="component-simple">Year</InputLabel>
              <Input 
                  className="input" 
                  error= { this.state.formErrors.Year.haveError } 
                  value={this.state.Year} 
                  onChange={ (ev) => this.handleChange(ev.target.value, 'Year') } 
              />
            </FormControl>

            <FormControl className= "form-controll">
              <InputLabel className="label" htmlFor="component-simple">Director</InputLabel>
              <Input 
                  className="input" 
                  error= { this.state.formErrors.Director.haveError } 
                  value={this.state.Director} 
                  onChange={ (ev) => this.handleChange(ev.target.value, 'Director') } 
              />
            </FormControl>

            <FormControl className= "form-controll">
              <IntegrationReactSelect handleChange= { this.handleChange } error= {this.state.formErrors.Genre.haveError} className="input" multi= {this.state.Genre}/>
            </FormControl>
          </div>
          <DialogActions>
            <Button onClick={ handleCloseModal } color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitChanges} color="primary">
              Save 
            </Button>
          </DialogActions>
    </Dialog>
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
  
export default connect( mapStateToProps, mapDispatchToProps )(MovieModal);