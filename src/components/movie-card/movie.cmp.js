import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
import { openMovieModal } from '../../store/actions/modal.action';
import { Subtext } from './subtext.cmp';
import './card.css';

const styles = {
  cardMedia: {
    // maxHeight: 394,
    overflow: 'hidden'
  },
  card: {
    cursor: 'pointer',
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%'
  },
  title: {
    fontSize: '15px'
  }
};

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOver: false
    };
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  openModal = (id, type) => {
    this.props.openMovieModal(id, type)
  };

  filterTitle = (title) => {
    return title.split(' ').map( string => {
      let word = this.capitalize(string);
      let found = word.match(/[a-z, 0-9]/gi);

      if(!!found) {
        found.push(' ')
      }

      return  found;
    })
  }
  
  render() {
    const { movie } = this.props;
    const subtitle = this.state.isMouseOver ? <Subtext movie={movie} openModal= { this.openModal }/> : null;
    const title = this.filterTitle(movie.Title)

    return (
      <Card
        className= "card"
        style={styles.card}
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
      >
        <CardMedia
          style={ styles.cardMedia }
          overlay={
            <CardTitle
              style={styles.title}
              title={ title } 
              subtitle={ subtitle } 
            />
          }
        >
          <img style={ styles.bgImage } src={ movie.Poster } alt="poster"/>
        </CardMedia>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieModal }
)(MovieCard);
