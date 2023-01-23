
import http from './httpService';

export function getGenres() {
  console.log(http.get("/genres"));
    return http.get("/genres");
  }