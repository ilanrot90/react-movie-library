import React, { Component } from 'react';
import MovieContainer from './containers/movies-container/movies.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MovieContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
