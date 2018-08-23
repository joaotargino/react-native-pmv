import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  Linking,
} from 'react-native';

import ajax from '../ajax';

class MovieDetail extends React.Component {
  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width;
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0
        }).start();
      }
    }
  });

  handleSwipe = (indexDirection) => {
    if (!this.state.movie.backdrop_path[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start();
      return;
    }
    this.setState((prevState) => ({
      imageIndex: prevState.imageIndex + indexDirection
    }), () => {
      // Next image animation
      this.imageXPos.setValue(indexDirection * this.width);
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start();
    });
  };

  static propTypes = {
    initialMovieData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  
  state = {
    movie: this.props.initialMovieData,
    imageIndex: 0,
  };
  async componentDidMount() {
    const fullMovie = await ajax.fetchMovieDetail(this.state.movie.id);
    this.setState({
      movie: fullMovie,
    });
  }
  openMovieUrl = () => {
    Linking.openURL(this.state.movie.title); //TODO link to trailers
  };
  render() {
    const { movie } = this.state;
    return (
      <View style={styles.movie}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{ uri: imageURL + movie.backdrop_path }}
          style={[{ left: this.imageXPos }, styles.image]}
        />
        <View>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        <ScrollView style={styles.detail}>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.voteAverage}>{"Rating: " + movie.vote_average}</Text>
              <Text style={styles.releaseDate}>{"Release Date: " + movie.release_date}</Text>
            </View>
            <View style={alignItems = 'center'}>
                <Image
                  source={{ uri: imageURL + movie.poster_path }}
                  style={styles.poster}
                />
                <Text>{movie.original_title}</Text>
              </View>

          </View>
          <View style={styles.description}>
            <Text>{movie.overview}</Text>
          </View>
          <Button style={styles.movie} title="Watch the trailer!" onPress={this.openMovieUrl} />
        </ScrollView>
      </View>
    );
  }
}
const imageURL = "https://image.tmdb.org/t/p/w500/"

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '30%',
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  releaseDate: {
    marginVertical: 10,
  },
  voteAverage: {
    fontWeight: 'bold',
  },
  poster: {
    width: 84,
    height: 120,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

export default MovieDetail;