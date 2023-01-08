import http from './httpService';
import config from '../config.json'


const apiEndpoint = config.apiUrl+"/movies";


export function getMovies() {
    return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
    return http.delete(apiEndpoint + "/" + movieId);
}

export function getMovie(id) {
    return http.get(apiEndpoint + "/" + id);
  }

  export function saveMovie(movie) {
    
  }