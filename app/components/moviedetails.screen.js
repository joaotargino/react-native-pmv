import React from 'react';
import { ScrollView, SafeAreaView, Dimensions, StyleSheet, Image, Text, View } from 'react-native';


export default class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: "Movie",
      };
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'failed');

        return (
            <ScrollView>
                <View style={styles.container }>
                    <Image
                        style={{ flex: 1, justifyContent: 'space-around', 
                        alignItems: 'center', width:  Dimensions.get("window").width, height: 300 }}
                        source={{ uri: "https://image.tmdb.org/t/p/w500/" + item.backdrop_path }}

                    />
                    <Text>Movie: {item.title}</Text>
                    <Text>Vote Average: {item.vote_average}</Text>
                    <Text>Release Date: {item.release_date}</Text>
                    <Text>Overview: {item.overview}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,  justifyContent: 'center', alignItems: 'center' , margin: 10,
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
