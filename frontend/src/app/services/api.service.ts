import { Injectable } from '@angular/core';
import axios from 'axios';
import { Movie } from '../components/movies/movie/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getAllMovies() {
    return axios.get<Movie[]>('http://localhost:8000/api/movies/');
  }

  createNewMovie(data: { title: string; description: string }) {
    return axios.post('http://localhost:8000/api/movies/', data);
  }
}
