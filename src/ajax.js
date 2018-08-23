const apiHost = 'https://api.themoviedb.org/3/movie/';
const apiKey = '?&api_key=8a6b785e39df9857b85f92d59fbb55c3';


export default {
    async fetchInitialMovies(sorting) {
        try {
            const response = await fetch(apiHost + sorting + apiKey);
            const responseJson = await response.json();
            return responseJson.results;
        } catch (error) {
            console.error(error);
        }
    },
    async fetchMovieDetail(movieId) {
        try {
            const response = await fetch(apiHost + movieId + apiKey);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
    async fetchMovieVideos(movieId) {
        try {
            const response = await fetch(apiHost + movieId + 'videos' + apiKey);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
    // async fetchMovieSearchResults(searchTerm) {
    //     try {
    //         const response = await fetch(apiHost + '/api/movies?searchTerm=' + searchTerm);
    //         const responseJson = await response.json();
    //         return responseJson;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
};