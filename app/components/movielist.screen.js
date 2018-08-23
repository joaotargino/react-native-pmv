import { AppRegistry } from 'react-native';
import React from 'react';
import MovieDetails from './moviedetails.screen'
import { FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Image, Text, TouchableHighlight, View, NavigatorIOS, Alert } from 'react-native';
import {
  StackNavigator, createStackNavigator,
} from 'react-navigation';

export default class FetchMovies extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/movie/popular?&api_key=8a6b785e39df9857b85f92d59fbb55c3')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }


  _onMovieClicked(item) {
    // Alert.alert(
    //   item.title,
    //   item.overview,
    //   [
    //     { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
    //     { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false }
    // )

    this.props.navigation.navigate('MovieDetails',
      {
        item: item,
        title: item.title,

      });
    // this.props.navigator.push(
    // {
    //   component: MovieDetails,
    //   title: item.title,
    //   passProps: {movie: item},
    // });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    const columns = 2;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={createRows(this.state.dataSource, columns)}
            renderItem={
              ({ item }) =>
                //<Text>{item.title}, {item.release_date} </Text>}
                <TouchableHighlight onPress={() => this._onMovieClicked(item)}>
                  <Image
                    style={{ width: 140, height: 200 }}
                    source={{ uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path }}

                  />
                </TouchableHighlight>
            }
            //{"https://image.tmdb.org/t/p/w500/" + item.poster_path}
            keyExtractor={(item, index) => index}
            numColumns={columns}
          />
        </SafeAreaView>
      </View>
    );
  }


}



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


const styles = StyleSheet.create({
  container: {
    flex: 1, 
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

