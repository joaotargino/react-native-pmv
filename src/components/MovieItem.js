import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


class MovieItem extends React.Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    this.props.onPress(this.props.movie.id);
  };
  render() {
    const { movie } = this.props;
    console.log(movie)
    return (
        
      <TouchableOpacity style={styles.movie} onPress={this.handlePress}>
        <Image source={{ uri: "https://image.tmdb.org/t/p/w500/" + movie.poster_path }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.releaseDate}>{movie.release_date}</Text>
            <Text style={styles.rating}>{movie.vote_average}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  movie: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: 140,
    height: 200,
    backgroundColor: '#ccc',
  },
  info: {
    width: 140,

    padding: 6,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    flex: 1, flexWrap: 'wrap',
  },
  releaseDate: {
    flex: 2,
    
  },
  rating: {
    flex: 1,
    textAlign: 'right',
  },
});

export default MovieItem;