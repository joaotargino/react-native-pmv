import React from 'react';

import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ajax from '../ajax';
import MovieList from './MovieList';
import MovieItem from './MovieItem';
import MovieDetail from './MovieDetail'
// import SearchBar from './SearchBar';

class App extends React.Component {
  titleXPos = new Animated.Value(0);
  state = {
    movies: [],
    moviesFromSearch: [],
    currentMovieId: null,
    activeSearchTerm: '',
    sorting : 'popular',
  };


  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };
  async componentDidMount() {
    this.animateTitle();
    const movies = await ajax.fetchInitialMovies(this.state.sorting);
    this.setState({ movies });
  }
  //   searchMovies = async (searchTerm) => {
  //     let moviesFromSearch = [];
  //     if (searchTerm) {
  //       moviesFromSearch = await ajax.fetchMovieSearchResults(searchTerm);
  //     }
  //     this.setState({ moviesFromSearch, activeSearchTerm: searchTerm });
  //   };
  setCurrentMovie = (movieId) => {
    this.setState({
      currentMovieId: movieId,
    });
  };
  unsetCurrentMovie = () => {
    this.setState({
      currentMovieId: null,
    });
  };
  currentMovie = () => {
    return this.state.movies.find((movie) => movie.id === this.state.currentMovieId);
  };
  render() {
    if (this.state.currentMovieId) {
      return (
        <View style={styles.main}>
          <MovieDetail
            initialMovieData={this.currentMovie()}
            onBack={this.unsetCurrentMovie}
          />
        </View>
      );
    }
    // const moviesToDisplay = this.state.movies;
    const moviesToDisplay =
      this.state.movies.length > 0
        ? this.state.movies
        : this.state.moviesFromSearch;

    console.log(moviesToDisplay)
    // return (
    //   <View style={styles.main}>
    //     {/* <SearchBar
    //       searchMovies={this.searchMovies}
    //       initialSearchTerm={this.state.activeSearchTerm}
    //     /> */}
    //     <MovieList movies={moviesToDisplay} onItemPress={this.setCurrentMovie} />
    //   </View>
    // );



    if (moviesToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          {/* <SearchBar
            searchMovies={this.searchMovies}
            initialSearchTerm={this.state.activeSearchTerm}
          /> */}
          <MovieList movies={moviesToDisplay} onItemPress={this.setCurrentMovie} />
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
        <Text style={styles.header}>Popular Movies</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
});

export default App;