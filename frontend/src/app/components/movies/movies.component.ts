import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MovieComponent } from './movie/movie.component';
import { Movie } from './movie/movie.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  constructor(private router: Router) {}

  @Input({ required: true }) movies!: Movie[];

  onSelectMovie(movie: Movie) {
    let formattedUrl =
      movie.title.replace(' ', '-').toLowerCase().trim() + '-' + movie.id;

    this.router.navigate(['/movies', formattedUrl]);
  }
}
