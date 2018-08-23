
import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, SafeAreaView, ActivityIndicator,
  StyleSheet, Image, Text, TouchableHighlight, View,
  NavigatorIOS, Alert
}
  from 'react-native';
import MovieItem from './MovieItem';

class MovieList extends React.Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  
  render() {
    const columns = 2;
    return (
      <View style={styles.list}>
      {/* <SafeAreaView style={styles.list}> */}
        <FlatList
          data={createRows(this.props.movies, columns)}
          renderItem={({ item }) => (
            <MovieItem movie={item} onPress={this.props.onItemPress} />
          )}
          keyExtractor={(item, index) => index}
          numColumns={columns}
        />
        {/* </SafeAreaView> */}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
    item: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#dcda48",
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  text: {
    color: "#000000"
  }
});

function createRows(data, columns) {
  const rows = Math.floor(data.length / columns); // [A]
  let lastRowElements = data.length - rows * columns; // [B]

  while (lastRowElements !== columns) { // [C]
    data.push({ // [D]
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1; // [E]
  }

  return data; // [F]
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',

//   },

//   item: {
//     alignItems: "center",
//     justifyContent: 'center',
//     backgroundColor: "#dcda48",
//     flexGrow: 1,
//     margin: 4,
//     padding: 20
//   },
//   text: {
//     color: "#000000"
//   }
// });


export default MovieList;