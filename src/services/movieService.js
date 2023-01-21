import http from './httpService';


const apiEndpoint = "/movies/";

function getMovieUrl(id) {
    return `${apiEndpoint}${id}`;
}
export function getMovies() {
    return http.get(apiEndpoint);
}

export function deleteMovie(movie) {
    return http.delete(getMovieUrl(movie._id));
}

export function getMovie(id) {
    return http.get(getMovieUrl(id));
  }

export function saveMovie(movie) {
    const mv = {...movie};
    delete mv._id;

    if (movie._id) return http.put(getMovieUrl(movie._id), mv);

    return http.post(apiEndpoint, movie);
  }